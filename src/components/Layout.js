import { NavLink, Outlet } from 'react-router-dom'
<<<<<<< HEAD
=======
import accountIcon from '../images/edit.svg'
>>>>>>> backend

// document.onreset

function Layout(){
  return(
    <>
      <header style={{background: "#939393", textAlign: "center", padding: ".7%", top: "0", position: "sticky", maxHeight: "120px", marginBottom: "20px", zIndex: 10}}>
        <NavLink to='/' className={({isActive}) => `navlink ${isActive ? 'active': ''}`}>Создать кроссворд</NavLink>
        <NavLink to='/publication' className={({isActive}) => `navlink ${isActive ? 'active' : ''}`}>Опубликовать</NavLink>
<<<<<<< HEAD
=======
        <NavLink to='/account'><img src={accountIcon} style={{width:"1vw"}} alt='account'/></NavLink>
>>>>>>> backend
      </header>
      <Outlet></Outlet>
      <footer style={{width: "100%", background: "#AFAFAF", marginTop: "120px", bottom: 0, position: "relative"}}>
        Кроссворды
      </footer>
    </>
  )
}

export { Layout };