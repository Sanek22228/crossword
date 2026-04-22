import { Tabs } from "radix-ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import styles from '../styles/LoginModal.module.css';
import { unstable_PasswordToggleField as PasswordToggleField } from "radix-ui";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

function WinModal() {
    return (
        <>
            <Tabs.Root 
                className={styles.tabsRoot} 
                defaultValue="tab1" 
            >
                <Tabs.Content className={styles.tabsContent} value="tab1">
                    <p className={styles.text}>
                        Заполните все поля для авторизации. Нажмите войти, когда готовы.
                    </p>
                    <fieldset className={styles.fieldset}>
                        <label className={styles.label} htmlFor="email">
                            Почта
                        </label>
                        <input 
                            className="Input"
                            id="email" type="email" placeholder="name@mail.com" required 
                        />
                    </fieldset>
                    <fieldset className={styles.fieldset}>
                        <label className={styles.label} htmlFor="reg-password">
                            Пароль
                        </label>
                        <PasswordToggleField.Root>
								<div className={`${styles.Root}`}>
									<PasswordToggleField.Input className="PasswordInput" id="reg-password"/>
									<PasswordToggleField.Toggle className={styles.Toggle}>
										<PasswordToggleField.Icon
											visible={<EyeOpenIcon />}
											hidden={<EyeClosedIcon />}
										/>
									</PasswordToggleField.Toggle>
								</div>
						</PasswordToggleField.Root>
                    </fieldset>
                    <p style={{color: "red"}} className={styles.text}></p>
                    <div style={{ 
                        display: "grid", 
                        gridTemplateColumns: "1fr auto",
                        alignItems: "center",
                    }}>
                        <button 
                            className="Button green"
                            style={{ justifySelf: "end" }}
                        >
                            Войти
                        </button>
                    </div>
                </Tabs.Content>
            </Tabs.Root>
            <div className="overlay"/>
        </>
    );
}

export { WinModal };