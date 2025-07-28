import { Navigate, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";




const ErrorPage404 = () => {
    const navigate = useNavigate();
  const handleGoHome = () => {
    navigate('/') 
 
    console.log('Navigate to homepage');
  };

  const errorImageUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuAP-CELC9qGa3zPeyv3R09qxqPuP77x2LcYEkimrwer1EiQJFHqhKvzLFIdCRTNGFiEbEXYrAVZYNpdlMVuLhYFRqyLDFKirgauabogANbXvAliHI66Mqf2AwzTfJakC5aGoIKWXaEoswHRoOQu6Zt-aZTl7SyLS-A-RDLjxZKgOqMQmZvR3ZrBeMEXTN7ynI1obh8LmyYRzpLPDDlZOq6RzwDQXlpx9FrU9YANx1MRlnfmCgwDkx-zerc-J4ZNyz5oPQRi1R1a89s";

  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-col px-4 py-6">
          <div className="flex flex-col items-center gap-6">
            
            {/* Error Illustration */}
            <div
              className="bg-center bg-no-repeat aspect-video bg-cover rounded-xl w-full max-w-[360px]"
              style={{ backgroundImage: `url("${errorImageUrl}")` }}
            />
            
            {/* Error Message */}
            <div className="flex max-w-[480px] flex-col items-center gap-2">
              <p className="text-[#111417] text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">
                Oops! The page you were looking for doesn't exist.
              </p>
              <p className="text-[#111417] text-sm font-normal leading-normal max-w-[480px] text-center">
                It seems like you've taken a wrong turn. Don't worry, it happens to the best of us. Let's get you back on track.
              </p>
            </div>
            
            {/* Action Button */}
            <Button variant="secondary" onClick={handleGoHome}>
              Go to Homepage
            </Button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage404;