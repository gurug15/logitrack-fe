const ProgressStep = ({ 
  icon, 
  title, 
  description, 
//   isCompleted = false, 
  isLast = false 
}) => {
  return (
    <>
      <div className="flex flex-col items-center gap-1 pt-3">
        <div className="text-[#111318]">
          {icon}
        </div>
        {!isLast && <div className="w-[1.5px] bg-[#dbdee6] h-2 grow"></div>}
      </div>
      <div className="flex flex-1 flex-col py-3">
        <p className="text-[#111318] text-base font-medium leading-normal">
          {title}
        </p>
        <p className="text-[#606e8a] text-base font-normal leading-normal">
          {description}
        </p>
      </div>
    </>
  );
};

export default ProgressStep;