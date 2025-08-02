export const StatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    switch ((status || "").toLowerCase()) {
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