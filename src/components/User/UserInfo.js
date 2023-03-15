import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../../store/authSlice';
import { userActions } from '../../store/userSlice';
import { logout } from '../../util/apis/auth/authApis';

const UserInfo = (props) => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const currentUserInfo = useSelector((state) => state.userInfo.userInfo);

  const userLogout = () => {
    logout().then((response) => {
      if (response && response.isSuccess) {
        dispatch(authActions.logout());
        dispatch(userActions.removeUserInfo());
        navigateTo('/auth/login');
      }
    });
  };

  return (
    <div className="mt-14 mx-6 px-4 pb-4 sm:mx-auto sm:w-fit rounded-lg overflow-hidden bg-white shadow">
      <div className="sm:flex">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-semibold leading-6 text-gray-900">
            User Information
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            User account information and goals.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="divide-y divide-gray-200">
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {currentUserInfo.fullName}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {currentUserInfo.email}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Password</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <Link
                  to="/auth/changePassword"
                  className="w-full justify-center text-md font-semibold text-cyan-700 hover:text-cyan-600"
                >
                  Change password
                </Link>
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Role</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {currentUserInfo.role}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Sex</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {currentUserInfo?.userInfo?.basicInfo?.sex}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Weight</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {currentUserInfo?.userInfo?.basicInfo?.weight}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Height</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {currentUserInfo?.userInfo?.basicInfo?.height}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="flex pt-4 justify-center items-center border-t">
        <button
          type="button"
          className="text-md font-semibold text-cyan-700 hover:text-cyan-600"
          onClick={userLogout}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
