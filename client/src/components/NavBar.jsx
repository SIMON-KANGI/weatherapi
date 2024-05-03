import React from 'react'
import { Link } from 'react-router-dom'
import Logout from '../pages/Logout'
function NavBar({user, onLogOut}) {
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
            <li><h1 className='text-xl text-red-600'>{user?.username}</h1></li>
            <div>
           <Logout onLogOut={onLogOut}/>
        
            </div>

        </ul>
      </nav>
    </div>
  )
}

export default NavBar
