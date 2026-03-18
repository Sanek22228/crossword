import { useCrossword } from "../hook/useCrossword";
import { Navigate } from "react-router-dom";

const RequireCrossword = ({children}) => {
    const {curCrossword} = useCrossword();

    if(!curCrossword)
        return <Navigate to='/'/>

    return children;
    // если проверка пройдена - отрисовываем дочернюю страницу
}

export { RequireCrossword }