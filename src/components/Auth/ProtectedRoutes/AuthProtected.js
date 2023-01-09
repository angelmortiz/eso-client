import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/**
This component prevents logged users to access routes that should only
be accessible by not logged-in users. The user should logout before
having access to these routes.
*/
const AuthProtected = ({ children }) => {
    const isUserAuthenticated = useSelector(state => state.auth.isUserAuthenticated);

    return !isUserAuthenticated ? children : <Navigate replace to='/'/>;
};

export default AuthProtected;