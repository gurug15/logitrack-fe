import { useState } from "react";
import { Breadcrumb } from "../../components/admin/BreadCrumb";
import { CenterTable } from "../../components/admin/centermanagement/CenterTable";
import { PageHeader } from "../../components/ui/PageHeader";
import SearchBar from "../../components/ui/SearchBar";
import { useNavigate } from "react-router-dom";

const CenterManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();


  console.log(searchQuery)
  // Sample data - replace with actual data fetching
  const centers = [
    { 
      name: 'Delhi Logistics Hub', 
      city: 'Delhi', 
      state: 'Delhi', 
      address: '123 Main Street, Delhi',
      phone: '+91-11-4567890',
      subadmins: '2'
    },
    { 
      name: 'Mumbai Distribution Center', 
      city: 'Mumbai', 
      state: 'Maharashtra', 
      address: '456 Linking Road, Mumbai',
      phone: '+91-22-7890123',
      subadmins: '1'
    },
    // ... more centers
  ];

  const breadcrumbItems = [
    { label: 'Admin', link: '/admin' },
    { label: 'Centers' }
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Implement search logic
  };

  const handleCenterClick = (center) => {
    console.log('Center clicked:', center);
    // Handle center click/edit
  };

  const handleAddCenter = () => {
        navigate("/admin/centers/create");
  };

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      
      <PageHeader 
        title="Centers" 
        buttonText="Add Center"
        onButtonClick={handleAddCenter}
      />
      
      <div className="px-4 py-3">
        <SearchBar 
          placeholder="Search centers..." 
          onSearch={handleSearch}
          btnTxt="Search"
        />
      </div>

      <CenterTable
        centers={centers}
        onCenterClick={handleCenterClick}
      />
    </>
  );
};

export default CenterManagement;