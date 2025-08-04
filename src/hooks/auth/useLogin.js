import { useState } from 'react';
import { useAuth } from './useAuth';

export const useLogin = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  

  const [errors, setErrors] = useState({});
  

  const [isLoading, setIsLoading] = useState(false);
  


  const validateForm = () => {
    const newErrors = {};


    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

   
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };


// REPLACE your old handleSubmit with this new one
const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({}); 
    
    try {
      // This one line replaces all the old logic.
      // It calls our AuthContext to do the hard work of logging in,
      // saving the token, and navigating.
      await login(formData.email, formData.password);
      
    } catch (error) {
      // If the login fails, the context will throw an error
      // which we can catch here and show on the form.
      setErrors({ 
        submit: error.response?.data?.message || error.response?.data || 'Invalid email or password.' 
      });
    } finally {
      setIsLoading(false);
    }
};


  const resetForm = () => {
    setFormData({
      email: '',
      password: ''
    });
    setErrors({});
  };

 
  return {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    resetForm
  };
};
