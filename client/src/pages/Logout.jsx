import React from 'react';
import { toast } from 'react-toastify';
import { createAxiosInstance } from '../app/api/axios';
import { logout } from '../features/auth/authSlice';
import { useDispatch } from'react-redux';
function Logout() {
  const axiosInstance = createAxiosInstance();
const dispatch=useDispatch()
  function handleLogout() {
    setTimeout(()=> {
      //  axiosInstance.delete('/logout')
      // .then(response => {
      //   if (response.status === 200) {
      //     // Clear access token from local storage
      //     localStorage.removeItem('access_token');
      //     toast.success('Logged out successfully');
      //     // Redirect to login page
      //     window.location.href = '/login';
      //   } else {
      //     console.error('Logout failed');
      //     toast.error('Error logging out',{position:'top-right'});
      //   }
      // })
      // .catch(error => {
      //   console.error('Logout error:', error);
      // });
      dispatch(logout())
      window.location.href = '/login';
    },3000)
   
  }

  return (
    <div>
      <button onClick={handleLogout} className='bg-white rounded-md text-black py-3 px-8' type="button">Logout</button>
    </div>
  );
}

export default Logout;
