import { NavLink, Outlet } from 'react-router-dom'
import accountIcon from '../images/edit.svg'

// document.onreset

function Layout(){
  return(
    <>
      <header>
        <NavLink to='/' className={({isActive}) => `navlink ${isActive ? 'active': ''}`}>Создать кроссворд</NavLink>
        <NavLink to='/publication' className={({isActive}) => `navlink ${isActive ? 'active' : ''}`}>Опубликовать</NavLink>
        <NavLink to='/account'><img src={accountIcon} style={{width:"1vw"}} alt='account'/></NavLink>
      </header>
      <Outlet></Outlet>
      <footer style={{width: "100%", background: "#AFAFAF", marginTop: "120px", bottom: 0, position: "relative"}}>
        Кроссворды
      </footer>
    </>
  )
}

export { Layout };