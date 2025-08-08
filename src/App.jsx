import { Route, Routes } from "react-router-dom"
import ErrorPage404 from "./pages/ErrorPage404"
import Layout from "./components/ui/Layout"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import TrackingPage from "./pages/common/TrackingPage"
import HomePage from "./pages/user/HomePage"
import DashboardLayout from "./components/ui/DashboardLayout"
import UserDashboard from "./pages/user/UserDashboard"
import OrdersPage from "./pages/user/Orderspage"
import CreateOrderForm from "./pages/user/CreateOrderForm"
import OrderDetailsPage from "./pages/common/OrderDetailsPage"
import { AdminLayout } from "./components/admin/AdminLayout"
import UserManagement from "./pages/admin/UserManagement"
import CenterManagement from "./pages/admin/CenterMmanagement"
import CreateLogisticCenterPage from "./pages/admin/CreateLogisticCenterPage"
import OrdersDashboard from "./pages/admin/OrdersDashboard"
import EditUserPage from "./pages/admin/EditUserPage"
import ShipmentsPage from "./pages/subadmin/ShipmentPage"
import IncomingOrdersPage from "./pages/subadmin/IncomingOrdersPage"
import SubAdminLayout from "./components/subadmin/SubadminLayout"
import { Toaster } from 'react-hot-toast';




function App() {
 
  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<Layout />} >
          <Route index element={<HomePage />} />
          <Route path="track" element={<TrackingPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* --- Protected User/Sub-Admin Routes --- */}
        <Route element={<ProtectedRoute allowedRoles={['user', 'sub_admin', 'admin']} />}>
          <Route path="/dashboard" element={<DashboardLayout  />}>
            <Route index element={<UserDashboard />} />
            <Route path="track" element={<TrackingPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="orders/createOrder" element={<CreateOrderForm />} />
            <Route path="orders/:orderId" element={<OrderDetailsPage />} />
          </Route>
        </Route>

        {/* --- Protected Admin-Only Routes --- */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<UserManagement />} />
            <Route path="centers" element={<CenterManagement />} />
            <Route path="centers/create" element={<CreateLogisticCenterPage />} />
            <Route path="orders" element={<OrdersDashboard />} />
            <Route path="user/:userId" element={<EditUserPage />} />
            <Route path="orders/:orderId" element={<OrderDetailsPage />} />
          </Route>
        </Route>

        {/* --- Protected Sub-Admin Only Routes --- */}
        <Route element={<ProtectedRoute allowedRoles={['sub_admin']} />}>
          {/* We use AdminLayout here as you did, you can create a specific SubAdminLayout later if needed */}
          <Route path="/subadmin" element={<SubAdminLayout />}> 
            <Route index element={<IncomingOrdersPage />} /> {/* The new landing page */}
            <Route path="shipments" element={<ShipmentsPage />} /> {/* The page you already built */}
          </Route>
        </Route>


        {/* --- Catch-all 404 Route --- */}
        <Route path="*" element={<ErrorPage404 />} />
      </Routes>
    </>
  )
}

export default App
