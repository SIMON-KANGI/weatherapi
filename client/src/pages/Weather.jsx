import React, { useEffect, useState } from 'react';
import { instance } from '../app/api/axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

function Weather() {
    const [weather, setWeather] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWeather = () => {
            instance.get('/weather')
                .then(response => {
                    setWeather(response.data);
                })
                .catch(error => {
                    if (error.response && error.response.status === 401) {
                        // Unauthorized - redirect to login page
                        navigate('/login');
                    } else {
                        console.error('Error fetching weather data:', error);
                    }
                });
        };

        fetchWeather();

        // Set up token refresh interval
        const refreshInterval = setInterval(() => {
            instance.post('/refresh_token')
                .then(response => {
                    // Update access token in local storage
                    localStorage.setItem('access_token', response.data.access_token);
                    // Call fetchWeather to update weather data with the new token
                    fetchWeather();
                })
                .catch(error => {
                    console.error('Error refreshing token:', error);
                });
        }, 15 * 60 * 1000); // Refresh token every 15 minutes

        return () => clearInterval(refreshInterval); // Cleanup interval on component unmount
    }, [navigate]);

    if (!weather || weather.length === 0) {
        return (
            <div className="text-center">
                <h1>Loading...</h1>
            </div>
        );
    }

    const viewLocations = (weatherData) => {
        navigate(`/details/${weatherData.id}`, { state: { weather: weatherData } });
    };

    return (
        <>

    
            <div className='text-center'>
        
            <table className='border-2 border-slate-950 w-1/2 m-3 text-center'>
                <thead className='border-2 bg-slate-400 border-neutral-800'>
                    <tr>
                        <th className='border-2 border-gray-600'>Location</th>
                        <th className='border-2 border-gray-600'>Temperature</th>
                        <th className='border-2 border-gray-600'>Humidity</th>
                        <th className='border-2 border-gray-600'>Wind</th>
                        <th className='border-2 border-gray-600'>Precipitation</th>
                        <th className='border-2 border-gray-600'>Weather</th>
                        <th className='border-2 border-gray-600'>Activity</th>
                    </tr>
                </thead>
                <tbody>
                    {weather.map((weatherData, index) => (
                        <tr key={index} className='border-2 border-gray-600'>
                            <td className='border-2 border-gray-600'>
                                <button  className="text-blue-500 bg-black w-full py-3" onClick={() => viewLocations(weatherData)}>View locations</button>
                            </td>
                            <td className='border-2 border-gray-600 text-red-500 font-bold'>{weatherData.temperature}</td>
                            <td className='border-2 border-gray-600'>{weatherData.humidity}</td>
                            <td className='border-2 border-gray-600'>{weatherData.windspeed}</td>
                            <td className='border-2 border-gray-600 text-blue-600 font-bold'>{weatherData.rain_level}</td>
                            <td className='border-2 border-gray-600'>{weatherData.state}</td>
                            <td className='border-2 border-gray-600'>{weatherData.activity}</td>
                           
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
        
    );
}

export default Weather;
