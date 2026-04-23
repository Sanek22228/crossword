import { Tabs } from "radix-ui";
import styles from '../styles/LoginModal.module.css';
import { replace, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import { updateUser } from "../services/users";

function WinModal({hints = null, crossword}) {
    const {user, loginActive, setLoginActive, setOnSuccessAction} = useAuth();
    const navigate = useNavigate();
    console.log("crossword " + crossword.id);
    async function Exit(){
        console.log("Попытка сохранить кроссворд ID:", crossword.id);
        console.log("Текущий пользователь:", user?.id);
        if(user === null){
            navigate("/feed", {replace: true});
        }
        else{
            let response = await updateUser(user, { completedId: crossword.id})
            if(response){
                navigate(`/feed`, {replace: true});
            }
            else{
                console.error(response);
            }
        }
    }
    async function SaveResults(){
        setLoginActive(true);
        setOnSuccessAction(()=> async(loggedUser) => await updateUser(loggedUser, {completedId: crossword.id}));
    }
    return (
        <>
            <Tabs.Root 
                className={styles.tabsRoot} 
                defaultValue="tab1" 
            >
                <Tabs.Content style={{borderRadius: "6px"}} className={styles.tabsContent} value="tab1">
                    <h2 style={{textAlign: "center", marginBottom: "1vw"}}>Кроссворд пройден!</h2>
                    {
                        hints && 
                        <div style={{marginBottom: "1vw"}} className="hints">
                            <p><b> Использованные подсказки: </b></p>
                            <p>Открыть случайную букву - {hints.randLetter}</p>
                            <p>Открыть выбранную букву - {hints.letter}</p>
                            <p>Открыть выбранное слово - {hints.word}</p>
                        </div>
                    }
                    <p className={styles.text} style={{lineHeight: "1.2rem"}}>
                        {user ? "Кроссворд сохранен как пройденный в вашем профиле."
                        : "Авторизуйтесь, чтобы сохранить этот результат в профиле."
                        }
                    </p>
                        <div style={{display:"flex", justifyContent: "space-between"}}>
                            {!user && <button 
                                style={{textAlign: "center"}} 
                                className="Button green" 
                                onClick={async () => await SaveResults()}>
                                Сохранить результат
                            </button>}
                            <button 
                                style={{textAlign: "center"}} 
                                className="Button green" 
                                onClick={async () => await Exit()}
                                >
                                Решить еще
                            </button>
                        </div>
                </Tabs.Content>
            </Tabs.Root>
            {!loginActive && <div className="overlay"/>}
        </>
    );
}

export { WinModal };