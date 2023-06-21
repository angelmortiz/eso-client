import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../util/apis/auth/authApis";
import AuthFormInput from "../UI/Inputs/AuthFormInput";
import SimpleConfirmationModal from "../UI/Modals/OneButtonModals/SimpleConfirmationModal";

const emailValues = {
  name: "email",
  label: "Email",
  type: "text",
  id: "email",
  placeholder: "Enter an email",
  requiredField: true,
};

const ForgotPassword = (props) => {
  const navigateTo = useNavigate();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isButtonEnabled, setButtonStatus] = useState(true);
  const [formValues, setFormValues] = useState({ email: "" });
  const [formErrors, setFormErrors] = useState({ email: [] });
  const [responseError, setResponseError] = useState("");

  const onChange = (e) => {
    setResponseError("");
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const userForgotPassword = (e) => {
    e.preventDefault();

    if (!isValidationSuccessful()) return;

    setButtonStatus(false);
    forgotPassword(formValues).then((response) => {
      //console.log('Response: ', response);
      if (response && response.isSuccess) {
        setIsConfirmationModalOpen(true);
      } else if (response && response.message) {
        setResponseError(response.message);
      }

      setButtonStatus(true);
    });
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
    navigateTo("/auth/login");
  };

  const isValidationSuccessful = () => {
    const { email } = formValues;
    let errors = { email: [] };

    // email validations
    if (!email) {
      errors.email.push("Email is required.");
    } else if (email.indexOf("@") === -1) {
      errors.email.push(`The email must contain a '@' to be valid.`);
    }

    setFormErrors(errors);

    //true if no errors were found, otherwise, false
    return errors.email.length === 0;
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-6 sm:px-6 lg:px-8">
        {/* LABEL */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-700">
            Forgot your password
          </h2>
          <p className="text-md mt-4 px-12 text-left text-base tracking-tight text-gray-700 md:px-8">
            Please enter the email address you'd like your password reset
            information sent to.
          </p>
        </div>

        {/* LOG IN CARD */}
        <div className="mx-6 mt-4 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="rounded-lg bg-white py-6 px-4 shadow sm:px-10">
            <form
              className="flex flex-col gap-6"
              id="forgot-password-form"
              onSubmit={userForgotPassword}
            >
              {/* EMAIL */}
              <AuthFormInput
                {...emailValues}
                errors={formErrors.email}
                value={formValues["email"]}
                onChange={onChange}
              />

              <button
                type="submit"
                id="forgot-password-user"
                className="flex w-full justify-center rounded-md bg-cyan-700 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-cyan-600"
                disabled={!isButtonEnabled}
              >
                Request reset link
              </button>
              {responseError && (
                <span className="mt-1 text-red-800">{responseError}</span>
              )}
            </form>

            <div className="mt-5 flex items-center justify-center">
              <div className="text-sm">
                <Link
                  to="/auth/login"
                  className="font-medium text-cyan-700 hover:text-cyan-600"
                >
                  Back to login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email confirmation sent modal */}
      <SimpleConfirmationModal
        isModalOpen={isConfirmationModalOpen}
        closeModal={closeConfirmationModal}
        status="OK"
        title="Reset link sent"
        message="An email containing a password reset link has been sent to the email address you provided."
        buttonLabel="OK"
      />
    </>
  );
};

export default ForgotPassword;
