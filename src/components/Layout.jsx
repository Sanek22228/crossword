import { NavLink, Outlet } from 'react-router-dom'
import avatarIcon from '../images/avatar.webp'
import { useAuth } from '../hook/useAuth';

// document.onreset

function Layout(){
  const {user, setLoginActive} = useAuth();
  function CheckAuthorization(e){
    if(!user){
      e.preventDefault();
      setLoginActive(true);
    }
  }
  return(
    <>
      <header>
        <div/>
        <nav>
          <NavLink to='/' className={({isActive}) => `navlink ${isActive ? 'active': ''}`}>Создать кроссворд</NavLink>
          <NavLink to='/feed' className={({isActive}) => `navlink ${isActive ? 'active' : ''}`}>Пройти кроссворд</NavLink>
        </nav>
          <NavLink onClick={CheckAuthorization} to={`/account/${user?.id}`} className="account-link"><img src={avatarIcon} style={{height:"100%"}} alt='account'/></NavLink>
      </header>
      <Outlet/>
      {/* <footer style={{width: "100%", background: "#AFAFAF", bottom: 0, position: "sticky"}}>
        Кроссворды
      </footer> */}
    </>
  )
}

export { Layout };