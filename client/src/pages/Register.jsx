import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../features/auth/authSlice';
import { UserPlus } from 'lucide-react';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        school: '', // Added school field as per requirements
        year: '',
    });

    const { name, email, password, confirmPassword, school, year } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            alert(message);
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

        if (password !== confirmPassword) {
            alert('Passwords do not match');
        } else {
            const userData = {
                name,
                email,
                password,
                school,
                year
            };

            dispatch(register(userData));
        }
    };

    if (isLoading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
        <div className='max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm border'>
            <div className='text-center mb-6'>
                <div className='inline-block p-3 bg-blue-100 rounded-full mb-2'>
                    <UserPlus className='text-blue-600' size={24} />
                </div>
                <h1 className='text-2xl font-bold'>Register</h1>
                <p className='text-gray-500'>Join the medical community</p>
            </div>

            <section className='form'>
                <form onSubmit={onSubmit} className='space-y-4'>
                    <div className='form-group'>
                        <input
                            type='text'
                            className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            id='name'
                            name='name'
                            value={name}
                            placeholder='Full Name'
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='email'
                            className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            id='email'
                            name='email'
                            value={email}
                            placeholder='Email Address'
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <input
                            type='text'
                            className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            id='school'
                            name='school'
                            value={school}
                            placeholder='Med School'
                            onChange={onChange}
                        />
                        <input
                            type='text'
                            className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            id='year'
                            name='year'
                            value={year}
                            placeholder='Year (e.g. MS2)'
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            id='password'
                            name='password'
                            value={password}
                            placeholder='Password'
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            id='confirmPassword'
                            name='confirmPassword'
                            value={confirmPassword}
                            placeholder='Confirm Password'
                            onChange={onChange}
                            required
                        />
                    </div>

                    <div className="bg-yellow-50 p-3 rounded text-xs text-yellow-800 border border-yellow-200">
                        By registering, you acknowledge this site is for educational purposes only.
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

export default Register;
