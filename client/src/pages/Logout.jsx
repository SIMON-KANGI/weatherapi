import React from 'react';
import { toast } from 'react-toastify';

import { createAxiosInstance } from '../api/axios';
function Logout() {
  const axiosInstance = createAxiosInstance();
  function handleLogout() {
    axiosInstance.delete('/logout')
        .then(response => {
            if (response.status === 200) {
                // Clear access token from local storage
                // localStorage.removeItem('access_token');
                toast.success('Logged out successfully');
                window.location.reload();
            } else {
                console.error('Logout failed');
                window.location.reload();
            }
        })
        .catch(error => {
            console.error('Logout error:', error);
        });

}

  return (
    <div>
      <button onClick={handleLogout} className='bg-white text-black py-3 px-8' type="button">Logout</button>
    </div>
  );
}

export default Logout;
