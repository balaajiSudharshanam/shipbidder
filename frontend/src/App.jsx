import { useContext, useState } from 'react'
import {Route,Routes} from 'react-router-dom';
import './App.css'
import UserContextProvider, { userState } from './context/UserContextProvider'
import HomePage from './Pages/HomePage';
import ContactPage from './Pages/ContactPage';
import Login from './Pages/Login';
import ServicePage from './Pages/ServicePage';
import SeekerDash from './Pages/SeekerDash';
import ProviderDashBoard from './Pages/ProviderDashBoard';

function App() {
  const [count, setCount] = useState(0)
 const {user,setUser}=userState();
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
      <Route path='/contact' element={<ContactPage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/service' element={<ServicePage/>}/>
      <Route path='/seeker' element={<SeekerDash/>}/>
      <Route path='/provider' element={<ProviderDashBoard/>}/>
      
      </Routes>
        
    </div>
  )
}

export default App
