import { NavLink, Outlet } from 'react-router-dom'
import avatarIcon from '../images/avatar.webp'

// document.onreset

function Layout(){
  return(
    <>
      <header>
        <div/>
        <nav>
          <NavLink to='/' className={({isActive}) => `navlink ${isActive ? 'active': ''}`}>Создать кроссворд</NavLink>
          <NavLink to='/publication' className={({isActive}) => `navlink ${isActive ? 'active' : ''}`}>Опубликовать</NavLink>
        </nav>
        <NavLink to='/account' className="account-link"><img src={avatarIcon} style={{height:"100%"}} alt='account'/></NavLink>
      </header>
      <Outlet></Outlet>
      <footer style={{width: "100%", background: "#AFAFAF", marginTop: "120px", bottom: 0, position: "relative"}}>
        Кроссворды
      </footer>
    </>
  )
}

export { Layout };