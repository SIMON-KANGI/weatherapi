import { useState } from 'react';
import { createAxiosInstance } from '../api/axios';// Import the function separately

const CreateLocation = () => {
    const [values, setValues] = useState({
        name: '',
        activity: '',
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
            await axiosInstance.post('/location', values);
            // Clear input values after successful submission
            setValues({
                name: '',
                activity: '',
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
                <div className="w-full text-xl p-3">
                    <label className='text-white m-3'>Name </label>
                    <input type="text" name='name' value={values.name} onChange={handleChange} />
                </div>
                <div className="w-full text-xl p-3">
                    <label className='text-white'>Location</label>
                    <select className='m-3' name="name" value={values.name} onChange={handleChange}>
                        <option value="">Choose location</option>
                        <option value="Nairobi">Nairobi</option>
                        <option value="Kisumu">Kisumu</option>
                        <option value="Eldoret">Eldoret</option>
                        <option value="Mombasa">Mombasa</option>
                        <option value="Nakuru">Nakuru</option>
                        <option value="Turkana">Turkana</option>
                        <option value="Muranga">Muranga</option>
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

export default CreateLocation;
