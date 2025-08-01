import React from 'react';
import Pagination from '../components/ui/Pagination';
import Button from '../components/ui/Button';
import SearchBar from '../components/ui/SearchBar';
import { Link, useNavigate } from 'react-router-dom';
import { useGetOrders } from '../hooks/orders/useGetOrders';


// StatusBadge component (keep your existing one)
const StatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in transit':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-[#f1f2f4] text-[#121417]';
    }
  };

  return (
    <button className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 text-sm font-medium leading-normal w-full ${getStatusColor(status)}`}>
      <span className="truncate">{status}</span>
    </button>
  );
};

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
        <div className="px-4 py-3">
          {orders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">
                {searchQuery ? 'No orders found matching your search.' : 'No orders available.'}
              </p>
            </div>
          ) : (
            <div className="flex overflow-hidden rounded-xl border border-[#dde0e4] bg-white">
              <div className="w-full overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-white">
                      <th className="px-4 py-3 text-left text-[#121417] text-sm font-medium leading-normal">
                        Order ID
                      </th>
                      <th className="px-4 py-3 text-left text-[#121417] text-sm font-medium leading-normal">
                        Customer Name
                      </th>
                      <th className="px-4 py-3 text-left text-[#121417] text-sm font-medium leading-normal">
                        Order Date
                      </th>
                      <th className="px-4 py-3 text-left text-[#121417] text-sm font-medium leading-normal">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-[#121417] text-sm font-medium leading-normal">
                        Total Amount
                      </th>
                      <th className="px-4 py-3 text-left text-[#687282] text-sm font-medium leading-normal">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={order.orderId || index} className="border-t border-t-[#dde0e4]">
                        <td className="h-[72px] px-4 py-2 text-[#121417] text-sm font-normal leading-normal">
                          #{order.id}
                        </td>
                        <td className="h-[72px] px-4 py-2 text-[#687282] text-sm font-normal leading-normal">
                          {order.customername}
                        </td>
                        <td className="h-[72px] px-4 py-2 text-[#687282] text-sm font-normal leading-normal">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </td>
                        <td className="h-[72px] px-4 py-2 text-sm font-normal leading-normal">
                          <StatusBadge status={order.status} />
                        </td> 
                        <td className="h-[72px] px-4 py-2 text-[#687282] text-sm font-normal leading-normal">
                          ₹{order.totalprice?.toFixed(2) || 'N/A'}
                        </td>
                        <td className="h-[72px] px-4 py-2 text-[#687282] text-sm font-bold leading-normal tracking-[0.015em]">
                          <button 
                            onClick={() => handleViewOrder(order.orderId)}
                            className="hover:text-[#1b5ff3] transition-colors"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

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
