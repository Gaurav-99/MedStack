import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';
import { Lock } from 'lucide-react';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            alert(message); // Simple alert for MVP, nice toast later
        }

        if (isSuccess || user) {
            navigate('/');
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email,
            password,
        };

        dispatch(login(userData));
    };

    if (isLoading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
        <div className='max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm border'>
            <div className='text-center mb-6'>
                <div className='inline-block p-3 bg-blue-100 rounded-full mb-2'>
                    <Lock className='text-blue-600' size={24} />
                </div>
                <h1 className='text-2xl font-bold'>Log In</h1>
                <p className='text-gray-500'>Access your MedStack account</p>
            </div>

            <section className='form'>
                <form onSubmit={onSubmit} className='space-y-4'>
                    <div className='form-group'>
                        <input
                            type='email'
                            className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            id='email'
                            name='email'
                            value={email}
                            placeholder='Enter your email'
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            id='password'
                            name='password'
                            value={password}
                            placeholder='Enter password'
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <button type='submit' className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-medium'>
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default Login;
