import { useState } from 'react';
import api from '../../api/axios';
import toast from 'react-hot-toast';

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
            toast.success("Shipment updated and forwarded successfully!");
            return response.data;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to update shipment.';
            toast.error(errorMessage);
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };
     const markAsDelivered = async (shipmentId) => {
        setIsLoading(true);
        try {
            const response = await api.put(`/shipments/${shipmentId}/status`, { status: "Delivered" });
            toast.success("Shipment marked as Delivered!");
            return response.data;
        } catch (err) {
            const errorMessage = err.response?.data?.details || 'Failed to mark as delivered.';
            toast.error(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return { dispatchShipment, markAsDelivered, isLoading, error };
};