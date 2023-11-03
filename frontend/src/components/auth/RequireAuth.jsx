// import { useSelector } from "react-redux";
// import { useNavigation, Navigate, Outlet, useLocation } from "react-router-dom";
// import { selectCurrentToken } from "../../features/auth/authSlice";

// const requireAuth = () => {
//     const token = useSelector(selectCurrentToken);
//     const location = useLocation();

//     return (
//         token  
//         ? <Outlet /> 
//         : <Navigate to='/login' state={{from : location}} replace />
//     )
// }

// export default requireAuth;