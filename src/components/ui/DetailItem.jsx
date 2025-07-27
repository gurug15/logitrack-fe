const DetailItem = ({ label, value, isLeft = true }) => {
  const paddingClass = isLeft ? "pr-2" : "pl-2";
  
  return (
    <div className={`flex flex-col gap-1 border-t border-solid border-t-[#dbdee6] py-4 ${paddingClass}`}>
      <p className="text-[#606e8a] text-sm font-normal leading-normal">
        {label}
      </p>
      <p className="text-[#111318] text-sm font-normal leading-normal">
        {value}
      </p>
    </div>
  );
};

export default DetailItem;