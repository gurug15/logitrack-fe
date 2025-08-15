import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import ProfileModal from '../ui/ProfileModal';
import Logo from '../ui/Logo';
import { useAuth } from '../../hooks/auth/useAuth';
// import { useAuth } from '../../context/AuthContext';

const SubAdminHeader = () => {
    // Sub-admin specific navigation items
    const navItems = [
        { label: "Incoming Orders", href: "/subadmin" },
        { label: "Shipments", href: "/subadmin/shipments" },
    ];
    const { user } = useAuth();
    // const { user } = useAuth();
    const [modalOpen, setModalOpen] = useState(false);
    
    // const profileImageUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuDun_pZ19KJ36Nawxh5ITvx63NutwDi5q8Uj-sYfPizADy5VzbqSWkNCCkn9kgtIWB9AiS4tTk7JPn_fchSrxu2_yMnPoAzypRlzKqjfNcDJilKx9WHWw1IN7D2ipC6MvziY9URgEIOxmpZiMzpNPHsuRgR9BBT-7qTdLMEIz9FUldcvpUXmcrNBldU04NJNSTPbGytU2s4SYk-dPc5FOvKwJuyK0ZBbdQjG1taSYbdQH9yPqwgbk4HQR2dolaMT8uDN793osvVQvQ";

    const activeLinkStyle = {
        color: '#1b5ff3', // Your brand's primary color for active links
        fontWeight: 'bold',
    };

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
                        <NavLink 
                            key={index}
                            to={item.href}
                            end={item.href === "/subadmin"}
                            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                            className="text-[#111318] text-sm font-medium leading-normal hover:text-blue-600"
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
                
                <div className="flex items-center gap-2">
                    <button
                        className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#f0f1f5] text-[#111318] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
                        aria-label="Notifications"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                            <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z" />
                        </svg>
                    </button>
                    <div
            className="
              size-10 
              rounded-full 
              bg-center 
              bg-no-repeat 
              bg-cover 
              flex 
              items-center 
              justify-center 
              font-semibold 
              text-white 
              bg-gradient-to-br from-indigo-500 to-purple-500
              shadow-md
              cursor-pointer
              hover:scale-105 
              hover:shadow-lg 
              active:scale-95
              transition-all 
              duration-200 
              ease-in-out
            "
            onClick={() => setModalOpen(true)}
            title="Profile"
          >
                {user.name.charAt(0).toUpperCase()}
        </div>
                    {modalOpen && (
                        <ProfileModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
                    )}
                </div>
            </div>
        </header>
    );
};

export default SubAdminHeader;