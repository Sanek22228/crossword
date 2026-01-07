import { Link, Outlet } from 'react-router-dom'

// document.onreset

function Layout(){
  return(
    <>
      <header>
        <Link to='/'>Создать кроссворд</Link>
        <Link to='/publication'>Опубликовать</Link>
      </header>
      <Outlet></Outlet>
      <footer>
        Кроссворды
      </footer>
    </>
  )
}

export { Layout };