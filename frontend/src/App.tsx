import { Home } from "./pages/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { UserDashbaord } from "./pages/UserDashboard"
import { CaptainDashboard } from "./pages/CaptainDashboard"
import AdminDashboard from "./components/AdminDashboar"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>}/>

        <Route path="/dashboard/user" element={<UserDashbaord/>} />
        <Route path="/dashboard/captain" element={<CaptainDashboard/>} />
        
        <Route path="/dashboard/admin" element={<AdminDashboard/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
