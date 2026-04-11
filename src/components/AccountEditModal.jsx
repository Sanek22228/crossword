import { Dialog } from "radix-ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import "../styles/accountEdit.css";
import { useEffect, useState } from "react";
import { updateUser } from "../services/users";

function AccountEditModal({user}){
    const [userName, setUserName] = useState(user.userName ?? "");
    const [avatar, setAvatar] = useState(null);
    async function SaveChanges(){
        const iconPath = avatar ? avatar.name : "";
        var response = await updateUser(user, {userName, iconPath});
        user.userName = response;
        // user.userName = response.userName;
        // user.icon = response.iconPath;
    }
    return(
        <>
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className="Button violet">Редактировать профиль</button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent">
                    <Dialog.Title className="DialogTitle">Редактировать профиль</Dialog.Title>
                    <Dialog.Description className="DialogDescription">
                        Задайте изменения вашего профиля здесь. Для применения нажмите на кнопку.
                    </Dialog.Description>
                    <fieldset className="Fieldset">
                        <label className="Label" htmlFor="username">
                            Имя пользователя
                        </label>
                        <input 
                            className="Input" 
                            id="username" 
                            value={userName} 
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </fieldset>
                    <fieldset className="Fieldset">
                        <label className="Label" htmlFor="name">
                            Фото профиля
                        </label>
                        <button className="UploadButton" onClick={() => {document.getElementById("avatar").click()}}>{avatar ? avatar.name : "Выберите файл"}</button>
                        <input style={{"display":"none"}} className="Input" id="avatar" type="file" accept="image/*" onChange={(e)=>setAvatar(e.target.files[0])}/>
                    </fieldset>
                    <div
                        style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}
                    >
                        <Dialog.Close asChild>
                            <button className="Button green" onClick={SaveChanges}>Сохранить изменения</button>
                        </Dialog.Close>
                    </div>
                    <Dialog.Close asChild>
                        <button className="IconButton" aria-label="Close">
                            <Cross2Icon />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
        </>
    );
}

export {AccountEditModal};