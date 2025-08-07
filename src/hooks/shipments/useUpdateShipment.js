import { useState } from 'react';
import api from '../../api/axios';

export const useUpdateShipment = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // This function now just takes the shipmentId.
    // We always send "In Transit" to trigger the backend's smart routing logic.
    const dispatchShipment = async (shipmentId) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.put(`/shipments/${shipmentId}/status`, { status: "In Transit" });
            return response.data;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to update shipment.';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return { dispatchShipment, isLoading, error };
};