/* eslint-disable react/prop-types */
import { useContext } from "react";
import authContext from "../context/authContext";
import LoadingPage from "../pages/Loading/LoadingPage";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({children}) => {
const {user, loading}=useContext(authContext)
const location= useLocation()
if(loading) return <LoadingPage/>
if(user) return children

return <Navigate to={'/'}  state={{ from: location }} replace='true' />
};

export default PrivateRoute;