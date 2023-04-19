import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../util/apis/auth/authApis";
import AuthFormInput from "../UI/Inputs/AuthFormInput";
import SimpleConfirmationModal from "../UI/Modals/OneButtonModals/SimpleConfirmationModal";

const inputValues = [
  {
    name: "currentPassword",
    label: "Current password",
    type: "password",
    id: "currentPassword",
    placeholder: "Enter the current password",
    requiredField: true,
  },
  {
    name: "newPassword",
    label: "New password",
    type: "password",
    id: "newPassword",
    placeholder: "Enter the new password",
    requiredField: true,
  },
  {
    name: "passwordConfirmation",
    label: "Confirm password",
    type: "password",
    id: "passwordConfirmation",
    placeholder: "Re-enter the same password",
    requiredField: true,
  },
];

const ChangePassword = (props) => {
  const navigateTo = useNavigate();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isButtonEnabled, setButtonStatus] = useState(true);
  const [responseError, setResponseError] = useState("");
  const [formValues, setFormValues] = useState({
    currentPassword: "",
    newPassword: "",
    passwordConfirmation: "",
  });
  const [formErrors, setFormErrors] = useState({
    currentPassword: [],
    newPassword: [],
    passwordConfirmation: [],
  });

  const onChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const userChangePassword = (e) => {
    e.preventDefault();

    if (!isValidationSuccessful()) return;

    changePassword(formValues).then((response) => {
      //console.log('Response: ', response);
      if (response && response.isSuccess) {
        setIsConfirmationModalOpen(true);
      } else if (response && response.message) {
        setResponseError(response.message);
      }

      setButtonStatus(true);
    });
  };

  const isValidationSuccessful = () => {
    const { currentPassword, newPassword, passwordConfirmation } = formValues;
    let errors = {
      currentPassword: [],
      newPassword: [],
      passwordConfirmation: [],
    };

    //current password validations
    if (!currentPassword) {
      errors.currentPassword.push("Current password is required.");
    }

    //new confirmation validations
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
    if (!newPassword) {
      errors.newPassword.push("New password is required.");
    } else if (!passwordPattern.test(newPassword)) {
      errors.newPassword.push(
        "Password must contain 8-20 characters and include at least one letter, one number, and one special character."
      );
    }

    //password confirmation validations
    if (!passwordConfirmation) {
      errors.passwordConfirmation.push("Password confirmation is required.");
    } else if (formValues.passwordConfirmation !== formValues.newPassword) {
      errors.passwordConfirmation.push("Passwords do not match.");
    }

    setFormErrors(errors);

    //true if no errors were found, otherwise, false
    return (
      errors.currentPassword.length === 0 &&
      errors.newPassword.length === 0 &&
      errors.passwordConfirmation.length === 0
    );
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
    navigateTo("/auth/login");
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-6 sm:px-6 sm:py-12 lg:px-8">
        {/* LABEL */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-700">
            Change password
          </h2>
        </div>

        {/* CHANGE PASSWORD CARD */}
        <div className="m-6 mt-6 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="rounded-lg bg-white py-8 px-4 shadow sm:px-10">
            <form
              className="flex flex-col gap-5"
              id="signup-form"
              onSubmit={userChangePassword}
            >
              {inputValues.map((fieldValues) => (
                <AuthFormInput
                  key={`${fieldValues.name}`}
                  {...fieldValues}
                  errors={formErrors[fieldValues.name]}
                  value={formValues[fieldValues.name]}
                  onChange={onChange}
                />
              ))}

              <button
                type="submit"
                id="signup-user"
                className="mt-2 flex w-full justify-center rounded-md bg-cyan-700 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-cyan-600"
                disabled={!isButtonEnabled}
              >
                Change password
              </button>
              {responseError && (
                <span className="mt-1 text-red-800">{responseError}</span>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Email confirmation sent modal */}
      <SimpleConfirmationModal
        isModalOpen={isConfirmationModalOpen}
        closeModal={closeConfirmationModal}
        status="OK"
        title="Password changed"
        message="Your password has been changed successfully."
        buttonLabel="OK"
      />
    </>
  );
};

export default ChangePassword;
