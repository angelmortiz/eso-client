import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../../store/authSlice';
import { userActions } from '../../store/userSlice';
import { login } from '../../util/apis/auth/authApis';
import { fetchCurrentUser } from '../../util/apis/users/usersApis';
import AuthFormInput from '../UI/Inputs/AuthFormInput';

const inputValues = {
  email: {
    name: 'email',
    label: 'Email',
    type: 'text',
    id: 'email',
    autoComplete: 'email',
    placeholder: 'Enter an email',
    requiredField: true,
  },
  password: {
    name: 'password',
    label: 'Password',
    type: 'password',
    id: 'password',
    autoComplete: 'current-password',
    placeholder: 'Enter a password',
    requiredField: true,
  },
};

const Login = (props) => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({ email: [], password: [] });
  const [responseError, setResponseError] = useState('');

  const onChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const loginUser = (e) => {
    e.preventDefault();

    if (!isValidationSuccessful()) return;

    login(formValues).then((response) => {
      if (!response || !response.isSuccess) {
        setResponseError(response?.message);
        return;
      }

      dispatch(authActions.login());
      navigateTo('/activities/exercises');
      getCurrentUserInfo();
    });
  };

  const getCurrentUserInfo = () => {
    fetchCurrentUser().then((response) => {
      if (response && response.isSuccess) {
        dispatch(userActions.setUserInfo(response.body));
      }
    });
  };

  const isValidationSuccessful = () => {
    const { email, password } = formValues;
    let errors = {
      email: [],
      password: [],
    };

    // email validations
    if (!email) {
      errors.email.push('Email is required.');
    } else if (email.indexOf('@') === -1) {
      errors.email.push(`The email must contain a '@' to be valid.`);
    }

    //password validations
    if (!password) {
      errors.password.push('Password is required.');
    }
    setFormErrors(errors);

    //true if no errors were found, otherwise, false
    return errors.email.length === 0 && errors.password.length === 0;
  };

  return (
    <div className="flex flex-col min-h-full justify-center py-12 sm:px-6 lg:px-8">
      {/* LOGO AND LOG IN LABEL */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-20 w-auto"
          src="/logo.png"
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-700">
          Log in to your account
        </h2>
      </div>

      {/* LOG IN CARD */}
      <div className="mt-8 mx-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 rounded-lg shadow sm:px-10">
          <form
            className="flex flex-col gap-6"
            id="login-form"
            onSubmit={loginUser}
          >
            {/* EMAIL */}
            <AuthFormInput
              {...inputValues.email}
              errors={formErrors.email}
              value={formValues['email']}
              onChange={onChange}
            />
            {/* PASSWORD */}
            <AuthFormInput
              {...inputValues.password}
              errors={formErrors.password}
              value={formValues['password']}
              onChange={onChange}
            />

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  to="/auth/forgotPassword"
                  className="font-medium text-cyan-700 hover:text-cyan-600"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              id="login-user"
              className="flex w-full justify-center rounded-md bg-cyan-700 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-cyan-600"
            >
              Log in
            </button>
            {responseError && (
              <span className="mt-1 text-red-800">{responseError}</span>
            )}
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or</span>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-gray-600">
                Are you new around here? Sign up{' '}
                <Link
                  to="/auth/signup"
                  className="text-cyan-700 underline hover:text-cyan-600"
                >
                  here
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
