import { NavLink, Outlet } from 'react-router-dom'

// document.onreset

function Layout(){
  return(
    <>
      <header style={{background: "grey", textAlign: "center", padding: "1%", top: "0", position: "sticky", height: "25px"}}>
        <NavLink to='/' className={({isActive}) => `navlink ${isActive ? 'active': ''}`}>Создать кроссворд</NavLink>
        <NavLink to='/publication' className={({isActive}) => `navlink ${isActive ? 'active' : ''}`}>Опубликовать</NavLink>
      </header>
      <Outlet></Outlet>
      <footer>
        Кроссворды
      </footer>
    </>
  )
}

export { Layout };