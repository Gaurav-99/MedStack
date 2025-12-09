import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { LogOut, User, Menu } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    };

    return (
        <header className='bg-white shadow-md'>
            <div className='container mx-auto px-4 py-3 flex justify-between items-center'>
                <div className='flex items-center space-x-4'>
                    <Link to='/' className='text-2xl font-bold text-blue-600 tracking-tight'>
                        MedStack
                    </Link>
                    <nav className='hidden md:flex space-x-4'>
                        <Link to='/' className='text-gray-600 hover:text-blue-500'>Feed</Link>
                        <Link to='/tags' className='text-gray-600 hover:text-blue-500'>Tags</Link>
                        <Link to='/about' className='text-gray-600 hover:text-blue-500'>About</Link>
                    </nav>
                </div>

                <div className='hidden md:flex items-center space-x-4'>
                    {user ? (
                        <>
                            <Link to='/ask' className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition'>
                                Ask Question
                            </Link>
                            <Link to='/profile' className='flex items-center space-x-2 text-gray-700 cursor-pointer hover:text-blue-600' title={user.name}>
                                <User size={20} />
                                <span className='font-medium'>{user.name}</span>
                            </Link>
                            <button onClick={onLogout} className='flex items-center text-gray-600 hover:text-red-500'>
                                <LogOut size={20} />
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to='/login' className='text-blue-600 font-medium hover:underline'>Log In</Link>
                            <Link to='/register' className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition'>
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile menu button */}
                <div className='md:hidden'>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <Menu size={24} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className='md:hidden bg-gray-50 border-t px-4 py-2 space-y-2'>
                    <Link to='/' className='block text-gray-700'>Feed</Link>
                    <Link to='/tags' className='block text-gray-700'>Tags</Link>
                    <Link to='/about' className='block text-gray-700'>About</Link>
                    {user ? (
                        <>
                            <Link to='/ask' className='block text-blue-600'>Ask Question</Link>
                            <button onClick={onLogout} className='block text-red-500 w-full text-left'>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to='/login' className='block text-blue-600'>Log In</Link>
                            <Link to='/register' className='block text-blue-600'>Sign Up</Link>
                        </>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;
