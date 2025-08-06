import { useState, useEffect } from 'react';

import api from '../../api/axios';
import { useAuth } from '../auth/useAuth';

export const useUserProfile = (isOpen) => {
    const { logout } = useAuth(); 
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    
    // Form data for editing
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
    });
    
    // Full user profile data
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        // Fetch full profile details when the modal is opened
        if (isOpen) {
            const fetchProfile = async () => {
                setIsLoading(true);
                try {
                    const response = await api.get('/users/profile/me');
                    setProfile(response.data);
                    // Pre-fill the form data for editing
                    setFormData({
                        name: response.data.name,
                        phone: response.data.phone,
                    });
                } catch (err) {
                    console.log(err);
                    setError('Failed to load profile.');
                } finally {
                    setIsLoading(false);
                }
            };
            fetchProfile();
        }
    }, [isOpen]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        // Reset form data to original values if canceling edit
        if (isEditing) {
            setFormData({ name: profile.name, phone: profile.phone });
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await api.put('/users/profile/me', formData);
            setProfile(response.data); // Update profile with new data
            setIsEditing(false); // Exit edit mode
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save changes.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        profile,
        isLoading,
        error,
        isEditing,
        formData,
        logout,
        handleEditToggle,
        handleChange,
        handleSave,
    };
};