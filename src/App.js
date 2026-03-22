import { Routes, Route } from 'react-router-dom'
import { Main } from './components/Main'
import { Publication } from './components/Publication'
import { Layout } from './components/Layout'

import { CrosswordProvider } from './hoc/crosswordProvider'
import {RequireAuth} from './hoc/RequireAuth'
import { AuthProvider } from './hoc/AuthProvider'
import { Account } from './components/Account'
import { LoginModal } from './components/LoginModal'
import { Policy } from './components/Policy'
import { RequireCrossword } from './hoc/RequireCrossword'
import { fethcHealth } from './services/connection'
import { useEffect, useState } from 'react'
import HealthCheckPage from './components/HealthCheckPage'

function App(){
  
  const [healthStatus, setHealthStatus] = useState(null);

  async function getConnection(){
    try{
      var health = await fethcHealth();
    }
    catch(e){
      console.error(e);
      health = "Unhealthy";
    }
    return health;
  }

  // в useEffect нельзя напрямую использовать async, поэтому использую самовызывающуюся функцию
  useEffect(()=>{
    (async () => {
      setHealthStatus(await getConnection());
      // console.log(healthStatus);
      }
    )()
  },[])

  if(healthStatus === null) return null

  if(healthStatus !== "Healthy"){
      return(
      <>
        <HealthCheckPage/>
      </>
    )
  }
  return(
    <>
      <AuthProvider>
        <CrosswordProvider>
          <Routes>
            <Route path='/' element={ <Layout/> }>
              <Route index element={<Main/>}></Route>
              <Route path='/publication' element={<RequireCrossword><Publication/></RequireCrossword>}></Route>
              <Route path='/account' element={<RequireAuth><Account/></RequireAuth>}></Route>
              <Route path='/policy' element={<Policy/>}></Route>
            </Route>
          </Routes>
          <LoginModal/>
        </CrosswordProvider>
      </AuthProvider>
    </>
    )
}

export default App;