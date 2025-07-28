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




function App() {

  return (
    <>
      <Routes>
      
      <Route path="/" element={<Layout />} >
       <Route index element={<HomePage/>}/>
       <Route path="track" element={<TrackingPage />} />
      </Route>
      <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="track" element={<TrackingPage />} />
          <Route index  element={<UserDashboard/>}/>
          <Route path="orders"  element={<OrdersPage/>}/>
            <Route path="orders/createOrder" element={<CreateOrderForm/>}/>
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
