import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/authSlice";
import { userActions } from "../../store/userSlice";
import { login } from "../../util/apis/auth/authApis";
import { fetchCurrentUser } from "../../util/apis/users/usersApis";
import AuthFormInput from "../UI/Inputs/AuthFormInput";

const inputValues = {
  email: {
    name: "email",
    label: "Email",
    type: "text",
    id: "email",
    autoComplete: "email",
    placeholder: "Enter an email",
    requiredField: true,
  },
  password: {
    name: "password",
    label: "Password",
    type: "password",
    id: "password",
    autoComplete: "current-password",
    placeholder: "Enter a password",
    requiredField: true,
  },
};

const Login = (props) => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({ email: [], password: [] });
  const [responseError, setResponseError] = useState("");

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
      navigateTo("/activities/exercises");
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
      errors.email.push("Email is required.");
    } else if (email.indexOf("@") === -1) {
      errors.email.push(`The email must contain a '@' to be valid.`);
    }

    //password validations
    if (!password) {
      errors.password.push("Password is required.");
    }
    setFormErrors(errors);

    //true if no errors were found, otherwise, false
    return errors.email.length === 0 && errors.password.length === 0;
  };

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* LOGO AND LOG IN LABEL */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto hidden h-16 w-auto sm:block"
          src="/icon-logo.png"
          alt="Your Company"
        />
        <h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-gray-700">
          Log in to your account
        </h2>
      </div>

      {/* LOG IN CARD */}
      <div className="mx-6 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-lg bg-white px-4 py-8 shadow sm:px-10">
          <form
            className="flex flex-col gap-6"
            id="login-form"
            onSubmit={loginUser}
          >
            {/* EMAIL */}
            <AuthFormInput
              {...inputValues.email}
              errors={formErrors.email}
              value={formValues["email"]}
              onChange={onChange}
            />
            {/* PASSWORD */}
            <AuthFormInput
              {...inputValues.password}
              errors={formErrors.password}
              value={formValues["password"]}
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
              className="flex w-full justify-center rounded-md bg-cyan-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-600"
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

            <div className="mt-6 flex flex-col gap-4">
              <Link
                to=""
                className="flex w-full items-center justify-center gap-3 rounded-md bg-[#DB4437] px-3 py-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DB4437]"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  version="1.1"
                  viewBox="0 0 210 210"
                >
                  <path d="M0,105C0,47.103,47.103,0,105,0c23.383,0,45.515,7.523,64.004,21.756l-24.4,31.696C133.172,44.652,119.477,40,105,40 c-35.841,0-65,29.159-65,65s29.159,65,65,65c28.867,0,53.398-18.913,61.852-45H105V85h105v20c0,57.897-47.103,105-105,105 S0,162.897,0,105z" />
                </svg>
                <span className="text-sm font-semibold leading-6">
                  Continue with Google
                </span>
              </Link>
              <Link
                to=""
                className="flex w-full items-center justify-center gap-3 rounded-md bg-[#3b5998] px-3 py-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3b5998]"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z" />
                </svg>
                <span className="text-sm font-semibold leading-6">
                  Continue with Facebook
                </span>
              </Link>
              <Link
                to="/auth/signup"
                className="flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  version="1.1"
                  viewBox="0 0 512 512"
                >
                  <path
                    class="st0"
                    d="M510.678,112.275c-2.308-11.626-7.463-22.265-14.662-31.054c-1.518-1.915-3.104-3.63-4.823-5.345 c-12.755-12.818-30.657-20.814-50.214-20.814H71.021c-19.557,0-37.395,7.996-50.21,20.814c-1.715,1.715-3.301,3.43-4.823,5.345 C8.785,90.009,3.63,100.649,1.386,112.275C0.464,116.762,0,121.399,0,126.087V385.92c0,9.968,2.114,19.55,5.884,28.203 c3.497,8.26,8.653,15.734,14.926,22.001c1.59,1.586,3.169,3.044,4.892,4.494c12.286,10.175,28.145,16.32,45.319,16.32h369.958 c17.18,0,33.108-6.145,45.323-16.384c1.718-1.386,3.305-2.844,4.891-4.43c6.27-6.267,11.425-13.741,14.994-22.001v-0.064 c3.769-8.653,5.812-18.171,5.812-28.138V126.087C512,121.399,511.543,116.762,510.678,112.275z M46.509,101.571 c6.345-6.338,14.866-10.175,24.512-10.175h369.958c9.646,0,18.242,3.837,24.512,10.175c1.122,1.129,2.179,2.387,3.112,3.637 L274.696,274.203c-5.348,4.687-11.954,7.002-18.696,7.002c-6.674,0-13.276-2.315-18.695-7.002L43.472,105.136 C44.33,103.886,45.387,102.7,46.509,101.571z M36.334,385.92V142.735L176.658,265.15L36.405,387.435 C36.334,386.971,36.334,386.449,36.334,385.92z M440.979,420.597H71.021c-6.281,0-12.158-1.651-17.174-4.552l147.978-128.959 l13.815,12.018c11.561,10.046,26.028,15.134,40.36,15.134c14.406,0,28.872-5.088,40.432-15.134l13.808-12.018l147.92,128.959 C453.137,418.946,447.26,420.597,440.979,420.597z M475.666,385.92c0,0.529,0,1.051-0.068,1.515L335.346,265.221L475.666,142.8 V385.92z"
                  />
                </svg>
                <span className="text-sm font-semibold leading-6">
                  Sign up with Email
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
