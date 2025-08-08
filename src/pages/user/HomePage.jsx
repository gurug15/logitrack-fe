import { useNavigate } from "react-router-dom";
import HeroSection from "../../components/ui/homepage/HeroSection";
import ServicesSection from "../../components/ui/homepage/ServiceSection";


const HomePage = () => {
  const navigate = useNavigate();
  const handleSearch = (searchTerm) => {
    console.log('Searching for:', searchTerm);
     navigate(`/track?trackingId=${searchTerm}`);
  };

  return (
    <div className=" px-4 py-5">
      <HeroSection onSearch={handleSearch} />
      <ServicesSection />
    </div>
  );
};

export default HomePage;