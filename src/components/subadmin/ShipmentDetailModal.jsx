import React from 'react';
import { useUpdateShipment } from '../../hooks/shipments/useUpdateShipment';
import { useAuth } from '../../hooks/auth/useAuth';
import toast from 'react-hot-toast';

// Helper component for displaying details
const DetailItem = ({ label, value }) => (
    <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-800">{value || '-'}</p>
    </div>
);

export const ShipmentDetailModal = ({ shipment, isOpen, onClose, onUpdateSuccess }) => {
    const { dispatchShipment,markAsDelivered, isLoading } = useUpdateShipment();
    const { user } = useAuth();
    console.log(shipment);
    
    if (!isOpen || !shipment) return null;

    const handleDispatch = async () => {
        try {
            await dispatchShipment(shipment.id);
            onUpdateSuccess();
        } catch (err) {
            toast.error(`Error: ${err.details}`)
        }
    };

    // Handle backdrop click to close modal
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleDeliver = async () => {
        try {
            await markAsDelivered(shipment.id);
            onUpdateSuccess();
        } catch (err) {
            console.error(err);
        }
    };

    const isShipmentFinalState = ['Delivered', 'Failed Delivery', 'Returning to Sender'].includes(shipment.status);

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Shipment Details</h2>
                        <p className="text-sm text-gray-500 font-mono">{shipment.trackingId}</p>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="text-3xl font-light text-gray-400 hover:text-gray-800 transition-colors"
                    >
                        &times;
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto">
                    {/* Shipment Info Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                        <DetailItem label="Source Center" value={shipment.sourceCenterName} />
                        <DetailItem label="Current Center" value={shipment.currentCenterName} />
                        <DetailItem label="Destination Center" value={shipment.destCenterName} />
                        <DetailItem label="Next Center"  value={shipment.nextCenterName} />
                        {/* <DetailItem label="Expected Delivery" value={new Date(shipment.expectedDelivery).toLocaleDateString()} /> */}
                        <DetailItem label="Expected Delivery" value={
                        shipment.expectedDelivery ? new Date(shipment.expectedDelivery).toLocaleDateString() : '-'
                        } />
                        <DetailItem label="Weight" value={`${shipment.weight} kg`} />
                        <DetailItem label="Dimensions" value={shipment.dimensions} />
                    </div>

                    {/* Tracking History Timeline */}
                    <h3 className="text-md font-bold text-gray-800 mb-4">Tracking History</h3>
                    <div className="relative pl-6 border-l-2 border-gray-200">
                        {shipment.trackingHistory?.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map((entry) => (
                            <div key={entry.id} className="mb-6">
                                <div className="absolute -left-[11px] top-1 w-5 h-5 bg-blue-500 rounded-full border-4 border-white"></div>
                                <p className="font-bold text-sm text-gray-800">{entry.status}</p>
                                <p className="text-xs text-gray-600">{entry.notes}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                    {new Date(entry.timestamp).toLocaleString()} - {entry.centerName}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer / Action Area for Sub-Admin */}
                {user?.role === 'sub_admin' && (
                    <div className="p-4 bg-gray-50 border-t rounded-b-xl mt-auto text-center">
                         {shipment.status === 'Out for Delivery' ? (
                            <button
                                onClick={handleDeliver}
                                disabled={isLoading}
                                className="w-full sm:w-auto px-6 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 disabled:bg-green-300"
                            >
                                {isLoading ? 'Saving...' : 'Mark as Delivered'}
                            </button>
                        ) : (
                            // Otherwise, show the normal Dispatch button
                            <button
                                onClick={handleDispatch}
                                disabled={isLoading || isShipmentFinalState}
                                className="w-full sm:w-auto px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Processing...' : 'Dispatch to Next Center'}
                            </button>
                        )}
                        {isShipmentFinalState && <p className="text-xs text-gray-500 mt-2">This shipment cannot be updated further.</p>}
                    </div>
                )}
            </div>
        </div>
    );
};