import React from 'react'
import { useLocation } from 'react-router-dom'
import NavBar from '../components/NavBar'
function Residents() {
    const currentUser=useLocation()
    const location=currentUser.state?.location

    if (!location){
      return <h1>Loading...</h1>
    }
  return (
    <div>
    
 <table className='border-2 border-slate-950 w-1/2 m-3 text-center'>
    <thead className='border-2 bg-slate-400 border-neutral-800'>
      <tr>
        <th className='border-2 border-gray-600'>Name</th>
        <th className='border-2 border-gray-600'>Email</th>
        
      </tr>
    </thead>
    <tbody>
      {location.users?.map((user,index)=>{
      return(
        <tr className='border-2 border-gray-600' key={index}>
          <td className='border-2 border-gray-600'>{user.username}</td>
          <td className='border-2 border-gray-600'>{user.email}</td>
          <td></td>
          
         
        </tr>)
    })
      }
    </tbody>
      
    </table>
    </div>
  )
}

export default Residents
