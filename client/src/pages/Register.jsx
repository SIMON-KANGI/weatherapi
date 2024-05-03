import React from 'react';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
function Register() {
    const navigate=useNavigate()
    const { setAuth } = useAuth();
    const formSchema = yup.object().shape({
        email: yup.string().email('Invalid email').required('Must enter email'),
        username: yup.string().required('Must enter a name').max(15),
        password: yup.string().required('Must enter a password').min(8),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
    });

    return (
        <div className='home flex items-center justify-center'>
            <div className="bg-white w-1/4 h-fit p-8  items-center justify-center">
            <h1 className="text-center font-bold text-blue-600 text-2xl p-4">Register an account</h1>
            <Formik
                initialValues={{ username: '', email: '', password: '', confirmPassword: '',location:'' }}
                validationSchema={formSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        fetch('http://127.0.0.1:5555/users',{
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(values)
                        }).then((values)=>{
                            values,
                            // setAuth({username:values.username, password: values.password})
                            toast('Successfully submitted')
                            navigate('/login') 
                            console.log(values)
                        }).catch((err)=>{
                            console.log(err,values)
                        });
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="block">
    <div className="block m-4 w-full relative p-4">
        <label htmlFor="username">Username*</label>
        <Field type="text" name="username" className="w-3/4 p-2 rounded-sm border-gray-700 border-2" />
        <ErrorMessage name="username" component="div" className="text-red-600" />
    </div>
    <div className="m-4 w-full relative p-4">
        <label htmlFor="email">Email*</label>
        <Field type="email" name="email" className="w-3/4 p-2 rounded-sm border-gray-700 border-2" />
        <ErrorMessage name="email" className="text-red-600" component="div" />
    </div>
    <div className="m-4 w-full relative p-4">
        <label htmlFor="password">Password*</label>
        <Field type="password" name="password" className="w-3/4 p-2 rounded-sm border-gray-700 border-2" />
        <ErrorMessage name="password" className="text-red-600" component="div" />
    </div>
    <div className="m-4 w-full relative p-4">
        <label htmlFor="confirmPassword">Confirm Password*</label>
        <Field type="password" name="confirmPassword" className="w-3/4 p-2 rounded-sm border-gray-700 border-2" />
        <ErrorMessage name="confirmPassword" className="text-red-600" component="div" />
    </div>
    <div className="w-full text-xl p-3">
        <label htmlFor="location" className='text-white'>Location</label>
        <Field as="select" name="location" className='m-3 w-3/4 p-2 rounded-sm border-gray-700 border-2'>
            <option value="">Choose location</option>
            <option value="Nairobi">Nairobi</option>
            <option value="Kisumu">Kisumu</option>
            <option value="Eldoret">Eldoret</option>
            <option value="Mombasa">Mombasa</option>
            <option value="Muranga">Muranga</option>
            <option value="Turkana">Turkana</option>
        </Field>
    </div>
    <div className='w-full'>
        <button className="bg-blue-600 py-3 w-3/4 text-center font-bold text-white rounded-md" type="submit" disabled={isSubmitting}>
            Register
        </button> 
    </div>
</Form>

                )}
            </Formik>
            <h3>Already have an account?<Link to="/">Login</Link></h3>
        </div>  
        </div>
      
    );
}

export default Register;
