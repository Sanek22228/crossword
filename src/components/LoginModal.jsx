import { Tabs } from "radix-ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useAuth } from "../hook/useAuth";
import styles from '../styles/LoginModal.module.css';
import "@radix-ui/themes/styles.css";
import { useNavigate } from "react-router-dom";
import { unstable_PasswordToggleField as PasswordToggleField } from "radix-ui";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

function LoginModal() {
    const navigate = useNavigate();
    const { signin, loginActive, setLoginActive } = useAuth();
    console.log("login active", loginActive);

    return (
        <>
            <Tabs.Root 
                className={styles.tabsRoot} 
                defaultValue="tab1" 
                style={{ visibility: loginActive ? "visible" : "hidden" }}
            >
                <button 
                    className={styles.closeButton} 
                    aria-label="Close" 
                    onClick={() => {
                        setLoginActive(false); 
                        navigate(-1, { replace: true });
                    }}
                >
                    <Cross2Icon />
                </button>
                
                <Tabs.List className={styles.tabsList} aria-label="Manage your account">
                    <Tabs.Trigger className={styles.tabsTrigger} value="tab1">
                        Вход
                    </Tabs.Trigger>
                    <Tabs.Trigger className={styles.tabsTrigger} value="tab2">
                        Регистрация
                    </Tabs.Trigger>
                </Tabs.List>
                
                <Tabs.Content className={styles.tabsContent} value="tab1">
                    <p className={styles.text}>
                        Заполните все поля для авторизации. Нажмите войти, когда готовы.
                    </p>
                    <fieldset className={styles.fieldset}>
                        <label className={styles.label} htmlFor="email">
                            Почта
                        </label>
                        <input className={styles.input} id="email" type="email" />
                    </fieldset>
                    <fieldset className={styles.fieldset}>
                        <label className={styles.label} htmlFor="password">
                            Пароль
                        </label>
                        <PasswordToggleField.Root>
								<div className={`${styles.Root}`}>
									<PasswordToggleField.Input className={`${styles.Input}`} />
									<PasswordToggleField.Toggle className={styles.Toggle}>
										<PasswordToggleField.Icon
											visible={<EyeOpenIcon />}
											hidden={<EyeClosedIcon />}
										/>
									</PasswordToggleField.Toggle>
								</div>
						</PasswordToggleField.Root>
                    </fieldset>
                    <div style={{ display: "flex", marginTop: 20, justifyContent: "flex-end" }}>
                        <button className={`${styles.button} ${styles.green}`}>Войти</button>
                    </div>
                </Tabs.Content>
                
                <Tabs.Content className={styles.tabsContent} value="tab2">
                    <p className={styles.text}>
                        Заполните все поля для создания нового аккаунта. Регистрируясь, вы принимаете наши  
                        <a href=""> Условия использования и Политику конфиденциальности</a>
                    </p>
                    <fieldset className={styles.fieldset}>
                        <label className={styles.label} htmlFor="email">
                            Почта
                        </label>
                        <input className={styles.input} id="email" type="email" />
                    </fieldset>
                    <fieldset className={styles.fieldset}>
                        <label className={styles.label} htmlFor="password">
                            Пароль
                        </label>
                        	<PasswordToggleField.Root>
								<div className={styles.Root}>
									<PasswordToggleField.Input className={styles.Input} />
									<PasswordToggleField.Toggle className={styles.Toggle}>
										<PasswordToggleField.Icon
											visible={<EyeOpenIcon />}
											hidden={<EyeClosedIcon />}
										/>
									</PasswordToggleField.Toggle>
								</div>
							</PasswordToggleField.Root>
                    </fieldset>
                    <fieldset className={styles.fieldset}>
                        <label className={styles.label} htmlFor="confirmPassword">
                            Подтвердите пароль
                        </label>
                        <PasswordToggleField.Root>
								<div className={`${styles.Root}`}>
									<PasswordToggleField.Input className={`${styles.Input}`} />
									<PasswordToggleField.Toggle className={styles.Toggle}>
										<PasswordToggleField.Icon
											visible={<EyeOpenIcon />}
											hidden={<EyeClosedIcon />}
										/>
									</PasswordToggleField.Toggle>
								</div>
						</PasswordToggleField.Root>
                    </fieldset>
                    <div style={{ display: "flex", marginTop: 20, justifyContent: "flex-end" }}>
                        <button className={`${styles.button} ${styles.green}`}>Создать аккаунт</button>
                    </div>
                </Tabs.Content>
            </Tabs.Root>
            <div className={styles.overlay} style={{ visibility: loginActive ? "visible" : "hidden" }} />
        </>
    );
}

export { LoginModal };