import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

function Login(){
  const location = useLocation();
  let {user, signin} = useAuth();

  if(user){
    return <Navigate to={location.state?.from?.pathname || "/"} replace/>
  }

  const SubmitLogin = (event) => {
    event.preventDefault();
    signin('user');
    /* 
      в location хранятся данные о текущей странице и state, который мы передаем из RequireAuth, 
      в нем: from:location, который содержит pathname предыдущей страницы (с которой передали state). 
      А с помощью replace: true мы уберем login page из истории и при возврате назад не сомжем попасть снова на login
    */
  }

  return(
    <>
     <form>
        <button type="submit" onClick={SubmitLogin}></button>
     </form>
    </>
  );
}

export {Login};