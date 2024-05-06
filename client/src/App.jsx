import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Weather from './pages/Weather';
import Register from './pages/Register';
import NavBar from './components/NavBar';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import CreateLocation from './pages/createLocation';
import CreateWeather from './pages/CreateWeather';
import WeatherDetails from './pages/WeatherDetails';
import Residents from './pages/Residents';
function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(()=>{
    const token=localStorage.getItem('access_token');
    if(token){
      setLoggedIn(true);
    }else{
      setLoggedIn(false);
    }
  },[])
  
  return (
    <main className='app'>
    <NavBar/>
      <Routes>
        <Route path='/' element={<Layout/>}>
        {/* public */}
        
           <Route path='register' element={<Register/>} />
          <Route path='login' element={<Login />} />
          <Route path='addlocation' element={<CreateLocation/>} />
            <Route path='addweather' element={<CreateWeather/>} />
          <Route element={<RequireAuth/>}>
            <Route path='/' element={<Home/>} />
            <Route path='weather' element={<Weather/>} />
            <Route path='details/:id' element={<WeatherDetails/>} />
            <Route path='residents/:id' element={<Residents/>} />
          </Route>
          
         
        </Route>
      </Routes>
    </main>
  );
}

export default App;

