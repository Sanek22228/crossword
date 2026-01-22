import { NavLink, Outlet } from 'react-router-dom'

// document.onreset

function Layout(){
  return(
    <>
      <header style={{background: "#939393", textAlign: "center", padding: ".7%", top: "0", position: "sticky", maxHeight: "120px", marginBottom: "20px", zIndex: 10}}>
        <NavLink to='/' className={({isActive}) => `navlink ${isActive ? 'active': ''}`}>Создать кроссворд</NavLink>
        <NavLink to='/publication' className={({isActive}) => `navlink ${isActive ? 'active' : ''}`}>Опубликовать</NavLink>
      </header>
      <Outlet></Outlet>
      <footer style={{width: "100%", background: "#AFAFAF", marginTop: "120px", bottom: 0, position: "relative"}}>
        Кроссворды
      </footer>
    </>
  )
}

export { Layout };