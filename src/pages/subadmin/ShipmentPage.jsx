import React, { useState } from 'react';
import { useGetSubadminShipments } from '../../hooks/subadmin/useGetSubadminShipments';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { ShipmentDetailModal } from '../../components/subadmin/ShipmentDetailModal';
import Pagination from '../../components/ui/Pagination';
import SearchBar from '../../components/ui/SearchBar';
import { DataTable } from '../../components/tabels/DataTable';


const ShipmentsPage = () => {
    const {
        shipments,
        isLoading,
        error,
        refetch, // We need this to refresh the list after an update
        searchQuery,
        currentPage,
        totalPages,
        handleSearchChange,
        handlePageChange,
        totalShipments
    } = useGetSubadminShipments();

    // State to manage the modal
    const [selectedShipment, setSelectedShipment] = useState(null);

    const handleRowClick = (shipment) => {
        setSelectedShipment(shipment);
    };

    const handleModalClose = () => {
        setSelectedShipment(null);
    };

    const handleUpdateSuccess = () => {
        handleModalClose();
        refetch(); // This refreshes the data on the main page!
    };
    console.log(shipments)
    const columns = [
        { key: 'trackingId', header: 'Tracking ID' },
        { key: 'currentCenterName', header: 'Current Center' },
        { key: 'status', header: 'Status', render: (status) => <StatusBadge status={status} /> },
        { key: 'expectedDelivery', header: 'Expected Delivery Date', render: (date) => date ? new Date(date).toLocaleDateString() : 'N/A' },
        {
            key: 'actions',
            header: 'Actions',
            render: (_, row) => (
                <button
                    onClick={() => handleRowClick(row)}
                    className="font-bold text-blue-600 hover:text-blue-800"
                >
                    View / Update
                </button>
            )
        }
    ];

    if (isLoading && !selectedShipment) return <div className="p-10 text-center">Loading shipments...</div>;
    if (error) return <div className="p-10 text-center text-red-500">Error: {error}</div>;

    return (
        <>
            <div className="px-4 sm:px-10 lg:px-20 py-5">
                <div className="max-w-screen-xl mx-auto">
                    <div className="flex flex-wrap justify-between items-center gap-4 p-4">
                        <div>
                            <h1 className="text-[#121417] text-4xl font-bold">Shipments</h1>
                            <p className="text-[#687182] text-sm mt-1">{totalShipments} shipments at your center.</p>
                        </div>
                    </div>

                    <div className="p-4">
                        <SearchBar
                            placeholder="Search by Tracking ID..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>

                    <div className="px-4 py-3">
                        <DataTable
                            columns={columns}
                            data={shipments}
                            onRowClick={handleRowClick} // Use onRowClick to open the modal
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

            {/* Render the modal when a shipment is selected */}
            <ShipmentDetailModal
                isOpen={!!selectedShipment}
                shipment={selectedShipment}
                onClose={handleModalClose}
                onUpdateSuccess={handleUpdateSuccess}
            />
        </>
    );
};

export default ShipmentsPage;