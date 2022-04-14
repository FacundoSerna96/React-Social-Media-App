import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Messenger from './pages/messenger/Messenger'


import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';

//react router dom
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";


const App = () => {
  const {user} = useContext(AuthContext);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={user? <Home /> : <Register />}></Route>
        <Route path='/login' element={user? <Navigate replace to="/" /> : <Login />}></Route>
        <Route path='/register' element={user? <Navigate replace to="/" /> : <Register />}></Route>
        <Route path='/messenger' element={!user ? <Navigate replace to="/" /> : <Messenger />}></Route>
        <Route exact path='/home' element={<Home />}></Route>
        <Route path='/profile/:username' element={<Profile />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
