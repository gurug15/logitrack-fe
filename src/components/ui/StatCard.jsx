const StatCard = ({ title, value }) => (
  <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-[#f0f1f5]">
    <p className="text-[#111318] text-base font-medium leading-normal">{title}</p>
    <p className="text-[#111318] tracking-light text-2xl font-bold leading-tight">{value}</p>
  </div>
);


export default StatCard;