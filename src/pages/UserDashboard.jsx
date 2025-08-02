import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { useUserDashboardData } from "../hooks/user/useUserDashboardData";

const StatCard = ({ title, value }) => (
  <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-[#f0f1f5]">
    <p className="text-[#111318] text-base font-medium leading-normal">{title}</p>
    <p className="text-[#111318] tracking-light text-2xl font-bold leading-tight">{value}</p>
  </div>
);

const StatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in transit':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-[#f0f1f5] text-[#111318]';
    }
  };

  return (
    <button className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 text-sm font-medium leading-normal w-full ${getStatusColor(status)}`}>
      <span className="truncate">{status}</span>
    </button>
  );
};

const UserDashboard = () => {
  const navigate = useNavigate();

  // Move userId & hook call inside component
  const userId = "5";  //this is hardcoded value.
  const { stats, recentOrders, isLoading, error, refreshDashboardData } = useUserDashboardData(userId);
  console.log('recentOrders:', recentOrders);

  const handleViewOrder = (orderId) => {
    navigate(`/dashboard/orders/${orderId}`);
  };

  const handleCreateOrder = () => {
    navigate("/dashboard/orders/createOrder");
  };

  const handleManageReturns = () => {
    console.log('Manage returns');
  };

  const handleSupport = () => {
    console.log('Support');
  };

  // if (isLoading) return <div>Loading dashboard...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">

        {/* Welcome Section */}
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-[#111318] tracking-light text-[32px] font-bold leading-tight">Dashboard</p>
            <p className="text-[#606e8a] text-sm font-normal leading-normal">Welcome back, Rajesh Sharma</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="flex flex-wrap gap-4 p-4">
          {stats && Object.entries(stats).map(([key, value]) => (
            <StatCard key={key} title={key.replace(/([A-Z])/g, ' $1').trim()} value={value} />
          ))}
        </div>

        {/* Recent Orders Section */}
        <h2 className="text-[#111318] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Recent Orders</h2>
        <div className="px-4 py-3">
          <div className="flex overflow-hidden rounded-lg border border-[#dbdee6] bg-white">
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-white">
                    <th className="px-4 py-3 text-left text-[#111318] text-sm font-medium leading-normal">Order ID</th>
                    <th className="px-4 py-3 text-left text-[#111318] text-sm font-medium leading-normal">Customer Name</th>
                    <th className="px-4 py-3 text-left text-[#111318] text-sm font-medium leading-normal">Status</th>
                    <th className="px-4 py-3 text-left text-[#111318] text-sm font-medium leading-normal">Delivery Date</th>
                    <th className="px-4 py-3 text-left text-[#606e8a] text-sm font-medium leading-normal">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders && recentOrders.map((order, index) => {
                    const customerName = order.customername || 'N/A';
                    const deliveryDate = order.orderDate || 'N/A';
                    return (
                      <tr key={index} className="border-t border-t-[#dbdee6]">
                        <td className="h-[72px] px-4 py-2 text-[#111318] text-sm font-normal leading-normal">{order.id}</td>
                        <td className="h-[72px] px-4 py-2 text-[#606e8a] text-sm font-normal leading-normal">{customerName}</td>
                        <td className="h-[72px] px-4 py-2 text-sm font-normal leading-normal">
                          <StatusBadge status={order.status} />
                        </td>
                        <td className="h-[72px] px-4 py-2 text-[#606e8a] text-sm font-normal leading-normal">{deliveryDate}</td>
                        <td className="h-[72px] px-4 py-2 text-[#606e8a] text-sm font-bold leading-normal tracking-[0.015em]">
                          <button onClick={() => handleViewOrder(order.id)} className="hover:text-[#1b5ff3] transition-colors">
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <h2 className="text-[#111318] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Quick Actions</h2>
        <div className="flex justify-stretch">
          <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-between">
            <Button variant="primary" onClick={handleCreateOrder}>Create New Order</Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;
