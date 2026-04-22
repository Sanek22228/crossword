import { Tabs } from "radix-ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useAuth } from "../hook/useAuth";
import styles from '../styles/LoginModal.module.css';
import { useLocation, useNavigate } from "react-router-dom";
import { unstable_PasswordToggleField as PasswordToggleField } from "radix-ui";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { fetchLogin, fetchRegister } from "../services/users";

function LoginModal() {
    const navigate = useNavigate();
    const location = useLocation();
    const { signin, loginActive, setLoginActive, onSuccessAction, setOnSuccessAction } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // при изменении маршрута прятать модалку
    useEffect(()=>{
        if(loginActive){
            setLoginActive(false);
        }
        // чтобы не ругался терминал
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    },[location.pathname])

    async function HandleAuthorization(){
        console.log(`password: ${password}; email: ${email}`);
        if(!ValidateEmail()){
            setError("Почта введена неверно");
            return;
        }
        if(!ValidatePassword()){
            setError("Длина пароля должна быть длиннее 6 символов и иметь числа");
            return;
        }
        setLoading(true);
        let user;
        try{
            user = await fetchLogin({email, password});
        }
        catch(e){
            console.error(error);
            setError("Что-то пошло не так");
            return;
        }
        setLoading(false);
        if(user){     
            setError("");
            setLoginActive(false);
            signin(user);
            if(onSuccessAction) {
                console.log("onsuccessaction")
                await onSuccessAction(user);
                setOnSuccessAction(null);
            }
            navigate(`/account/${user.id}`);
        }
        else{
            setError("Пользователь не найден");
        }
    }
    async function HandleRegistration(){
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
        setLoading(true);
        let user;
        try{
            user = await fetchRegister({email, password});
        }
        catch(e){
            console.error(error);
            setError("Что-то пошло не так");
            setLoading(false);
            return;
        }
        if(user){
            signin(user);
            setError("");
            setLoginActive(false);
            navigate(`/account/${user.id}`);
            if(onSuccessAction) {
                onSuccessAction(user)
                setOnSuccessAction(null);
            }       
        }
        else{
            setError("Пользователь уже зарегистирован")
        }
        setLoading(false);
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


    return (
        loginActive ?
        <>
            <Tabs.Root 
                onValueChange={()=>setError("")}
                className={styles.tabsRoot} 
                defaultValue="tab1" 
            >
                <button 
                    className="closeButton" 
                    aria-label="Close" 
                    onClick={() => {
                        setLoginActive(false); 
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
									<PasswordToggleField.Input className="PasswordInput" onChange={(e) => setPassword(e.target.value)} value={password} id="reg-password"/>
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
                    <div style={{ 
                        display: "grid", 
                        gridTemplateColumns: "1fr auto",
                        alignItems: "center",
                    }}>
                        {loading && <span className="loader"></span>}                        
                        <button 
                            onClick={HandleAuthorization} 
                            className="Button green"
                            style={{ justifySelf: "end" }}
                        >
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
                            className="Input"
                            id="reg-email" type="email" placeholder="name@mail.com" required 
                        />
                    </fieldset>
                    <fieldset className={styles.fieldset}>
                        <label className={styles.label} htmlFor="password">
                            Пароль
                        </label>
                        	<PasswordToggleField.Root>
								<div className={styles.Root}>
									<PasswordToggleField.Input className="Input" onChange={(e) => setPassword(e.target.value)} value={password}/>
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
                                        className="PasswordInput" 
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
                    <div style={{ 
                        display: "grid", 
                        gridTemplateColumns: "1fr auto",
                        alignItems: "center"
                    }}>
                            {loading && <span className="loader"></span>}
                        <button 
                            onClick={HandleRegistration} 
                            className="Button green"
                            style={{ justifySelf: "end" }}
                        >
                            Создать аккаунт
                        </button>
                    </div>
                </Tabs.Content>
            </Tabs.Root>
            <div className="overlay"/>
        </>
        :
        null
    );
}

export { LoginModal };