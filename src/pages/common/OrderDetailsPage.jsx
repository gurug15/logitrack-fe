import { useParams } from "react-router-dom";  // to get orderId from URL
import { DataTable } from "../../components/tabels/DataTable";
import { useOrderDetails } from '../../hooks/user/useUserDashboardData';

// ProgressTracker component for delivery stages
const ProgressTracker = ({ currentStatus }) => {
  const steps = [
    "Ordered",
    "Dispatched",
    "In Transit",
    "Out for Delivery",
    "Delivered"
  ];
  // Map status to step index
  const statusMap = {
    ordered: 0,
    dispatched: 1,
    "in transit": 2,
    shipped: 2,
    "out for delivery": 3,
    delivered: 4
  };
  const activeStep = statusMap[(currentStatus || '').toLowerCase()] ?? 0;
  return (
    <div className="flex items-center justify-between w-full max-w-2xl mx-auto py-8">
      {steps.map((step, idx) => (
        <div key={step} className="flex items-center w-full">
          <div className={`flex flex-col items-center ${idx < activeStep ? 'text-[#2563eb]' : idx === activeStep ? 'text-[#1d4ed8]' : 'text-gray-300'}`}>
            <div className={`rounded-full w-8 h-8 flex items-center justify-center font-bold border-2 shadow-md transition-all duration-300 ${idx <= activeStep ? 'border-[#2563eb] bg-[#dbeafe]' : 'border-gray-200 bg-gray-100'}`}>{idx < activeStep ? <span className="text-xl">✓</span> : idx + 1}</div>
            <span className="text-xs mt-3 font-medium whitespace-nowrap tracking-wide">{step}</span>
          </div>
          {idx < steps.length - 1 && (
            <div className={`flex-1 h-1 mx-2 rounded-full transition-all duration-300 ${idx < activeStep ? 'bg-gradient-to-r from-[#2563eb] to-[#60a5fa]' : 'bg-gray-200'}`}></div>
          )}
        </div>
      ))}
    </div>
  );
};

const OrderDetailsPage = () => {
  // Get orderId route param
  const { orderId } = useParams();


  const { orderDetails, items, isLoading, error } = useOrderDetails(orderId);
  // Use totalPrice from DTO for the 'total' column
  const orderItems = items.length > 0
    ? items.map(item => ({
        ...item,
        total: (item.totalPrice !== undefined && item.totalPrice !== null)
          ? `₹ ${Number(item.totalPrice).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
          : ''
      }))
    : [];


  const columns = [
    { key: 'productName', header: 'Item Name', primary: true, width: 'w-[400px]' },
    { key: 'quantity', header: 'Quantity', width: 'w-[400px]' },
    { key: 'price', header: 'Unit Price', width: 'w-[400px]' },
    { key: 'total', header: 'Total', width: 'w-[400px]' }
  ];

  const handleRowClick = (row) => {
    console.log('Clicked row:', row);
  };

  if (isLoading) return <div>Loading order details...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-[#f0f4ff] to-[#e0e7ff] group/design-root overflow-x-hidden" style={{fontFamily: 'Work Sans, Noto Sans, sans-serif'}}>
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-40 flex flex-1 justify-center py-8">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1 gap-8">

            {/* Order Header */}
            <div className="flex flex-wrap justify-between gap-3 p-6 bg-white rounded-xl shadow-lg border border-[#e0e7ff]">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#1d2233] tracking-light text-[32px] font-extrabold leading-tight">Order #{orderDetails?.id ?? orderId}</p>
                <p className="text-[#64748b] text-base font-medium leading-normal">
                  Placed on {orderDetails?.orderdate ? new Date(orderDetails.orderdate).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>

            {/* Order Progress Bar and Tracking */}
            <div className="p-6 bg-white rounded-xl shadow-lg border border-[#e0e7ff] flex flex-col gap-6">
              <ProgressTracker currentStatus={orderDetails?.status} />
              <div className="flex flex-col gap-2 mt-2">
                <span className="text-xl font-bold text-[#2563eb]">{orderDetails?.status} {orderDetails?.statusMessage ? ': ' + orderDetails.statusMessage : ''}</span>
                {orderDetails?.status && orderDetails.status.toLowerCase() === 'delivered' ? (
                  <span className="text-[#059669] font-semibold">
                    Delivered on {orderDetails?.deliveredDate ? new Date(orderDetails.deliveredDate).toLocaleDateString() : 'N/A'}
                  </span>
                ) : (
                  <span className="text-[#1b5ff3] font-semibold">Expected delivery: {orderDetails?.expectedDeliveryDate ? new Date(orderDetails.expectedDeliveryDate).toLocaleDateString() : 'N/A'}</span>
                )}
              </div>
              {/* Tracking Details Table */}
              {orderDetails?.trackingHistory && orderDetails.trackingHistory.length > 0 && (
                <div className="mt-6">
                  <div className="font-bold mb-2 text-[#1d2233]">Tracking Details:</div>
                  <div className="overflow-x-auto rounded-lg border border-[#e0e7ff] bg-[#f8fafc]">
                    <table className="min-w-full text-sm">
                      <thead className="bg-[#e0e7ff]">
                        <tr>
                          <th className="px-4 py-3 border-b font-semibold text-[#1d2233]">Date/Time</th>
                          <th className="px-4 py-3 border-b font-semibold text-[#1d2233]">Location</th>
                          <th className="px-4 py-3 border-b font-semibold text-[#1d2233]">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderDetails.trackingHistory.map(event => (
                          <tr key={event.id || event.date + event.status} className="hover:bg-[#e0e7ff]/40 transition-colors">
                            <td className="px-4 py-2 border-b">{event.date}</td>
                            <td className="px-4 py-2 border-b">{event.location}</td>
                            <td className="px-4 py-2 border-b">{event.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {/* Order Summary */}
              <div className="flex items-stretch justify-between gap-4 rounded-lg mt-6 bg-[#f8fafc] p-4 border border-[#e0e7ff]">
                <div className="flex flex-col gap-1 flex-[2_2_0px]">
                  <p className="text-[#64748b] text-base font-semibold leading-normal">Status: {orderDetails?.status ?? 'N/A'}</p>
                  <p className="text-[#1d2233] text-lg font-bold leading-tight">Order Summary</p>
                  <p className="text-[#64748b] text-base font-semibold leading-normal">Total: ₹ {orderDetails?.totalAmount || orderDetails?.totalamount || orderDetails?.total_price || orderDetails?.totalprice || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="p-6 bg-white rounded-xl shadow-lg border border-[#e0e7ff]">
              <div className="flex items-stretch justify-between gap-4">
                <div className="flex flex-col gap-1 flex-[2_2_0px]">
                  <p className="text-[#1d2233] text-lg font-bold leading-tight mb-2">Customer Information</p>
                  <div className="text-[#64748b] text-base font-normal leading-normal space-y-1">
                    <p><span className="font-semibold">Name:</span> {orderDetails?.customername ?? 'N/A'}</p>
                    <p><span className="font-semibold">Phone:</span> {orderDetails?.customerphone ?? 'N/A'}</p>
                    <p><span className="font-semibold">Email:</span> {orderDetails?.customeremail ?? 'N/A'}</p>
                    <p><span className="font-semibold">Address:</span> {orderDetails?.customeraddress ?? 'N/A'}</p>
                    <p><span className="font-semibold">City:</span> {orderDetails?.customercity || orderDetails?.city || 'N/A'}</p>
                    <p><span className="font-semibold">State:</span> {orderDetails?.customerstate || orderDetails?.state || 'N/A'}</p>
                    <p><span className="font-semibold">Postal Code:</span> {orderDetails?.customerpostalcode || orderDetails?.postalcode || 'N/A'}</p>
                    <p><span className="font-semibold">Country:</span> {orderDetails?.customercountry || orderDetails?.country || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ordered Items Section */}
            <div className="p-6 bg-white rounded-xl shadow-lg border border-[#e0e7ff]">
              <h2 className="text-[#1d2233] text-2xl font-bold leading-tight tracking-[-0.015em] pb-3">Ordered Items</h2>
              {orderItems.length > 0 ? (
                <DataTable 
                  columns={columns}
                  data={orderItems}
                  onRowClick={handleRowClick}
                />
              ) : (
                <div className="px-4 py-2 text-[#64748b]">No items found for this order.</div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;