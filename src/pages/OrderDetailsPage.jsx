import { DataTable } from "../components/tabels/DataTable";

const OrderDetailsPage = () => {
  // Sample order data
  const orderItems = [
    {
      itemName: 'Wireless Mouse',
      quantity: 2,
      unitPrice: '₹ 500',
      total: '₹ 1,000'
    },
    {
      itemName: 'Keyboard',
      quantity: 1,
      unitPrice: '₹ 800',
      total: '₹ 800'
    },
    {
      itemName: 'Monitor',
      quantity: 1,
      unitPrice: '₹ 700',
      total: '₹ 700'
    }
  ];

  // Define columns for the DataTable
  const columns = [
    {
      key: 'itemName',
      header: 'Item Name',
      primary: true,
      width: 'w-[400px]'
    },
    {
      key: 'quantity',
      header: 'Quantity',
      width: 'w-[400px]'
    },
    {
      key: 'unitPrice',
      header: 'Unit Price',
      width: 'w-[400px]'
    },
    {
      key: 'total',
      header: 'Total',
      width: 'w-[400px]'
    }
  ];

  const handleRowClick = (row) => {
    console.log('Clicked row:', row);
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{fontFamily: '"Work Sans", "Noto Sans", sans-serif'}}>
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Order Header */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#111318] tracking-light text-[32px] font-bold leading-tight">Order #12345</p>
                <p className="text-[#606e8a] text-sm font-normal leading-normal">Placed on 15th May 2024</p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="p-4">
              <div className="flex items-stretch justify-between gap-4 rounded-lg">
                <div className="flex flex-col gap-1 flex-[2_2_0px]">
                  <p className="text-[#606e8a] text-sm font-normal leading-normal">Status: Shipped</p>
                  <p className="text-[#111318] text-base font-bold leading-tight">Order Summary</p>
                  <p className="text-[#606e8a] text-sm font-normal leading-normal">Total: ₹ 2,500</p>
                </div>
                <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1 bg-gray-100"></div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="p-4">
              <div className="flex items-stretch justify-between gap-4 rounded-lg">
                <div className="flex flex-col gap-1 flex-[2_2_0px]">
                  <p className="text-[#111318] text-base font-bold leading-tight">Customer Information</p>
                  <div className="text-[#606e8a] text-sm font-normal leading-normal space-y-1">
                    <p><span className="font-medium">Name:</span> Rohan Verma</p>
                    <p><span className="font-medium">Phone:</span> +91 9876543210</p>
                    <p><span className="font-medium">Email:</span> rohan.verma@example.com</p>
                    <p><span className="font-medium">Address:</span> 123, Main Street, Sector 15</p>
                    <p><span className="font-medium">City:</span> Gurgaon</p>
                    <p><span className="font-medium">State:</span> Haryana</p>
                    <p><span className="font-medium">Postal Code:</span> 122001</p>
                    <p><span className="font-medium">Country:</span> India</p>
                  </div>
                </div>
                <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1 bg-gray-100"></div>
              </div>
            </div>

            {/* Ordered Items Section */}
            <h2 className="text-[#111318] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Ordered Items
            </h2>
            
            {/* Using the DataTable component */}
            <DataTable 
              columns={columns}
              data={orderItems}
              onRowClick={handleRowClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;