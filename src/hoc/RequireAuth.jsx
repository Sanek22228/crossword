import { useEffect } from "react";
import { useAuth } from "../hook/useAuth";

const RequireAuth = ({children}) => {
    const {user, setLoginActive} = useAuth();

    useEffect(() => {
        if(!user)
            setLoginActive(true);
    }, [user]);

    if(!user){
        return null;
    }

    return children;
    // если проверка пройдена - отрисовываем дочернюю страницу
}

export { RequireAuth }