import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import TrackingPage from "./pages/TrackingPage"
import Layout from "./components/ui/Layout"
import HomePage from "./pages/HomePage"
import DashboardLayout from "./components/ui/DashboardLayout"




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
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
      {/* <Signup/> */}
    </>
  )
}

export default App
