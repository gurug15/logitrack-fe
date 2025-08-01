import React from 'react';
import Input from '../components/ui/Input';
import signupsvg from '../assets/authpage/signup.png'; // still using this image
import { Link } from 'react-router-dom';
import { useSignUp } from '../hooks/auth/useSignup';

const Signup = () => {
 const {user,errors,isLoading,handleChange,handleSubmit} = useSignUp();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-md w-96 rounded-2xl">
        <h2 className="text-2xl font-semibold text-center mb-2">Create an account</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your details to sign up and get started.
        </p>

        <form onSubmit={handleSubmit}>
              {errors.submit && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3  text-center rounded mb-4 text-sm">
                                {errors.submit}
                            </div>
              )}
          <Input
            label="Full Name"
            name="name"
            placeholder="Enter your full name"
            type="text"
            value={user.name}
            onChange={handleChange}
            disabled={isLoading}
            error={errors.name}
            />
          <Input
            label="Email"
            name="email"
            placeholder="Enter your email"
            type="email"
            value={user.email}
            onChange={handleChange}
            disabled={isLoading}
            error={errors.email}
          />
          <Input
            label="Phone"
            name="phone"
            placeholder="Enter your phone number"
            type="tel"
            value={user.phone}
            onChange={handleChange}
            disabled={isLoading}
            error={errors.phone}
          />
          <Input
            label="Password"
            name="password"
            placeholder="Create a password"
            type="password"
            value={user.password}
            onChange={handleChange}
            disabled={isLoading}
            error={errors.password}
          />

          <button
            className={`mt-5 w-full text-white p-2 rounded-md transition-colors ${
                            isLoading 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-500 hover:bg-blue-600'
                        }`}
            type="submit"
            disabled={isLoading}
          >
            Sign Up
          </button>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-400 text-sm">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <p className="text-center text-sm text-gray-700">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
             
      <div>
        <img
          src={signupsvg}
          alt="Signup visual"
          width={600}
          height={600}
          className="mt-5"
        />
      </div>
    </div>
  );
};

export default Signup;
