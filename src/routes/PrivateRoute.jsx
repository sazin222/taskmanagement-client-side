import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';
import Loader from '../components/Shared/Loader';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    // location.pathname = "/";

    // console.log(location, 'lakdjflakdjf');


    if (loading) return <Loader></Loader>

    // if (loading) return <p>Loading...</p>
    if (user) return children;
    // return <Navigate to="/login" replace="true" />
    return <Navigate to="/login" state={{ from: location }} replace={true} />
};

export default PrivateRoute;