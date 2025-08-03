import { useState } from "react";
import { Breadcrumb } from "../../components/admin/BreadCrumb";
import { DataTable } from "../../components/tabels/DataTable";
import { FilterButton } from "../../components/ui/FilterButton";
import Pagination from "../../components/ui/Pagination";
import SearchBar from "../../components/ui/SearchBar";
import { Link } from "react-router-dom";

const OrdersDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  // const [activeFilters, setActiveFilters] = useState({
  //   status: false,
  //   date: false,
  //   vendor: false,
  //   customer: false
  // });

  console.log(searchQuery);
  console.log("adas");
  

  // Sample data
  const ordersData = [
    { id: '#12345', customerName: 'Anika Sharma', destinationCity: 'Mumbai', status: 'Pending', createdDate: '2023-08-15', vendor: 'Vendor A' },
    { id: '#12346', customerName: 'Rohan Verma', destinationCity: 'Delhi', status: 'Processing', createdDate: '2023-08-16', vendor: 'Vendor B' },
    { id: '#12347', customerName: 'Priya Kapoor', destinationCity: 'Bangalore', status: 'Shipped', createdDate: '2023-08-17', vendor: 'Vendor C' },
    { id: '#12348', customerName: 'Arjun Singh', destinationCity: 'Chennai', status: 'Delivered', createdDate: '2023-08-18', vendor: 'Vendor A' },
    { id: '#12349', customerName: 'Divya Patel', destinationCity: 'Kolkata', status: 'Pending', createdDate: '2023-08-19', vendor: 'Vendor B' }
  ];

  const breadcrumbItems = [
    { label: 'Admin', link: '/admin' },
    { label: 'Orders' }
  ];

  const tableColumns = [
    { key: 'id', header: 'Order ID', primary: true, width: 'w-[400px]' },
    { key: 'customerName', header: 'Customer Name', width: 'w-[400px]' },
    { key: 'destinationCity', header: 'Destination City', width: 'w-[400px]' },
    { 
      key: 'status', 
      header: 'Status', 
      width: 'w-60',
      render: (status) => (
        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#f0f2f4] text-[#111418] text-sm font-medium leading-normal w-full">
          <span className="truncate">{status}</span>
        </button>
      )
    },
    { key: 'createdDate', header: 'Created Date', width: 'w-[400px]' },
    { key: 'vendor', header: 'Vendor', width: 'w-[400px]' },
    { 
      key: 'actions', 
      header: 'Actions', 
      width: 'w-60',
      render: (_,data) => (
        <span className="text-[#617189] text-sm font-bold leading-normal tracking-[0.015em] cursor-pointer hover:text-[#111418]">
          <Link to={`/admin/orders/${data.id}`}>View</Link>
        </span>
      )
    }
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log('Searching for:', query);
  };

  const handleRowClick = (row) => {
    console.log('Clicked row:', row);
  };

  // const handleFilterClick = (filterType) => {
  //   setActiveFilters(prev => ({
  //     ...prev,
  //     [filterType]: !prev[filterType]
  //   }));
  // };

  return (
    <div>
            {/* Breadcrumb */}
            <Breadcrumb items={breadcrumbItems} />
            
            {/* Page Title */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight min-w-72">All Orders</p>
            </div>
            
            {/* Search Bar */}
            <div className="px-4 py-3">
              <SearchBar 
                placeholder="Search by order ID, customer name, or destination" 
                onSearch={handleSearch}
                btnTxt="search"
              />
            </div>
            
            {/* Filter Buttons */}
            {/* <div className="flex gap-3 p-3 flex-wrap pr-4">
              <FilterButton 
                onClick={() => handleFilterClick('status')} 
                isActive={activeFilters.status}
              >
                Status
              </FilterButton>
              <FilterButton 
                onClick={() => handleFilterClick('date')} 
                isActive={activeFilters.date}
              >
                Date
              </FilterButton>
              <FilterButton 
                onClick={() => handleFilterClick('vendor')} 
                isActive={activeFilters.vendor}
              >
                Vendor
              </FilterButton>
              <FilterButton 
                onClick={() => handleFilterClick('customer')} 
                isActive={activeFilters.customer}
              >
                Customer
              </FilterButton>
            </div> */}
            
            {/* Data Table */}
            <DataTable 
              columns={tableColumns}
              data={ordersData}
              onRowClick={handleRowClick}
            />
            <footer className="flex justify-center">
          <div className="flex max-w-[960px] flex-1 flex-col">
            <Pagination 
              currentPage={currentPage}
              totalPages={10}
              onPageChange={setCurrentPage}
            />
          </div>
        </footer>
          </div>
  );
};

export default OrdersDashboard;