import { Routes, Route } from 'react-router-dom'
import { Main } from './components/Main'
import { Publication } from './components/Publication'
import { Layout } from './components/Layout'

import { CrosswordProvider } from './hoc/crosswordProvider'

function App(){
  return(
    <>
      <CrosswordProvider>
        <Routes>
          <Route path='/' element={ <Layout/> }>
            <Route index element={<Main/>}></Route>
            <Route path='/publication' element={<Publication/>}></Route>
          </Route>
        </Routes>
      </CrosswordProvider>
    </>
  )
}

export default App;