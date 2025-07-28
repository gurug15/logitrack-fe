import React, { useState } from 'react';
import Pagination from '../components/ui/Pagination';
import Button from '../components/ui/Button';
import SearchBar from '../components/ui/SearchBar';
import { Link, useNavigate } from 'react-router-dom';




// Enhanced StatusBadge component with more status types
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
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Sample orders data
  const orders = [
    { id: "#12345", customer: "Arjun Verma", orderDate: "2024-07-20", status: "Delivered", deliveryDate: "2024-07-22" },
    { id: "#12346", customer: "Priya Sharma", orderDate: "2024-07-19", status: "In Transit", deliveryDate: "2024-07-21" },
    { id: "#12347", customer: "Rohan Kapoor", orderDate: "2024-07-18", status: "Failed", deliveryDate: "2024-07-20" },
    { id: "#12348", customer: "Sneha Reddy", orderDate: "2024-07-17", status: "Delivered", deliveryDate: "2024-07-19" },
    { id: "#12349", customer: "Vikram Singh", orderDate: "2024-07-16", status: "In Transit", deliveryDate: "2024-07-18" },
    { id: "#12350", customer: "Anjali Patel", orderDate: "2024-07-15", status: "Delivered", deliveryDate: "2024-07-17" },
    { id: "#12351", customer: "Karan Mehta", orderDate: "2024-07-14", status: "Failed", deliveryDate: "2024-07-16" },
    { id: "#12352", customer: "Divya Iyer", orderDate: "2024-07-13", status: "Delivered", deliveryDate: "2024-07-15" },
    { id: "#12353", customer: "Siddharth Rao", orderDate: "2024-07-12", status: "In Transit", deliveryDate: "2024-07-14" },
    { id: "#12354", customer: "Meera Nair", orderDate: "2024-07-11", status: "Delivered", deliveryDate: "2024-07-13" },
  ];

  // Filter orders based on search query
  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleNewOrder = () => {
    // console.log('Create new order');
    navigate("/dashboard/orders/createOrder")
  };

  const handleViewOrder = (orderId) => {
    console.log('View order:', orderId);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        
        <div className="flex flex-wrap gap-2 p-4">
          <Link to="/dashboard" className="text-[#617189] text-base font-medium leading-normal">Dashboard</Link>
          {/* <span className="text-[#617189] text-base font-medium leading-normal">/</span> */}
          {/* <Link to="/orders" className="text-[#617189] text-base font-medium leading-normal">Orders</Link> */}
          <span className="text-[#617189] text-base font-medium leading-normal">/</span>
          <span className="text-[#111418] text-base font-medium leading-normal">Orders</span>
        </div>

        {/* Header Section */}
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-[#121417] tracking-light text-[32px] font-bold leading-tight min-w-72">
            Orders
          </p>
          <Button variant="secondary" onClick={handleNewOrder}>
            New Order
          </Button>
        </div>

        {/* Search Bar */}
       <div className='px-5'>
         <SearchBar 
          placeholder="Search orders"
          btnTxt = "Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
       </div>

        {/* Orders Table */}
        <div className="px-4 py-3">
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
                      Delivery Date
                    </th>
                    <th className="px-4 py-3 text-left text-[#687282] text-sm font-medium leading-normal">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => (
                    <tr key={index} className="border-t border-t-[#dde0e4]">
                      <td className="h-[72px] px-4 py-2 text-[#121417] text-sm font-normal leading-normal">
                        {order.id}
                      </td>
                      <td className="h-[72px] px-4 py-2 text-[#687282] text-sm font-normal leading-normal">
                        {order.customer}
                      </td>
                      <td className="h-[72px] px-4 py-2 text-[#687282] text-sm font-normal leading-normal">
                        {order.orderDate}
                      </td>
                      <td className="h-[72px] px-4 py-2 text-sm font-normal leading-normal">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="h-[72px] px-4 py-2 text-[#687282] text-sm font-normal leading-normal">
                        {order.deliveryDate}
                      </td>
                      <td className="h-[72px] px-4 py-2 text-[#687282] text-sm font-bold leading-normal tracking-[0.015em]">
                        <button 
                          onClick={() => handleViewOrder(order.id)}
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
        </div>

        {/* Pagination */}
        <Pagination 
          currentPage={currentPage}
          totalPages={10}
          onPageChange={handlePageChange}
        />

      </div>
    </div>
  );
};

export default OrdersPage;