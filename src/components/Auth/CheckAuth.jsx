import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";
import { userActions } from "../../store/userSlice";
import { isAuthenticationValid } from "../../util/apis/auth/authApis";
import { fetchCurrentUser } from "../../util/apis/users/usersApis";

const CheckAuth = (props) => {
  const dispatch = useDispatch();
  const { setAuthenticationStatus } = props;
  const isUserAuthenticated = useSelector(
    (state) => state.auth.isUserAuthenticated
  );

  useEffect(() => {
    if (isUserAuthenticated) return;

    checkUserAuthentication();
  });

  const checkUserAuthentication = () => {
    isAuthenticationValid()
      .then((response) => {
        if (!response || !response.body.isUserAuthenticated) {
          return;
        }

        //sets authentication to true in redux store
        dispatch(authActions.login());
        //If user has a valid auth, pulls user info
        getUserInfo();
      })
      .catch((error) => {
        console.error(
          "Error occurred while checking user authentication. Error: ",
          error
        );
      })
      .finally(() => {
        setAuthenticationStatus && setAuthenticationStatus(true);
      });
  };

  const getUserInfo = () => {
    fetchCurrentUser()
      .then((response) => {
        if (!response || !response.isSuccess) {
          console.log("User could not be fetched. Message:", response?.message);
          return;
        }

        //sets user info into redux store
        dispatch(userActions.setUserInfo(response.body));
      })
      .catch((error) => {
        console.log(
          "Error occurred while fetching user information. Error: ",
          error
        );
      });
  };

  return null;
};

export default CheckAuth;
