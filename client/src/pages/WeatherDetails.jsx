import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function WeatherDetails() {
  const navigate = useNavigate();
  const currentWeather = useLocation();
  const weather = currentWeather.state?.weather;

  function viewResidents(loc) {
    navigate(`/residents/${loc.id}`, { state: { location: loc } });
  }

  return (
    <div>
      <table className='border-2 border-slate-950 w-1/2 m-3 text-center'>
        <thead className='border-2 bg-slate-400 border-neutral-800'>
          <tr>
            <th className='border-2 border-gray-600'>Name</th>
            <th className='border-2 border-gray-600'>Activity</th>
            <th className='border-2 border-gray-600'>Residents</th>
          </tr>
        </thead>
        <tbody>
          {weather.location.map((loc) => (
            <tr key={loc.id} className='border-2 border-gray-600'>
              <td className='border-2 border-gray-600'>{loc.name}</td>
              <td className='border-2 border-gray-600'>{loc.activity}</td>
              <td className='border-2 border-gray-600'>
                <button className="bg-black text-blue-500 py-3 w-full" onClick={() => viewResidents(loc)}>Residents</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WeatherDetails;
