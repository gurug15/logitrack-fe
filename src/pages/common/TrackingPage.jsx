import React, { useState } from 'react';
import {  useNavigate, useSearchParams } from 'react-router-dom';
import { useTracking } from '../../hooks/shipments/useTracking';
import ProgressTracker from '../../components/ui/ProgressTracker';
import PackageDetails from '../../components/ui/PackageDetails';

// A simple input component for this page
const TrackingInput = ({ onTrack }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onTrack(inputValue.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 flex gap-2">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter your tracking ID..."
                className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <button
                type="submit"
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700"
            >
                Track
            </button>
        </form>
    );
};

const TrackingPage = () => {
    const navigate = useNavigate();
    // Use useSearchParams to read the query parameter from the URL
    const [searchParams] = useSearchParams();
    const trackingId = searchParams.get('trackingId');

    // The useTracking hook gets the ID from the URL itself, so no need to pass it as an argument.
    const { shipment, isLoading, error } = useTracking();

    const handleTrack = (newTrackingId) => {
        navigate(`/track?trackingId=${newTrackingId}`);
    };
    console.log(shipment);
    // This condition will now work correctly
    if (!trackingId) {
        return (
            <div>
                <div className="p-4">
                    <h1 className="text-[#111318] text-3xl font-bold">
                        Track Your Package
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Please enter your tracking ID below to see its progress.
                    </p>
                </div>
                <TrackingInput onTrack={handleTrack} />
            </div>
        );
    }
    
    // ... The rest of the component remains the same
    if (isLoading) {
        return <div className="p-10 text-center">Searching for shipment: {trackingId}...</div>;
    }

    return (
        <div>
            {/* ... rest of the JSX */}
            <div className="flex flex-wrap justify-between items-center gap-3 p-4">
                <div>
                    <h1 className="text-[#111318] text-3xl font-bold">
                        Tracking Details
                    </h1>
                    <p className="text-gray-500 font-mono mt-1">{trackingId}</p>
                </div>
            </div>
            
            {error && !shipment && (
                <div className="p-4">
                    <div className="text-center text-red-500 bg-red-50 rounded-md p-4">
                        {error}
                    </div>
                    <p className="text-center text-gray-500 mt-4">
                        Want to try another ID?
                    </p>
                    <TrackingInput onTrack={handleTrack} />
                </div>
            )}
            
            {shipment && (
                <>
                    <ProgressTracker progressData={shipment.trackingHistory} />
                    <PackageDetails packageData={shipment} />
                </>
            )}
        </div>
    );
};

export default TrackingPage;