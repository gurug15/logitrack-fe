import { Link } from "react-router-dom";

export const AdminHeader = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f1f2f4] px-10 py-3">
      <div className="flex items-center gap-4 text-[#121417]">
        <div className="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_6_330)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="clip0_6_330"><rect width="48" height="48" fill="white" /></clipPath>
            </defs>
          </svg>
        </div>
        <h2 className="text-[#121417] text-lg font-bold leading-tight tracking-[-0.015em]">LogiTRACK</h2>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <Link className="text-[#121417] text-sm font-medium leading-normal" to="/admin/orders">Orders</Link>
          <Link className="text-[#121417] text-sm font-medium leading-normal" to="/admin">Users</Link>
          <Link className="text-[#121417] text-sm font-medium leading-normal" to="/admin/centers">Centers</Link>
        </div>
        <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 bg-[#f1f2f4] text-[#121417] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
          <div className="text-[#121417]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z" />
            </svg>
          </div>
        </button>
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
          style={{
            backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDun_pZ19KJ36Nawxh5ITvx63NutwDi5q8Uj-sYfPizADy5VzbqSWkNCCkn9kgtIWB9AiS4tTk7JPn_fchSrxu2_yMnPoAzypRlzKqjfNcDJilKx9WHWw1IN7D2ipC6MvziY9URgEIOxmpZiMzpNPHsuRgR9BBT-7qTdLMEIz9FUldcvpUXmcrNBldU04NJNSTPbGytU2s4SYk-dPc5FOvKwJuyK0ZBbdQjG1taSYbdQH9yPqwgbk4HQR2dolaMT8uDN793osvVQvQ")'
          }}
        />
      </div>
    </header>
  );
};
