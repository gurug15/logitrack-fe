import React from 'react';
import { useGetSubadminShipments } from '../../hooks/shipments/useGetSubadminShipments'; // Adjust path
import { DataTable } from '../../components/tabels/DataTable'; // Reusable component
import { SearchBar } from '../../components/ui/SearchBar'; // Reusable component
import { Pagination } from '../../components/ui/Pagination'; // Reusable component
import { StatusBadge } from '../../components/ui/StatusBadge'; // Reusable component

const ShipmentsPage = () => {
    // const navigate = useNavigate();
    const {
        shipments,
        isLoading,
        error,
        searchQuery,
        currentPage,
        totalPages,
        handleSearchChange,
        handlePageChange,
        totalShipments
    } = useGetSubadminShipments();

    const handleUpdateClick = (shipmentId) => {
        console.log(`Update shipment ${shipmentId}`);
        // Example: navigate(`/subadmin/shipments/${shipmentId}/update`);
    };

    const columns = [
        { key: 'trackingId', header: 'Tracking ID' },
        { key: 'currentCenterName', header: 'Current Center' },
        {
            key: 'status',
            header: 'Status',
            render: (status) => <StatusBadge status={status} />
        },
        {
            key: 'expectedDelivery',
            header: 'Expected Delivery Date',
            render: (date) => new Date(date).toLocaleDateString()
        },
        {
            key: 'actions',
            header: 'Actions',
            render: (_, row) => (
                <button
                    onClick={() => handleUpdateClick(row.id)}
                    className="font-bold text-[#687182] hover:text-blue-600"
                >
                    Update
                </button>
            )
        }
    ];

    if (isLoading) return <div className="p-10 text-center">Loading shipments...</div>;
    if (error) return <div className="p-10 text-center text-red-500">Error: {error}</div>;

    return (
        <div className="px-4 sm:px-10 lg:px-20 py-5">
            <div className="max-w-screen-xl mx-auto">
                {/* Header */}
                <div className="flex flex-wrap justify-between items-center gap-4 p-4">
                    <div>
                        <h1 className="text-[#121417] text-4xl font-bold">Shipments</h1>
                        <p className="text-[#687182] text-sm mt-1">{totalShipments} shipments at your center.</p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="p-4">
                    <SearchBar
                        placeholder="Search by Tracking ID..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>

                {/* Data Table */}
                <div className="px-4 py-3">
                    <DataTable
                        columns={columns}
                        data={shipments}
                        onRowClick={(row) => handleUpdateClick(row.id)}
                    />
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

export default ShipmentsPage;