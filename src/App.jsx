import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import TrackingPage from "./pages/TrackingPage"
import Layout from "./components/ui/Layout"
import HomePage from "./pages/HomePage"
import DashboardLayout from "./components/ui/DashboardLayout"
import UserDashboard from "./pages/UserDashboard"
import OrdersPage from "./pages/Orderspage"
import ErrorPage404 from "./pages/ErrorPage404"
import CreateOrderForm from "./pages/CreateOrderForm"
import { AdminLayout } from "./components/admin/AdminLayout"
import UserManagement from "./pages/admin/UserManagement"
import CenterManagement from "./pages/admin/CenterMmanagement"
import OrdersDashboard from "./pages/admin/OrdersManagementPage"
import EditUserPage from "./pages/admin/EditUser"
import OrderDetailsPage from "./pages/OrderDetailsPage"
import CreateLogisticCenterPage from "./pages/admin/CreateLogisticCenterPage"




function App() {

  return (
    <>
      <Routes>
      <Route path="/" element={<Layout />} >
          <Route index element={<HomePage/>}/>
          <Route path="track" element={<TrackingPage />} />
      </Route>
      <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index  element={<UserDashboard/>}/>
          <Route path="track" element={<TrackingPage />} />
          <Route path="orders"  element={<OrdersPage/>}/>
          <Route path="orders/createOrder" element={<CreateOrderForm/>}/>
          <Route path="orders/:orderId"  element={<OrderDetailsPage/>}/>
      </Route>
       <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<UserManagement />} />
          <Route path="centers" element={<CenterManagement />} />
          <Route path="centers/create" element={<CreateLogisticCenterPage/>}/>
          <Route path="orders" element={<OrdersDashboard />} />
          <Route path="user/:userId" element={<EditUserPage/>}/>
          <Route path="orders/:orderId"  element={<OrderDetailsPage/>}/>
          
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<ErrorPage404/>} />

    </Routes>
      {/* <Signup/> */}
    </>
  )
}

export default App
