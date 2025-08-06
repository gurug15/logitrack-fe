import { Outlet } from 'react-router-dom';
import SubAdminHeader from './SubAdminHeader';
import Footer from '../ui/Footer';

const SubAdminLayout = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden font-sans">
      <div className="layout-container flex h-full grow flex-col">
        <SubAdminHeader />
        
        <main className=" flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <Outlet />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default SubAdminLayout;