import { Routes, Route } from 'react-router-dom'
import { Main } from './components/Main'
import { Publication } from './components/Publication'
import { Layout } from './components/Layout'

import { CrosswordProvider } from './hoc/crosswordProvider'
import {RequireAuth} from './hoc/RequireAuth'
import { AuthProvider } from './hoc/AuthProvider'
import { Account } from './components/Account'
import { LoginModal } from './components/LoginModal'

function App(){
  return(
    <>
      <AuthProvider>
        <CrosswordProvider>
          <Routes>
            <Route path='/' element={ <Layout/> }>
              <Route index element={<Main/>}></Route>
              <Route path='/publication' element={<Publication/>}></Route>
              <Route path='/account' element={<RequireAuth><Account/></RequireAuth>}></Route>
            </Route>
          </Routes>
          <LoginModal/>
        </CrosswordProvider>
      </AuthProvider>
    </>
  )
}

export default App;