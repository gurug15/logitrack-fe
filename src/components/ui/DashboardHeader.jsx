import Logo from './Logo';

const DashboardHeader = () => {
  const navItems = [
    { label: "Dashboard", href: "#" },
    { label: "Shipments", href: "#" },
    { label: "Orders", href: "#" },
    { label: "Customers", href: "#" },
    { label: "Reports", href: "#" }
  ];

  const profileImageUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuANCij5D4Hgixdp2wGya2wPTbM6WTnA4SG9kaMelqanJz4T5phOmYLAU1B4szrRVJ09dMnoVRTvwQSXHN4y4Mv61P2RRR4-7dX7FuStriAPaVG7PCQByL30jdCd136JRA_JW573W6JUkVJ85SFDm8Un5_Vxcq3rf09hg5ZqnjrC5upkQcVs8dLVa3XbYdqHtvqzKpkKhgTixMi9bJqkbpxRa8PVGnQ7e8cjBq1TvC63p_kICmxvUVaeNSgFfMaCfNwTRqnA9f4ttWY";

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f1f5] px-10 py-3">
      <div className="flex items-center gap-4 text-[#111318]">
        <Logo />
        <h2 className="text-[#111318] text-lg font-bold leading-tight tracking-[-0.015em]">
          LogiTRACK
        </h2>
      </div>
      
      <div className="flex flex-1 justify-end gap-8">
        <nav className="flex items-center gap-9">
          {navItems.map((item, index) => (
            <a 
              key={index}
              className="text-[#111318] text-sm font-medium leading-normal" 
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
        
        <div className="flex items-center gap-2">
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#f0f1f5] text-[#111318] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z" />
            </svg>
          </button>
          
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            style={{ backgroundImage: `url("${profileImageUrl}")` }}
          />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;