  import { Breadcrumb } from "../../components/admin/BreadCrumb";
  import { UserTable } from "../../components/admin/usermanagement/UserTable";
  import { PageHeader } from "../../components/ui/PageHeader";
  import SearchBar from "../../components/ui/SearchBar";
  import { useGetUsers } from "../../hooks/admin/useGetUser";


  const UserManagement = () => {
    const {
      users,
      isLoading,
      error,
      searchQuery,
      setSearchQuery,
      handleSearchChange,
      currentPage,
      totalPages,
      handlePageChange,
    } = useGetUsers();

    const breadcrumbItems = [
      { label: 'Admin', link: '#' },
      { label: 'Users' }
    ];

    const handleUserClick = (user) => {
      // Open user edit modal or detail page
      console.log('User clicked:', user);
    };

    const handleAddUser = () => {
      // Open a modal or navigate to add-user page
      console.log('Add user clicked');
    };

    // If SearchBar uses only string input (not event), otherwise pass handleSearchChange only
    const onSearch = (q) => {
      setSearchQuery(q);
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
            placeholder="Search users by name, email, role, or status"
            value={searchQuery}
            onSearch={onSearch}
            onChange={handleSearchChange}
            btnTxt="Search"
          />
        </div>
        {/* 
        <UserFilters 
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
        /> 
        */}

        {isLoading && <div className="text-gray-700 px-4">Loading...</div>}
        {error && <div className="text-red-500 px-4">{error}</div>}

        <UserTable
          users={users}
          onUserClick={handleUserClick}
        />

        {/* Pagination controls if more than one page */}
        {totalPages > 1 && (
          <div className="flex justify-center my-4 gap-2">
            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx + 1}
                className={`px-3 py-1 rounded ${currentPage === (idx + 1) ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                onClick={() => handlePageChange(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        )}
      </>
    );
  };

  export default UserManagement;
