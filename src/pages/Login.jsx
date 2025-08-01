import React from 'react'
import Input from '../components/ui/Input';
import loginsvg from '../assets/authpage/loginpage.png';
import { Link } from 'react-router-dom';
import { useLogin } from '../assets/hooks/auth/useLogin';
// import { useLogin } from '../features/auth/hooks/useLogin';

const Login = () => {
    const {
        formData,
        errors,
        isLoading,
        handleChange,
        handleSubmit
    } = useLogin();

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='bg-white p-8 shadow-md w-96 rounded-2xl'>
                <h2 className="text-2xl font-semibold text-center mb-2">Hello again</h2>
                <p className="text-sm text-gray-500 text-center mb-6">
                    Welcome back, make sure to enter the credentials correctly.
                </p>
                
                <form onSubmit={handleSubmit}>
                    {/* Global error message */}
                    {errors.submit && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3  text-center rounded mb-4 text-sm">
                            {errors.submit}
                        </div>
                    )}

                    <Input 
                        onChange={handleChange}
                        placeholder="Enter your email" 
                        type="email" 
                        name="email"
                        value={formData.email} 
                        label="Email"
                        error={errors.email}
                        disabled={isLoading}
                    />
                    
                    <Input 
                        onChange={handleChange}
                        placeholder="Enter your password" 
                        type="password" 
                        name="password"
                        value={formData.password}
                        label="Password"
                        error={errors.password}
                        disabled={isLoading}
                    />
                    
                    <button 
                        className={`mt-5 w-full text-white p-2 rounded-md transition-colors ${
                            isLoading 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                    
                    <div className="flex items-center my-6">
                        <hr className="flex-grow border-gray-300" />
                        <span className="mx-2 text-gray-400 text-sm">or</span>
                        <hr className="flex-grow border-gray-300" />
                    </div>
                    
                    <p className="text-center text-sm text-gray-700">
                        Don't have an account yet?{' '}
                        <Link to="/signup" className="text-blue-500 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
            <div>
                <img src={loginsvg} alt="Placeholder" width={500} height={500} className='mt-5 ml-10' />
            </div>
        </div>
    )
}

export default Login
