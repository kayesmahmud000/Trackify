import { useContext } from "react";
import authContext from "../context/authContext";
import { useNavigate } from "react-router";


const Navbar = () => {
    const {user, logout}=useContext(authContext)
const navigate=useNavigate()
    const handleLogout= ()=>{
        logout()
        .then(()=>{
            navigate('/')
        }).catch((error)=>{
            console.log(error)
        })
    }
    return (
        <div className="">
             <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
    </div>
    <h1 className="btn btn-ghost text-3xl">Trackify</h1>
  </div>
  <div className="navbar-center hidden lg:flex">
   
  </div>
  <div className="navbar-end">
    {
        user && user.email && <><p>{user?.email}</p>
    <button onClick={handleLogout} className="btn">Logout</button></>
    }
  </div>
</div>  
        </div>
    );
};

export default Navbar;