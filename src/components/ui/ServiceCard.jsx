const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-1 gap-3 rounded-lg border border-[#dbdee6] bg-white p-4 flex-col">
      <div className="text-[#111318]">
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-[#111318] text-base font-bold leading-tight">
          {title}
        </h2>
        <p className="text-[#606e8a] text-sm font-normal leading-normal">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;