import { useState } from "react";
import { Breadcrumb } from "../../components/admin/BreadCrumb";
import { PageHeader } from "../../components/ui/PageHeader";
import SearchBar from "../../components/ui/SearchBar";
import { UserFilters } from "../../components/admin/usermanagement/UserFilter";
import { UserTable } from "../../components/admin/usermanagement/UserTable";

const UserManagement = () => {
  const [activeFilters, setActiveFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  console.log(searchQuery);
  
  // Sample data - replace with actual data fetching
  const users = [
    { name: 'Ethan Sharma', email: 'ethan.sharma@example.com', role: 'Admin', center: 'N/A' },
    { name: 'Priya Verma', email: 'priya.verma@example.com', role: 'Subadmin', center: 'Delhi Center' },
    { name: 'Arjun Kapoor', email: 'arjun.kapoor@example.com', role: 'User', center: 'Mumbai Center' },
    // ... more users
  ];

  const breadcrumbItems = [
    { label: 'Admin', link: '#' },
    { label: 'Users' }
  ];

  const handleFilterChange = (filterKey) => {
    setActiveFilters(prev => 
      prev.includes(filterKey) 
        ? prev.filter(f => f !== filterKey)
        : [...prev, filterKey]
    );
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Implement search logic
  };

  const handleUserClick = (user) => {
    console.log('User clicked:', user);
    // Handle user click/edit
  };

  const handleAddUser = () => {
    console.log('Add user clicked');
    // Handle add user
  };

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      
      <PageHeader 
        title="User Management" 
        buttonText="Add User"
        onButtonClick={handleAddUser}
      />
      
      <div className="px-4 py-3">
        <SearchBar 
          placeholder="Search by name or email" 
          onSearch={handleSearch}
          btnTxt="Search"
        />
      </div>

      <UserFilters 
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
      />

      <UserTable 
        users={users}
        onUserClick={handleUserClick}
      />
    </>
  );
};

export default UserManagement;
