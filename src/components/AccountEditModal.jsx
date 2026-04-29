import * as Dialog from "@radix-ui/react-dialog"; // Исправил импорт для Radix
import { Cross2Icon } from "@radix-ui/react-icons";
import styles from "../styles/accountEdit.module.css"; // Импорт без фигурных скобок
import { useState } from "react";
import { updateUser } from "../services/users";
import { useAuth } from "../hook/useAuth";


function AccountEditModal({ user }) {
    const [userName, setUserName] = useState(user.userName || "");
    const [avatar, setAvatar] = useState(null);
    const [error, setError] = useState("");
    const [open, setOpen] = useState(true);
    const {updateUserData} = useAuth();

    async function SaveChanges(event) {
        setError("");
        if(userName.length < 6){
            event.preventDefault();
            setError("Логин должен быть длинне 6 символов");
            return;
        }
        // Передаем сам файл avatar, а не только имя, чтобы бэкенд мог его получить
        const path = avatar ? avatar.name : "";
        try{
            const response = await updateUser(user, { userName: userName, iconPath: path});
            console.log(response);
            updateUserData({userName: userName});
        }
        catch(error){
            console.log(error);
            event.preventDefault();
            setError(error.response.data.message);
            return;
        }
        setOpen(false);
    }

    return (
        <Dialog.Root open={open} onOpenChange={()=>setOpen(true)}>
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
                    {error && <p style={{color: "red", fontSize: ".9rem", textAlign: "right"}}>
                        {error}
                    </p>}
                    <div style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}>
                            <button 
                                className="Button green" 
                                onClick={async (e) => await SaveChanges(e)}
                            >
                                Сохранить изменения
                            </button>
                    </div>

                    <button className="closeButton" aria-label="Close" onClick={()=>setOpen(false)}>
                        <Cross2Icon />
                    </button>

                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export { AccountEditModal };