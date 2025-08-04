import HeroSection from "../../components/ui/homepage/HeroSection";
import ServicesSection from "../../components/ui/homepage/ServiceSection";


const HomePage = () => {
  const handleSearch = (searchTerm) => {
    console.log('Searching for:', searchTerm);
    // Implement search logic here
  };

  return (
    <div className=" px-4 py-5">
      <HeroSection onSearch={handleSearch} />
      <ServicesSection />
    </div>
  );
};

export default HomePage;