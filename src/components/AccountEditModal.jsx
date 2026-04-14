import * as Dialog from "@radix-ui/react-dialog"; // Исправил импорт для Radix
import { Cross2Icon } from "@radix-ui/react-icons";
import styles from "../styles/accountEdit.module.css"; // Импорт без фигурных скобок
import { useState } from "react";
import { updateUser } from "../services/users";

function AccountEditModal({ user }) {
    const [userName, setUserName] = useState(user.userName ?? "");
    const [avatar, setAvatar] = useState(null);

    async function SaveChanges() {
        // Передаем сам файл avatar, а не только имя, чтобы бэкенд мог его получить
        const response = await updateUser(user.id, { userName, avatar });
        if (response) {
            // Обновляем локальный объект (хотя лучше использовать state родителя)
            user.userName = response.userName;
        }
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className="Button violet">
                    Редактировать профиль
                </button>
            </Dialog.Trigger>
            
            <Dialog.Portal>
                <Dialog.Overlay className="overlay" />
                <Dialog.Content className={styles.DialogContent}>
                    <Dialog.Title className={styles.DialogTitle}>
                        Редактировать профиль
                    </Dialog.Title>
                    <Dialog.Description className={styles.DialogDescription}>
                        Задайте изменения вашего профиля здесь. Для применения нажмите на кнопку.
                    </Dialog.Description>

                    <fieldset className={styles.Fieldset}>
                        <label className={styles.Label} htmlFor="username">
                            Имя пользователя
                        </label>
                        <input 
                            className="Input"
                            id="username" 
                            value={userName} 
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </fieldset>

                    <fieldset className={styles.Fieldset}>
                        <label className={styles.Label} htmlFor="avatar">
                            Фото профиля
                        </label>
                        <button 
                            className={styles.UploadButton} 
                            onClick={() => document.getElementById("avatar").click()}
                        >
                            {avatar ? avatar.name : "Выберите файл"}
                        </button>
                        <input 
                            style={{ display: "none" }} 
                            id="avatar" 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => setAvatar(e.target.files[0])}
                        />
                    </fieldset>

                    <div style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}>
                        <Dialog.Close asChild>
                            <button 
                                className="Button green" 
                                onClick={SaveChanges}
                            >
                                Сохранить изменения
                            </button>
                        </Dialog.Close>
                    </div>

                    <Dialog.Close asChild>
                        <button className="closeButton" aria-label="Close">
                            <Cross2Icon />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export { AccountEditModal };