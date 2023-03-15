import { resetPassword } from '../../util/apis/auth/authApis';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SimpleConfirmationModal from '../UI/Modals/OneButtonModals/SimpleConfirmationModal';
import AuthFormInput from '../UI/Inputs/AuthFormInput';

const inputValues = [
  {
    name: 'password',
    label: 'New password',
    type: 'password',
    id: 'newPassword',
    placeholder: 'Enter a password',
    requiredField: true,
  },
  {
    name: 'passwordConfirmation',
    label: 'Confirm password',
    type: 'password',
    id: 'passwordConfirmation',
    placeholder: 'Re-enter the same password',
    requiredField: true,
  },
];

const ResetPassword = (props) => {
  const navigateTo = useNavigate();
  const [resetToken, setResetToken] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isButtonEnabled, setButtonStatus] = useState(true);
  const [responseError, setResponseError] = useState('');
  const [formValues, setFormValues] = useState({
    password: '',
    passwordConfirmation: '',
  });
  const [formErrors, setFormErrors] = useState({
    password: [],
    passwordConfirmation: [],
  });

  useEffect(() => {
    extractTokenFromUrl();
  });


  const onChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const extractTokenFromUrl = () => {
    const token = searchParams.get('token');
    if (!token) {
      if (!resetToken) {
        console.error('Error: reset token not available.');
        navigateTo('/auth/login');
      }
      return;
    }

    searchParams.delete('token');
    setResetToken(token);
    setSearchParams(searchParams);
  };

  const userResetPassword = (e) => {
    e.preventDefault();

    if (!isValidationSuccessful()) return;
    setButtonStatus(false);

    const body = {
      ...formValues,
      resetToken,
    };

    resetPassword(body).then((response) => {
      //console.log('Response: ', response);
      if (response && response.isSuccess) {
        setIsConfirmationModalOpen(true);
      } else if (response && response.message){
        setResponseError(response.message);
      }

      setButtonStatus(true);
    });
  };

  const isValidationSuccessful = () => {
    const { password, passwordConfirmation } = formValues;
    let errors = {
      password: [],
      passwordConfirmation: [],
    };

    //password validations
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
    if (!password) {
      errors.password.push('Password is required.');
    } else if (!passwordPattern.test(password)) {
      errors.password.push(
        'Password must contain 8-20 characters and include at least one letter, one number, and one special character.'
      );
    }

    //password confirmation validations
    if (!passwordConfirmation) {
        errors.passwordConfirmation.push('Password confirmation is required.');
    } else if (formValues.passwordConfirmation !== formValues.password) {
        errors.passwordConfirmation.push('Passwords do not match.');
    }
    setFormErrors(errors);

    //true if no errors were found, otherwise, false
    return errors.password.length === 0 && errors.passwordConfirmation.length === 0;
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
    navigateTo('/');
  };

  return (
    <>
      <div className="flex flex-col min-h-full justify-center py-6 sm:px-6 sm:py-12 lg:px-8">
        {/* LABEL */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-700">
            Reset password
          </h2>
        </div>

        {/* RESET PASSWORD CARD */}
        <div className="mt-6 m-6 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 rounded-lg shadow sm:px-10">
            <form
              className="flex flex-col gap-5"
              id="signup-form"
              onSubmit={userResetPassword}
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
                className="flex w-full justify-center mt-2 rounded-md bg-cyan-700 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-cyan-600"
                disabled={!isButtonEnabled}
              >
                Reset password
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

export default ResetPassword;
