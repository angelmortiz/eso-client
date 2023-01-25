import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/**
This component prevents NOT logged-in users to access routes that should only
be accessible by authenticated users. The user should login before
having access to these routes.
*/
const PrivateRoute = ({ children }) => {
    const isUserAuthenticated = useSelector(state => state.auth.isUserAuthenticated);

    return isUserAuthenticated ? children : <Navigate replace to='/auth/login'/>;
};

export default PrivateRoute;