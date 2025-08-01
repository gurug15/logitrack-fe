import SearchBar from '../SearchBar';

const HeroSection = ({ onSearch }) => {
  const heroImageUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuAW5GELLqtmSIYUK0M5-dNt0ElowONKrX5WYc2ccl-TT8xAyDEzfFxR9LkFTFhKTNr0NrD3CR3YKLY4VhI4sQ8Lf1F_jvN1WMn6sgmdnYU18S3plm9b2KU9hD9VI0v7pdiU-fHOj2pQU6fKWy3AnCwnaR9fKZTw680_kZ36aOdkB2cNCKrez9JcBwFNZraQ4p1c4i5Xj86K55RDeZSp_tDaochOWUAJMagTQ7Zyo78F9z89Rs1q2qHAcB8-CmRsTW5hb2pscJIYsFQ";

  return (
    <div className="@container">
      <div className="flex  gap-6 px-4 py-10 @[480px]:gap-8 @[864px]:flex-row">
        <div
          className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg @[480px]:h-auto @[480px]:min-w-[400px] @[864px]:w-full"
          style={{ backgroundImage: `url("${heroImageUrl}")` }}
        />
        
        <div className="flex flex-col gap-6 @[480px]:min-w-[400px] @[480px]:gap-8 @[864px]:justify-center">
          <div className="flex flex-col gap-2 text-left">
            <h1 className="text-[#111318] text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
              Streamline Your Logistics with LogiTRACK
            </h1>
            <h2 className="text-[#111318] text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
              Empower your e-commerce business with our comprehensive logistics platform. From efficient order creation to real-time tracking and reliable delivery, we've got you covered.
            </h2>
          </div>
          
          <SearchBar onSearch={onSearch} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;