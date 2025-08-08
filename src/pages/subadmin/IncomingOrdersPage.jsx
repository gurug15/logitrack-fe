import React from 'react';
import { useGetIncomingOrders } from '../../hooks/subadmin/useGetIncommingOrders';
import Pagination from '../../components/ui/Pagination';
import SearchBar from '../../components/ui/SearchBar';
import { DataTable } from '../../components/tabels/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { useCreateShipment } from '../../hooks/shipments/useCreateShipments';
import toast from 'react-hot-toast';

const IncomingOrdersPage = () => {
    const {
        orders,
        isLoading: isFetchingOrders, // Renamed to avoid naming conflicts
        error: fetchError,
        refetch, // We use this to refresh the list after creating a shipment
        searchQuery,
        currentPage,
        totalPages,
        handleSearchChange,
        handlePageChange,
        totalOrders,
    } = useGetIncomingOrders();

    // Use the new hook for the create action
    const { createShipment, isLoading: isCreatingShipment } = useCreateShipment();

    // This handler now calls the API
    const handleCreateShipment = async (orderId) => {
        try {
            const newShipment = await createShipment(orderId);
            // On success, show a confirmation and refresh the list of orders
            toast.success(`successful New Tracking ID: ${newShipment.trackingId}`);
            refetch();
        } catch (err) {
                // 1. Start with a safe, generic error message.
            let errorMessage = "An unexpected error occurred. Please try again.";

            // 2. Check if your backend sent a specific, clean error message.
            // This is the message from your ErrorMessage DTO (e.g., "Shipment is already processed.").
            if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            }

            // 3. Show the cleanest possible error to the user.
            toast.error(errorMessage);
            
            // Also, log the full error for yourself to debug
            console.error("API Error:", err);
                }
    };

    const columns = [
        { key: 'id', header: 'Order ID', render: (id) => `#${id}` },
        { key: 'customername', header: 'Customer Name' },
        { 
        key: 'orderDate', 
        header: 'Order Date', 
        render: (date) => {
            const d = new Date(date);
            // Check if the date is valid before trying to format it
            return d instanceof Date && !isNaN(d) ? d.toLocaleDateString() : 'Invalid Date';
        } 
    },
        { key: 'city', header: 'Destination City' },
        { key: 'status', header: 'Status', render: (status) => <StatusBadge status={status} /> },
        {
            key: 'actions',
            header: 'Actions',
            render: (_, row) => (
                <button
                    onClick={() => handleCreateShipment(row.id)}
                    disabled={isCreatingShipment || row.status.toLowerCase() !== 'pending'}
                    className="font-bold text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:text-gray-400"
                >
                    {isCreatingShipment ? 'Creating...' : 'Create Shipment'}
                </button>
            )
        }
    ];

    if (isFetchingOrders) return <div className="p-10 text-center">Loading incoming orders...</div>;
    if (fetchError) return <div className="p-10 text-center text-red-500">Error: {fetchError}</div>;

    return (
        <div className="px-4 sm:px-10 lg:px-10 py-5">
            <div className="max-w-screen-xl mx-auto">
                <div className="flex flex-wrap justify-between items-center gap-4 p-4">
                    <div>
                        <h1 className="text-[#121417] text-4xl font-bold">Incoming Orders</h1>
                        <p className="text-[#687182] text-sm mt-1">
                            {totalOrders} orders waiting to be processed into shipments.
                        </p>
                    </div>
                </div>

                <div className="p-4">
                    <SearchBar
                        placeholder="Search by Order ID or Customer..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>

                <div className=" py-3">
                    <DataTable
                        columns={columns}
                        data={orders}
                        onRowClick={(row) => console.log('View order details for', row.id)}
                    />
                </div>

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

export default IncomingOrdersPage;