import { useState } from 'react';
import api from '../../api/axios';

export const useCreateShipment = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const createShipment = async (orderId) => {
        setIsLoading(true);
        setError(null);
        try {
            // Call the new backend endpoint we just created
            const response = await api.post(`/api/subadmin/orders/${orderId}/create-shipment`);
            return response.data; // Return the newly created shipment data
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to create shipment.';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return { createShipment, isLoading, error };
};