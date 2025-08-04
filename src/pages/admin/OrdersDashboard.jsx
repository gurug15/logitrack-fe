import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumb } from "../../components/admin/BreadCrumb";
import { DataTable } from "../../components/tabels/DataTable";
import Pagination from "../../components/ui/Pagination";
import SearchBar from "../../components/ui/SearchBar";
import { useGetAdminOrders } from '../../hooks/admin/useGetAdminOrders';
import Button from '../../components/ui/Button';
const OrdersDashboard = () => {
    const navigate = useNavigate();

    const {
        orders,
        isLoading,
        error,
        currentPage,
        totalPages,
        handleSearch,
        handlePageChange,
        filteredOrdersCount
    } = useGetAdminOrders();

    const breadcrumbItems = [
        { label: 'Admin', link: '/admin' },
        { label: 'Orders' }
    ];

    // **UPDATED**: Column keys now match the OrderViewDto fields
    const tableColumns = [
        { key: 'id', header: 'Order ID', primary: true, width: 'w-[400px]' },
        { key: 'customername', header: 'Customer Name', width: 'w-[400px]' },
        { key: 'city', header: 'Destination City', width: 'w-[400px]' },
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
        { key: 'orderdate', header: 'Created Date', width: 'w-[400px]' },
        { key: 'vendor', header: 'Vendor', width: 'w-[400px]' },
        { 
            key: 'actions', 
            header: 'Actions', 
            width: 'w-60',
            render: (_, row) => (
                <Link to={`/admin/orders/${row.id}`} className="text-[#617189] text-sm font-bold leading-normal tracking-[0.015em] cursor-pointer hover:text-[#111418]">
                    View
                </Link>
            )
        }
    ];

    const handleRowClick = (row) => {
        navigate(`/admin/orders/${row.id}`);
    };

    // Loading and Error states remain the same...
    if (isLoading) {
        return (
            <div className="flex flex-1 justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="p-4">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p className="font-bold">Error:</p>
                    <p>{error}</p>
                </div>
                <Button onClick={() => window.location.reload()} className="mt-4">
                    Try Again
                </Button>
            </div>
        );
    }

    return (
        <div>
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex flex-wrap justify-between gap-3 p-4">
                <div>
                    <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight">All Orders</p>
                    <p className="text-[#687282] text-sm">{filteredOrdersCount} orders found</p>
                </div>
            </div>
            <div className="px-4 py-3">
                <SearchBar 
                    placeholder="Search by order ID, customer name, or destination" 
                    onSearch={handleSearch}
                    btnTxt="Search"
                />
            </div>
            {orders.length === 0 ? (
                <div className="text-center py-10 text-gray-500">No orders found.</div>
            ) : (
                <DataTable 
                    columns={tableColumns}
                    data={orders}
                    onRowClick={handleRowClick}
                />
            )}
            {totalPages > 1 && (
                <footer className="flex justify-center p-4">
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </footer>
            )}
        </div>
    );
};

export default OrdersDashboard;