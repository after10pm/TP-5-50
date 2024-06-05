import {Outlet, Navigate} from "react-router-dom";


const ProtectedRoutes = (props) => {
    return props.user !== '' ? <Outlet/> : <Navigate to={"/authorization"}/>;
}

export default ProtectedRoutes;