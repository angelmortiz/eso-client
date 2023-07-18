import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/authSlice";
import { userActions } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { registerBetaUser } from "../../util/apis/auth/authApis";
import { fetchCurrentUser } from "../../util/apis/users/usersApis";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import AuthFormInput from "../UI/Inputs/AuthFormInput";
const inputValues = {
  code: {
    name: "code",
    label: "Beta user code",
    type: "text",
    id: "code",
    placeholder: "Enter your code",
    requiredField: true,
  },
};

const BetaUserRegistration = (props) => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({ code: "" });
  const [formErrors, setFormErrors] = useState({ code: [] });
  const [responseError, setResponseError] = useState("");

  const onChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const registerCurrentBetaUser = (e) => {
    e.preventDefault();

    if (!isValid()) return;

    registerBetaUser(formValues).then((response) => {
      if (!response || !response.isSuccess) {
        setResponseError(response?.message);
        return;
      }

      dispatch(authActions.login());
      navigateTo("/");
      getCurrentUserInfo();
    });
  };

  const isValid = () => {
    const { code } = formValues;
    let errors = {
      code: [],
    };

    // code validations
    if (!code) {
      errors.code.push("Code is required.");
    } else if (code.indexOf("-") === -1) {
      errors.code.push(`The code must contain at least one '-' to be valid.`);
    }

    setFormErrors(errors);

    //true if no errors were found, otherwise, false
    return errors.code.length === 0;
  };

  const getCurrentUserInfo = () => {
    fetchCurrentUser().then((response) => {
      if (response && response.isSuccess) {
        dispatch(userActions.setUserInfo(response.body));
      }
    });
  };

  return (
    <div className="flex min-h-full flex-col justify-center gap-5 py-6 sm:px-6 lg:px-8">
      {/* LOGO AND LOG IN LABEL */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto hidden h-16 w-auto sm:block"
          src="/icon-logo.png"
          alt="Your Company"
        />
        <h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-gray-700">
          Register as a Beta User
        </h2>
      </div>

      {/* LOG IN CARD */}
      <div className="mx-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mb-5 rounded-md bg-cyan-100 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <InformationCircleIcon
                className="h-5 w-5 text-cyan-500"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm text-cyan-700">
                The entered username is not registered as a beta user. Please
                input your beta user code below to register.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white px-4 py-8 shadow sm:px-10">
          <form
            className="flex flex-col gap-6"
            id="beta-register-form"
            onSubmit={registerCurrentBetaUser}
          >
            {/* CODE */}
            <AuthFormInput
              {...inputValues.code}
              errors={formErrors.code}
              value={formValues["code"]}
              onChange={onChange}
            />

            <button
              type="submit"
              id="register-beta-user"
              className="flex w-full justify-center rounded-md bg-cyan-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-600"
            >
              Register
            </button>
            {responseError && (
              <span className="mt-1 text-red-800">{responseError}</span>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default BetaUserRegistration;
