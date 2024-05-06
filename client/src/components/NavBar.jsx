import React from 'react'
import { Link } from 'react-router-dom'
import Logout from '../pages/Logout'
import useAuth from "../Hooks/useAuth";
import { useSelector } from "react-redux";
import { selectCurrentUser,selectCurrentLocation } from "../features/auth/authSlice";
function NavBar() {
  // const { auth} = useAuth();
  const user = useSelector(selectCurrentUser);
  const location = useSelector(selectCurrentLocation);
  return (
    <div className='w-full h-fit shadow-md bg-black text-blue-500'>
      <nav className="p-4"> 

        <ul className='flex justify-center p-4'>
        <li className='text-xl px-4'>
            <Link to='/login'>Login</Link>
        
            </li>
        <li className='text-xl px-4'>
            <Link to='/'>Home</Link>
        
            </li>
            <li className='text-xl px-4'>
            <Link to='/weather'>weather</Link>
        
            </li>
            <li className='text-xl px-4'>
            <Link to='/addlocation'>Create Location</Link>
        
            </li>
            <li className='text-xl px-4'>
            <Link to='/addweather'>Create Weather</Link>
        
            </li>
            <li>
            <h1 className='text-xl text-red-600 pr-3'> Welcome {user}</h1>
            </li>
            <li>
            <h1 className='text-xl text-green-600'>My Location {location}</h1>
            </li>
            <div>
           <Logout/>
        
            </div>

        </ul>
      </nav>
    </div>
  )
}

export default NavBar
