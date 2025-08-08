import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../api/axios';


export const useTracking = () => {

    const [searchParams] = useSearchParams();
     const trackingId = searchParams.get('trackingId');
    const [shipment, setShipment] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const trackPackage = useCallback(async () => {
        if (!trackingId) return;

        setIsLoading(true);
        setError(null);
        try {
            // Call the backend endpoint with the tracking ID
            const response = await api.get(`/shipments/track`, { params: { trackingId } });
            
            setShipment(response.data);
        
        } catch (err) {
            console.log(err)
            setError('Failed to find shipment. Please check the tracking ID.');
            setShipment(null);
        } finally {
            setIsLoading(false);
        }
    }, [trackingId]);

    useEffect(() => {
        trackPackage();
    }, [trackPackage]);

    return { shipment, isLoading, error, trackPackage };
};