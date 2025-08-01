
import { PackageIcon, MapPinIcon, TruckIcon } from '../Icons';
import ServiceCard from '../ServiceCard';

const ServicesSection = () => {
  const services = [
    {
      icon: <PackageIcon />,
      title: "Efficient Order Creation",
      description: "Simplify order management with our intuitive platform, allowing for quick and accurate order creation."
    },
    {
      icon: <MapPinIcon />,
      title: "Real-Time Tracking",
      description: "Keep your customers informed with real-time tracking updates, providing transparency and peace of mind."
    },
    {
      icon: <TruckIcon />,
      title: "Reliable Delivery",
      description: "Ensure timely and secure delivery of your packages, minimizing delays and maximizing customer satisfaction."
    }
  ];

  return (
    <div className="flex flex-col gap-10 px-4 py-10 @container">
      <div className="flex flex-col gap-4">
        <h1 className="text-[#111318] tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
          Our Services
        </h1>
        <p className="text-[#111318] text-base font-normal leading-normal max-w-[720px]">
          LogiTRACK offers a suite of services designed to optimize your logistics operations and enhance customer satisfaction.
        </p>
      </div>
      
      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-0">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;