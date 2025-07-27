import { useState } from 'react';

const TrackingInput = ({ onTrack, placeholder = "Enter tracking number" }) => {
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleInputChange = (e) => {
    setTrackingNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onTrack && trackingNumber.trim()) {
      onTrack(trackingNumber.trim());
    }
  };

  return (
    <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
      <form onSubmit={handleSubmit} className="flex flex-col min-w-40 flex-1">
        <input
          placeholder={placeholder}
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111318] focus:outline-0 focus:ring-0 border border-[#dbdee6] bg-white focus:border-[#dbdee6] h-14 placeholder:text-[#606e8a] p-[15px] text-base font-normal leading-normal"
          value={trackingNumber}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
};

export default TrackingInput;