import React, { useState } from 'react';
import Input from '../components/ui/Input';
import logosvg from '../assets/tracking/logo.png';
const useTracking = () => {
    const [trackingId, setTrackingId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setTrackingId(e.target.value);
        if (error) setError(null);
    };

    const handleTrackOrder = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        console.log('Tracking ID submitted:', trackingId);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            if (trackingId.length < 5) {
                setError("Invalid Tracking ID. Please try again.");
            } else {
                console.log("Order tracked successfully (simulated)!");
            }
        } catch (err) {
            setError("Failed to track order. Please try again later.");
            console.error("Tracking error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        trackingId,
        isLoading,
        error,
        handleChange,
        handleTrackOrder
    };
};

const TrackingPage = () => {
    const {
        trackingId,
        isLoading,
        error,
        handleChange,
        handleTrackOrder
    } = useTracking();

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='bg-white p-8 shadow-md w-96 rounded-2xl'>
                <div className="flex justify-center items-center mb-4">
                   <img src={logosvg} alt="Placeholder" className='w-40 h-7 mr-2' />
                </div>

                <p className="text-sm text-gray-600 text-center mb-6">
                    Welcome back, before logging in, make sure you enter the account correctly.
                </p>

                <form onSubmit={handleTrackOrder}>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
                            {error}
                        </div>
                    )}

                    <Input
                        onChange={handleChange}
                        placeholder="Enter your Tracking Id"
                        type="text"
                        name="trackingId"
                        value={trackingId}
                        label="Tracking Id"
                        error={null}
                        disabled={isLoading}
                    />

                    <button
                        className={`mt-5 w-full text-white p-2 rounded-md transition-colors ${
                            isLoading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Tracking...' : 'Track Order'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default TrackingPage;