import ProgressStep from './ProgressStep';
import { PackageIcon, TruckIcon } from './Icons';

const CheckCircleIcon = ({ size = "24px" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256">
    <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
  </svg>
);

const ProgressTracker = ({ progressData }) => {
    // We expect the real data to be passed in as 'progressData'
    const steps = progressData || [];

    // --- THIS NEW FUNCTION CHOOSES THE ICON ---
    const getIconForStatus = (status) => {
        const lowerCaseStatus = status.toLowerCase();
        
        if (lowerCaseStatus.includes('delivered')) {
            return <CheckCircleIcon />;
        }
        if (lowerCaseStatus.includes('out for delivery')) {
            return <TruckIcon />;
        }
        // Default case for "Pending", "In Transit", "Arrived at Hub", etc.
        return <PackageIcon />;
    };

    return (
        <div>
            <h2 className="text-[#111318] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                Package Progress
            </h2>
            <div className="grid grid-cols-[40px_1fr] gap-x-2 px-4">
                {steps.map((step, index) => (
                    <ProgressStep
                        key={step.id || index}
                        // The icon is now chosen dynamically based on the step's status
                        icon={getIconForStatus(step.status)}
                        title={step.status} // The title is the status itself
                        description={`${step.notes} - ${new Date(step.timestamp).toLocaleString()}`} // A more detailed description
                        isCompleted={true} // All history items are completed events
                        isLast={index === steps.length - 1}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProgressTracker;