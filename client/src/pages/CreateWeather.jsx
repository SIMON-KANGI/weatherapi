import { useState } from 'react';
import { createAxiosInstance } from '../api/axios';// Import the function separately

const CreateWeather = () => {
    const [values, setValues] = useState({
        temperature: '',
        humidity:'',
        windspeed: '',
        rain_level: '',
        activity: '',
        state:''
        // user_id: ''
    });
   const userId=localStorage.getItem('id');
   console.log(userId);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        
        e.preventDefault();
       
        try {
            const axiosInstance = createAxiosInstance(); // Create an instance using the function
            await axiosInstance.post('/weather', values);
            // Clear input values after successful submission
            setValues({
                temperature: '',
                humidity:'',
                windspeed: '',
                rain_level: '',
                activity: '',
                state:''
                // user_id: userId // Retain user_id if needed
            });
            console.log('Location created successfully');
            console.log(values);
        } catch (error) {
            console.error('Error creating location:', error);
            console.log(values);
        }
    };

    return (
        <div className='flex items-center justify-center m-3'>
            <form className='bg-blue-900 p-4' onSubmit={handleSubmit}>
               
                <div className="w-full text-xl  p-3">
                    <label className='text-white absolute pl-6 mb-2  -m-6'>Temperature in C</label>
                   <input className='text-black relative' onChange={handleChange} type="number" name='temperature' value={values.temperature}/>
                </div>
                <div className="w-full text-xl p-3">
                    <label className='text-white absolute pl-6 mb-2  -m-6'>Humidity</label>
                    <input type="number" name='humidity' onChange={handleChange} value={values.humidity}/>
                    
                </div>
                <div className="w-full text-xl p-3">
                    <label className='text-white absolute pl-6 mb-2  -m-6'>Wind</label>
                    <input type="number" name='windspeed' onChange={handleChange} value={values.windspeed}/>
                    
                </div>
                <div className="w-full text-xl p-3">
                    <label className='text-white absolute pl-6 mb-2  -m-6'>Precipitation</label>
                    <input type="number" name='rain_level' onChange={handleChange} value={values.rain_level}/>
                    
                </div>
                <div className="w-full text-xl p-3">
                    <label className='text-white'>Weather</label>
                    <select className='m-3' name="state" value={values.state} onChange={handleChange}>
                        <option value="">Choose activity</option>
                        <option value="Rainy">Rainy</option>
                        <option value="Calm">Calm</option>
                        <option value="Cold">Cold</option>
                        <option value="Windy">Windy</option>
                        <option value="Stormy">Stormy</option>
                        <option value="Sunny">Sunny</option>
                        <option value="Dry">Dry</option>
                    </select>
                    
                </div>

                <div className="w-full text-xl p-3">
                    <label className='text-white'>Activity</label>
                    <select className='m-3' name="activity" value={values.activity} onChange={handleChange}>
                        <option value="">Choose activity</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="Fishing">Fishing</option>
                        <option value="Mining">Mining</option>
                        <option value="Transport">Transport</option>
                        <option value="Ice Skating">Ice Skating</option>
                        <option value="Swimming">Swimming</option>
                    </select>
                    
                </div>

                <button type="submit" className="bg-white text-black py-3 px-8">Submit</button>
            </form>
        </div>
    );
};

export default CreateWeather;
