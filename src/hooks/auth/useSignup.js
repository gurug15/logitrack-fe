import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";


export const useSignUp = ()=>{

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        logisticCenterId: ''
      });
    const [centers, setCenters] = useState([]); 
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


     useEffect(() => {
        const fetchCenters = async () => {
            try {
                const response = await api.get('/logistic-centers');
                // Add a disabled "placeholder" option to the start of the array
                const formattedCenters = response.data.map(center => ({
                    value: center.id,
                    label: center.name
                }));

                setCenters([{ id: '', name: 'Select your nearest center' }, ...formattedCenters]);
            } catch (error) {
                console.error("Failed to fetch logistic centers", error);
                setErrors(prev => ({ ...prev, submit: 'Could not load centers.' }));
            }
        };
        fetchCenters();
    }, []); 
    const validateForm = () => {
          const newErrors = {};

              
          if (!user.name.trim()) {
            newErrors.name= 'Name is required';
          }else if(user.name.length < 3 || user.name.length > 50){
              newErrors.name = "name must be in range 3 to 50 char";
          }
          
          if (!user.email.trim()) {
            newErrors.email = 'Email is required';
          } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(user.email)) {
            newErrors.email = 'Please enter a valid email address';
          }

          if (!user.phone.trim()) {
            newErrors.phone = 'Phone number is required';
          } else if (!/^[6-9]\d{9}$/.test(user.phone)) {
            newErrors.phone = 'Please enter a valid phone number';
          }
          
          if (!user.logisticCenterId) {
            newErrors.logisticCenterId = 'Please select your logistic center';
           }

          if (!user.password) {
            newErrors.password = 'Password is required';
          } else if (user.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
          }
          console.log("inside validation")
          setErrors(newErrors);
          return Object.keys(newErrors).length === 0;
    };
  console.log("outside validation")

    const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    console.log(name,"  --- ", value)
      if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
console.log("user data: ",user )
  const signUpAPI = async (credentials)=>{
    console.log("user data inside api: " ,user)
    try {
        const response = await api.post("/signup", credentials);
        return response.data;
    } catch (error) {
        throw new Error(error.message || 'Signup failed');
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
     
      const response = await signUpAPI(user);
      console.log(response)
      
      // localStorage.setItem('token', response);
      // resetForm();
      navigate('/login');
      
    } catch (error) {
   
      setErrors({ 
        submit: error.message || 'Something went wrong. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };
   const resetForm = () => {
    setUser({
      email: '',
      password: '',
      phone: '',
      name:''
    });
    setErrors({});
  };

  return {
    user,
    centers,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    resetForm
  };
}