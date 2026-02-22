import { Tabs } from "radix-ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useAuth } from "../hook/useAuth";
import styles from '../styles/LoginModal.module.css';
import "@radix-ui/themes/styles.css";
import { useNavigate } from "react-router-dom";
import { unstable_PasswordToggleField as PasswordToggleField } from "radix-ui";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useState } from "react";

function LoginModal() {
    const navigate = useNavigate();
    const { signin, loginActive, setLoginActive } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [error, setError] = useState("");

    function HandleAuthorization(){
        console.log(`password: ${password}; email: ${email}`);
        if(!ValidateEmail()){
            setError("Почта введена неверно");
            return;
        }
        if(!ValidatePassword()){
            // setError("Неверный пароль?")
            setError("Длина пароля должна быть длиннее 6 символов и иметь числа");
            return;
        }
        if(!FindUser()){
            setError("Пользователь не найден");
            return;
        }
        if(!VerifyPassword()){
            setError("Невверный пароль");
            return;
        }

        setError("");
        setLoginActive(false);
        signin("user1");
    }
    function HandleRegistration(){
        console.log(`password: ${password}; email: ${email}`);
        if(!ValidateEmail()){
            setError("Почта введена неверно");
            return;
        }
        if(!ValidatePassword()){
            // setError("Неверный пароль?")
            setError("Длина пароля должна быть длиннее 6 символов и иметь числа");
            return;
        }
        if(!ConfirmPassword()){
            setError("Пароли не совпадают");
            return;
        }
        if(!FindUser()){
            setError("Пользователь не найден");
            return;
        }
        if(!VerifyPassword()){
            setError("Невверный пароль");
            return;
        }

        setError("");
        setLoginActive(false);
        signin("user1");
    }
    function ValidateEmail(){
        if(email.length < 1){
            return false;
        }
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            return false;
        }
        return true;
    }
    function ValidatePassword(){
        if(password.length < 6 || password.length > 20){
            return false;
        }
        if(!/\d/.test(password)){
            return false;
        }
        return true;
    }
    function ConfirmPassword(){
        if(password !== confirmPass) return false;
        return true
    }
    function FindUser(){
        // email есть в БД
        // ? user = {id, email, password}
        return true;
        // : return false
    }
    function VerifyPassword(){
        // return user.password === password ?  true : false
        return true;
    }


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
                        <input 
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email}
                            className={styles.input} 
                            id="email" type="email" placeholder="name@mail.com" required 
                        />
                    </fieldset>
                    <fieldset className={styles.fieldset}>
                        <label className={styles.label} htmlFor="reg-password">
                            Пароль
                        </label>
                        <PasswordToggleField.Root>
								<div className={`${styles.Root}`}>
									<PasswordToggleField.Input className={`${styles.Input}`} onChange={(e) => setPassword(e.target.value)} value={password} id="reg-password"/>
									<PasswordToggleField.Toggle className={styles.Toggle}>
										<PasswordToggleField.Icon
											visible={<EyeOpenIcon />}
											hidden={<EyeClosedIcon />}
										/>
									</PasswordToggleField.Toggle>
								</div>
						</PasswordToggleField.Root>
                    </fieldset>
                    <p style={{color: "red"}} className={styles.text}>{error}</p>
                    <div style={{ display: "flex", marginTop: 20, justifyContent: "flex-end" }}>
                        <button onClick={HandleAuthorization} className={`${styles.button} ${styles.green}`}>
                            Войти
                        </button>
                    </div>
                </Tabs.Content>
                
                <Tabs.Content className={styles.tabsContent} value="tab2">
                    <p className={styles.text}>
                        Заполните все поля для создания нового аккаунта. Регистрируясь, вы принимаете наши  
                        <a href="/policy"> Условия использования и Политику конфиденциальности</a>
                    </p>
                    <fieldset className={styles.fieldset}>
                        <label className={styles.label} htmlFor="reg-email">
                            Почта
                        </label>
                        <input 
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email}
                            className={styles.input} 
                            id="reg-email" type="email" placeholder="name@mail.com" required 
                        />
                    </fieldset>
                    <fieldset className={styles.fieldset}>
                        <label className={styles.label} htmlFor="password">
                            Пароль
                        </label>
                        	<PasswordToggleField.Root>
								<div className={styles.Root}>
									<PasswordToggleField.Input className={`${styles.Input}`} onChange={(e) => setPassword(e.target.value)} value={password}/>
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
									<PasswordToggleField.Input 
                                        className={`${styles.Input}`} 
                                        onChange={(e) => setConfirmPass(e.target.value)} 
                                        value={confirmPass}
                                    />
									<PasswordToggleField.Toggle className={styles.Toggle}>
										<PasswordToggleField.Icon
											visible={<EyeOpenIcon />}
											hidden={<EyeClosedIcon />}
										/>
									</PasswordToggleField.Toggle>
								</div>
						</PasswordToggleField.Root>
                    </fieldset>
                    <p style={{color: "red"}} className={styles.text}>{error}</p>
                    <div style={{ display: "flex", marginTop: 20, justifyContent: "flex-end" }}>
                        <button 
                            className={`${styles.button} ${styles.green}`}
                            onClick={HandleRegistration}
                        >
                            Создать аккаунт
                        </button>
                    </div>
                </Tabs.Content>
            </Tabs.Root>
            <div className={styles.overlay} style={{ visibility: loginActive ? "visible" : "hidden" }} />
        </>
    );
}

export { LoginModal };