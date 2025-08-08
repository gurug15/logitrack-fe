import DetailItem from './DetailItem';

const PackageDetails = ({ packageData }) => {
    // If there's no data, don't render anything.
    // The parent component handles loading/error states.
    if (!packageData) {
        return null;
    }

    // Format the date for a more user-friendly display.
    // E.g., "August 10, 2025"
    const formattedDeliveryDate = new Date(packageData.expectedDelivery).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // This array now maps directly to the keys in your API response.
    const detailItems = [
        { label: "Tracking ID", value: packageData.trackingId, isLeft: true },
        { label: "Sender", value: packageData.senderName, isLeft: false },
        { label: "Recipient", value: packageData.recipientName, isLeft: true },
        { label: "Delivery Address", value: packageData.deliveryAddress, isLeft: false },
        { label: "Expected Delivery", value: formattedDeliveryDate, isLeft: true },
        { label: "Status", value: packageData.status, isLeft: false },
        { label: "Weight", value: `${packageData.weight} kg`, isLeft: true },
        { label: "Dimensions", value: packageData.dimensions, isLeft: false },
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