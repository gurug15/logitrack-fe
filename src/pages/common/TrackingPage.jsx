import { useState } from 'react';
import TrackingInput from '../../components/ui/TrackingInput';
import ProgressTracker from '../../components/ui/ProgressTracker';
import PackageDetails from '../../components/ui/PackageDetails';

const TrackingPage = () => {
  const [trackingData, setTrackingData] = useState(null);

  console.log(trackingData);
  
  const handleTrack = (trackingNumber) => {
    console.log('Tracking package:', trackingNumber);
    // Here you would typically fetch tracking data from an API
    // For now, we'll use the default data
    setTrackingData({
      // You can customize this data based on the tracking number
      trackingNumber: trackingNumber
    });
  };

  return (
    <div>
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <p className="text-[#111318] tracking-light text-[32px] font-bold leading-tight min-w-72">
          Track your package
        </p>
      </div>
      
      <TrackingInput onTrack={handleTrack} />
      
      <ProgressTracker />
      
      <PackageDetails />
      
      <p className="text-[#606e8a] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center">
        © 2024 LogiTRACK. All rights reserved.
      </p>
    </div>
  );
};

export default TrackingPage;