import * as Dialog from "@radix-ui/react-dialog"; // Исправил импорт для Radix
import { Cross2Icon } from "@radix-ui/react-icons";
import styles from "../styles/accountEdit.module.css"; // Импорт без фигурных скобок
import { useState } from "react";
import { updateUser } from "../services/users";
import { useAuth } from "../hook/useAuth";
import binIcon from "../images/bin.svg";
import { deleteCrossword } from "../services/crosswords";

const NO_ACTION = ()=>{};

function DeleteModal({ crossword, cb = NO_ACTION }) {
    if (crossword === null) return;

    const [open, setOpen] = useState();
    const {updateUserData} = useAuth();

    async function DeleteCrossword(event) {
        try{
            const response = await deleteCrossword(crossword.id);
            if(response){
                setOpen(false);
            }
        }
        catch(error){
            console.log(error);
            event.preventDefault();
            return;
        }
        await cb();
        setOpen(false);
    }

    return (
        <Dialog.Root open={open} onOpenChange={()=>setOpen(true)}>
            <Dialog.Trigger asChild>
                <button className="controlBtn">
                    <img src={binIcon} alt="bin icon" />
                </button>
            </Dialog.Trigger>
            
            <Dialog.Portal>
                <Dialog.Overlay className="overlay" />
                <Dialog.Content className={styles.DialogContent}>
                    <Dialog.Title className={styles.DialogTitle}>
                        Удаление кроссворда
                    </Dialog.Title>
                    <Dialog.Description className={styles.DialogDescription}>
                        Вы уверены, что хотите <b>удалить</b> кроссворд?
                        Это действие <b>необратимо</b>: кроссворд будет удален без возможности восстановления.
                    </Dialog.Description>

                    <div style={{ display: "flex", marginTop: 0, justifyContent: "center", gap: "10%" }}>
                            <button 
                                className="Button grey"
                                onClick={()=>setOpen(false)}>
                                Отмена
                            </button>
                            <button 
                                className="Button violet" 
                                onClick={async (e) => await DeleteCrossword(e)}>
                                Удалить
                            </button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export { DeleteModal };