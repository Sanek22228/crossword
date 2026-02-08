import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

const RequireAuth = ({children}) => {
    const {user} = useAuth();
    const location = useLocation();
    if(!user){
        console.log(`navigating to login page, user: ${user}, from location: ${location.pathname}`);
        return <Navigate to='/login' state={{from: location}}/>;
    }
    // если проверка пройдена - отрисовываем дочернюю страницу
    return children; 
}

export { RequireAuth }