import { Outlet } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import { useState } from 'react';

const privacyText = `We value your privacy. Your data is handled securely and never shared with third parties except as required by law.`;
const termsText = `By using this platform, you agree to abide by all applicable laws and our terms of service. Misuse may result in account suspension.`;
const contactText = `For any queries or support, contact Admin: Adityaunde03@gmail.com`;

const DashboardLayout = () => {
    const [hovered, setHovered] = useState(null);
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden font-sans">
      <div className="layout-container flex h-full grow flex-col">
        <DashboardHeader />
        
        <main className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <Outlet />
          </div>
        </main>
        <footer className="w-full flex justify-center items-center py-4 bg-gray-50 border-t border-gray-200 relative z-10">
          <div className="flex gap-8 text-sm text-gray-700 relative">
            <div className="relative flex flex-col items-center">
              <span
                className="cursor-pointer hover:text-blue-600 transition"
                onMouseEnter={() => setHovered('privacy')}
                onMouseLeave={() => setHovered(null)}
              >
                Privacy Policy
              </span>
              {hovered === 'privacy' && (
                <div className="absolute bottom-7 left-1/2 -translate-x-1/2 w-64 p-3 bg-white border border-gray-300 rounded shadow text-xs text-gray-800 z-20">
                  {privacyText}
                </div>
              )}
            </div>
            <div className="relative flex flex-col items-center">
              <span
                className="cursor-pointer hover:text-blue-600 transition"
                onMouseEnter={() => setHovered('terms')}
                onMouseLeave={() => setHovered(null)}
              >
                Terms & Conditions
              </span>
              {hovered === 'terms' && (
                <div className="absolute bottom-7 left-1/2 -translate-x-1/2 w-64 p-3 bg-white border border-gray-300 rounded shadow text-xs text-gray-800 z-20">
                  {termsText}
                </div>
              )}
            </div>
            <div className="relative flex flex-col items-center">
              <span
                className="cursor-pointer hover:text-blue-600 transition"
                onMouseEnter={() => setHovered('contact')}
                onMouseLeave={() => setHovered(null)}
              >
                Contact Us
              </span>
              {hovered === 'contact' && (
                <div className="absolute bottom-7 left-1/2 -translate-x-1/2 w-64 p-3 bg-white border border-gray-300 rounded shadow text-xs text-gray-800 z-20">
                  {contactText}
                </div>
              )}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;