import { Routes, Route } from 'react-router-dom'
import { Main } from './Main'
import { Publication } from './Publication'
import { Layout } from './components/Layout'

// document.onreset

function App(){
  return(
    <>
      <Routes>
        <Route path='/' element={ <Layout/> }>
          <Route index element={<Main/>}></Route>
          <Route path='/publication' element={<Publication/>}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App;