import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios'; // Adjust path as needed

export const useCreateCenter = () => {
    const navigate = useNavigate();
    const [center, setCenter] = useState({
        name: '',
        city: '',
        state: '',
        address: '',
        postalcode: '',
        contactPhone: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Generic handler to update form state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCenter(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            await api.post('/logistic-centers', center);
            // On success, navigate back to the centers list
            navigate('/admin/centers'); 
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create center. Please try again.');
            console.error('Create center error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        center,
        isLoading,
        error,
        handleChange,
        handleSubmit
    };
};