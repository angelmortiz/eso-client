import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";
import { userActions } from "../../store/userSlice";
import { fetchCurrentUser } from "../../util/apis/users/usersApis";

const AutoLogin = props => {
    const dispatch = useDispatch();
    const isUserAuthenticated = useSelector(state => state.auth.isUserAuthenticated);

    useEffect(() => {
        if (isUserAuthenticated) return;

        fetchCurrentUser().then(response => {
            if (response && response.status === 'success'){
                dispatch(authActions.login());
                dispatch(userActions.setUserInfo(response.userInfo));
            }
        });
    });

    return null;
}

export default AutoLogin