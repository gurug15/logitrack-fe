import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import TrackingPage from "./pages/TrackingPage"




function App() {

  return (
    <>
      <Routes>
      
      <Route path="/" element={<TrackingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
      {/* <Signup/> */}
    </>
  )
}

export default App
