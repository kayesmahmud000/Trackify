import { Route, Routes } from "react-router"
import MainLayout from "./layout/MainLayout"
import Home from "./pages/Home/Home"
import AuthLayout from "./layout/AuthLayout"
import Login from "./pages/AuthPage/Login"
import Register from "./pages/AuthPage/Register"
import PrivateRoute from "./route/PrivateRoute"

function App() {
  

  return (
    <>
    
     <Routes>
      <Route path="/" element={<AuthLayout/>}>
      <Route index element={<Login/>}></Route>
      <Route path="register" element={<Register/>}></Route>
      </Route>
      <Route path="/main" element={<PrivateRoute><MainLayout/></PrivateRoute>}>
      <Route index element={<Home></Home>}></Route>

      </Route>
     </Routes>

    </>
  )
}

export default App
