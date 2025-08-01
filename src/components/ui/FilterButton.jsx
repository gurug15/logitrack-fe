export const FilterButton = ({ children, onClick, isActive = false }) => {
  return (
    <button 
      className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full pl-4 pr-2 ${
        isActive ? 'bg-[#1b5ff3] text-white' : 'bg-[#f1f2f4] text-[#121417]'
      }`}
      onClick={onClick}
    >
      <p className="text-sm font-medium leading-normal">{children}</p>
      <div className="text-current">
        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
        </svg>
      </div>
    </button>
  );
};