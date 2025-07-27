import DetailItem from './DetailItem';

const PackageDetails = ({ packageData }) => {
  const defaultPackageData = {
    trackingNumber: "LT1234567890",
    sender: "Vendor Co.",
    recipient: "Priya Sharma",
    deliveryAddress: "123, Linking Road, Mumbai, 400050",
    estimatedDelivery: "2024-01-15",
    status: "Delivered",
    notifications: "None",
    support: "For any queries, contact support@logitrack.in"
  };

  const data = packageData || defaultPackageData;

  const detailItems = [
    { label: "Tracking Number", value: data.trackingNumber, isLeft: true },
    { label: "Sender", value: data.sender, isLeft: false },
    { label: "Recipient", value: data.recipient, isLeft: true },
    { label: "Delivery Address", value: data.deliveryAddress, isLeft: false },
    { label: "Estimated Delivery", value: data.estimatedDelivery, isLeft: true },
    { label: "Status", value: data.status, isLeft: false },
    { label: "Notifications", value: data.notifications, isLeft: true },
    { label: "Support", value: data.support, isLeft: false }
  ];

  return (
    <div>
      <h2 className="text-[#111318] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Package Details
      </h2>
      <div className="p-4 grid grid-cols-2">
        {detailItems.map((item, index) => (
          <DetailItem
            key={index}
            label={item.label}
            value={item.value}
            isLeft={item.isLeft}
          />
        ))}
      </div>
    </div>
  );
};

export default PackageDetails;