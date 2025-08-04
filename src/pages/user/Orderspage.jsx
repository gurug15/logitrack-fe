import React from 'react';
import Pagination from '../../components/ui/Pagination';
import Button from '../../components/ui/Button';
import SearchBar from '../../components/ui/SearchBar';
import { Link, useNavigate } from 'react-router-dom';
import { useGetOrders } from '../../hooks/orders/useGetOrders';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { DataTable } from '../../components/tabels/DataTable';

// Main Orders Page Component
const OrdersPage = () => {
  const navigate = useNavigate();
  
  // Use the custom hook
  const {
    orders,
    isLoading,
    error,
    searchQuery,
    currentPage,
    totalPages,
    handleSearchChange,
    handlePageChange,
    filteredOrdersCount
  } = useGetOrders();

  const handleNewOrder = () => {
    navigate("/dashboard/orders/createOrder");
  };

  const handleViewOrder = (orderId) => {
    navigate(`/dashboard/orders/${orderId}`);
  };

  // Define table columns
  const columns = [
    {
      key: 'id',
      header: 'Order ID',
      primary: true,
      render: (value) => `#${value}`,
      width: 'w-[120px]'
    },
    {
      key: 'customername',
      header: 'Customer Name',
      width: 'w-[200px]'
    },
    {
      key: 'orderDate',
      header: 'Order Date',
      render: (value) => new Date(value).toLocaleDateString(),
      width: 'w-[140px]'
    },
    {
      key: 'status',
      header: 'Status',
      render: (value) => <StatusBadge status={value} />,
      width: 'w-[120px]'
    },
    {
      key: 'totalprice',
      header: 'Total Amount',
      render: (value) => `₹${value?.toFixed(2) || 'N/A'}`,
      width: 'w-[140px]'
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (_, row) => (
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Prevent row click
            handleViewOrder(row.id);
          }}
          className="text-[#687282] hover:text-[#1b5ff3] transition-colors font-bold tracking-[0.015em]"
        >
          View
        </button>
      ),
      width: 'w-[100px]'
    }
  ];

  // Handle row click (optional - you can remove this if you only want button click)
  const handleRowClick = (row) => {
    handleViewOrder(row.orderId);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-1 justify-center items-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-bold">Error loading orders:</p>
            <p>{error}</p>
          </div>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        
        {/* Breadcrumb */}
        <div className="flex flex-wrap gap-2 p-4">
          <Link to="/dashboard" className="text-[#617189] text-base font-medium leading-normal">Dashboard</Link>
          <span className="text-[#617189] text-base font-medium leading-normal">/</span>
          <span className="text-[#111418] text-base font-medium leading-normal">Orders</span>
        </div>

        {/* Header Section */}
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div>
            <p className="text-[#121417] tracking-light text-[32px] font-bold leading-tight min-w-72">
              Orders
            </p>
            <p className="text-[#687282] text-sm">
              {filteredOrdersCount} orders found
            </p>
          </div>
          <Button variant="secondary" onClick={handleNewOrder}>
            New Order
          </Button>
        </div>

        {/* Search Bar */}
        <div className='px-5'>
          <SearchBar 
            placeholder="Search orders by ID, customer, or status"
            btnTxt="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {/* Orders Table */}
        {orders.length === 0 ? (
          <div className="px-4 py-3">
            <div className="text-center py-8">
              <p className="text-gray-600">
                {searchQuery ? 'No orders found matching your search.' : 'No orders available.'}
              </p>
            </div>
          </div>
        ) : (
          <DataTable 
            columns={columns}
            data={orders}
            onRowClick={handleRowClick}
          />
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

      </div>
    </div>
  );
};

export default OrdersPage;