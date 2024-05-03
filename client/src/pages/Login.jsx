import { useState } from 'react';
import useAuth from '../Hooks/useAuth';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {instance} from '../api/axios';

function Login() {
    const { setAuth } = useAuth();
    const [loginError, setLoginError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const formSchema = yup.object().shape({
        username: yup.string().required('Must enter a username').max(15),
        password: yup.string().required('Must enter a password').min(8),
    });

    return (
        <div className='home flex items-center justify-center'>
            <div className="bg-white w-1/4 h-fit p-8">
                <h1 className="text-center font-bold text-blue-600 text-2xl p-4">Login to your account</h1>
                <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={formSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(true);
                        instance.post('/login', values)
                            .then(response => {
                                localStorage.setItem('access_token', response.data.access_token);
                                localStorage.setItem('id', response.data.id);
                                setAuth({ username: values.username, password: values.password, access_token: response.data.access_token });
                                toast.success(`logged in as ${values.username}`, { position: 'top-right' });
                                navigate(from, { replace: true });
                            })
                            .catch(error => {
                                setLoginError(error.response?.data?.message || 'An error occurred');
                                toast.error("Wrong login information");
                            })
                            .finally(() => {
                                setSubmitting(false);
                            });
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="block">
                            {loginError && <div className="text-red-600">{loginError}</div>}
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

                            <button className="bg-blue-600 py-3 w-3/4 text-center text-white rounded-md" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Logging in...' : 'Login'}
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
