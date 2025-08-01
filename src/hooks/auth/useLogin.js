import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/axios';

export const useLogin = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  

  const [errors, setErrors] = useState({});
  

  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();


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


  const loginAPI = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Login failed');
  }
}
  const handleSubmit = async (e) => {
    e.preventDefault();
    
   
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({}); 
    
    try {
     
      const response = await loginAPI(formData);
      console.log(response)
      
      localStorage.setItem('token', response);
      // resetForm();
      navigate('/');
      
    } catch (error) {
   
      setErrors({ 
        submit: error.message || 'Something went wrong. Please try again.' 
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
