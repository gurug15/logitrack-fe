import React, { useState } from 'react';
import Input from './ui/Input';
import signupsvg from '../assets/authpage/signup.png'; // still using this image

const Signup = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-md w-96 rounded-2xl">
        <h2 className="text-2xl font-semibold text-center mb-2">Create an account</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your details to sign up and get started.
        </p>

        <form>
          <Input
            label="Full Name"
            name="name"
            placeholder="Enter your full name"
            type="text"
            value={user.name}
            onChange={handleChange}
          />
          <Input
            label="Email"
            name="email"
            placeholder="Enter your email"
            type="email"
            value={user.email}
            onChange={handleChange}
          />
          <Input
            label="Phone"
            name="phone"
            placeholder="Enter your phone number"
            type="tel"
            value={user.phone}
            onChange={handleChange}
          />
          <Input
            label="Password"
            name="password"
            placeholder="Create a password"
            type="password"
            value={user.password}
            onChange={handleChange}
          />

          <button
            className="mt-5 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            type="submit"
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
            <a href="#" className="text-blue-500 hover:underline">
              Log in
            </a>
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
