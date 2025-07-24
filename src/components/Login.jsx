import React, { useState } from 'react'
import Input from './ui/Input';
import loginsvg  from '../assets/authpage/loginpage.png';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <div className='bg-white p-8 shadow-md w-96 rounded-2xl'>
            <h2 className="text-2xl font-semibold text-center mb-2">Hello again</h2>
            <p className="text-sm text-gray-500 text-center mb-6">
                Welcome back, make sure to enter the credentials correctly.
            </p>
            <form>
                <Input 
                    onChange={(e) => setEmail(e.target.value)}  
                    placeholder="Enter your email" 
                    type="email" 
                    value={email} 
                    label="Email"
                />
                <Input 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Enter your password" 
                    type="password" 
                    value={password}
                    label="Password"
                />
                
                <button className='mt-5 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600' type='submit'>Login</button>
                 <div className="flex items-center my-6">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-2 text-gray-400 text-sm">or</span>
                    <hr className="flex-grow border-gray-300" />
                </div>
                 <p className="text-center text-sm text-gray-700">
                    Don’t have an account yet?{' '}
                    <a href="#" className="text-blue-500 hover:underline">
                        Sign up
                    </a>
                 </p>
            </form>
        </div>
        <div>
            <img src={loginsvg} alt="Placeholder" width={600} height={600} className='mt-5' />
        </div>
    </div>
  )
}

export default Login