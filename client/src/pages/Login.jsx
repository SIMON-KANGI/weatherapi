import { useState } from 'react';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';
import { authApiSlice } from '../features/auth/authApiSlice';
const {useLoginMutation}=authApiSlice
function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [login, { isLoading, isError }] = useLoginMutation();
    const from = location.state?.from?.pathname || '/';

    const formSchema = yup.object().shape({
        username: yup.string().required('Must enter a username').max(15),
        password: yup.string().required('Must enter a password').min(8),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            setSubmitting(true);
            const result = await login({ username: values.username, password: values.password });
            if (result.error) {
                // Handle login error
                toast.error(result.error.message);
            } else {
                const accessToken = result.data.access_token;
                // Dispatch action to set credentials in Redux store
                dispatch(setCredentials({...values, accessToken}));
                toast.success(`Logged in as ${values.username}`, { position: 'top-right' });
                navigate(from, { replace: true });
            }
        } catch (error) {
            // Handle unexpected errors
            toast.error('An unexpected error occurred');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className='home flex items-center justify-center'>
            <div className="bg-white w-1/4 h-fit p-8">
                <h1 className="text-center font-bold text-blue-600 text-2xl p-4">Login to your account</h1>
                <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={formSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="block">
                            <div className="block m-4 relative p-4">
                                <label className="absolute -top-6">Username*</label>
                                <Field type="text" name="username" className="w-3/4 p-2 border-gray-700 border-2" />
                                <ErrorMessage name="username" component="div" className="text-red-600" />
                            </div>

                            <div className="m-4 relative p-4">
                                <label className="absolute -top-6">Password*</label>
                                <Field type="password" name="password" className="w-3/4 p-2 border-gray-700 border-2" />
                                <ErrorMessage name="password" className="text-red-600" component="div" />
                            </div>

                            <button className="bg-blue-600 py-3 w-3/4 text-center text-white rounded-md" type="submit" disabled={isSubmitting || isLoading}>
                                {isLoading ? 'Logging in...' : 'Login'}
                            </button>
                            <p className="text-sm mt-2">Don't have an account? <Link to="/register" className="text-blue-600">Register here</Link></p>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default Login;
