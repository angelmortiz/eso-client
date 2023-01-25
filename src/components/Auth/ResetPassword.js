import { resetPassword } from '../../util/apis/auth/authApis';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from '../UI/General/CSS/Form.module.css';
import OkConfirmationModal from '../UI/Popups/SimpleMessage/OkConfirmationModal';
import FormInput from '../UI/Inputs/FormInput';

const inputValues = {
  password: {
    name: 'password',
    label: 'New password',
    type: 'password',
    id: 'newPassword',
    placeholder: 'Enter a password',
    pattern:
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/,
  },
  passwordConfirmation: {
    name: 'passwordConfirmation',
    label: 'Confirm password',
    type: 'password',
    id: 'passwordConfirmation',
    placeholder: 'Re-enter the same password'
  },
};

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

  const userResetPassword = (event) => {
    event.preventDefault();

    if (!isValidationSuccessful()) return;
    setButtonStatus(false);

    const body = {
      ...formValues,
      resetToken,
    };

    resetPassword(body).then((response) => {
      console.log('Response: ', response);
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
    if (!password) {
      errors.password.push('Password is required.');
    } else if (!inputValues.password.pattern.test(password)) {
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
    <section className={styles['main-section']}>
      <form
        id="resetPassword-form"
        onSubmit={userResetPassword}
        className={styles['main-form']}
      >
        <h1 className={styles['form-title']}>Reset Password</h1>

        {/* PASSWORD */}
        <FormInput
          {...inputValues.password}
          errors={formErrors.password}
          value={formValues['password']}
          onChange={onChange}
        />

        {/* PASSWORD CONFIRMATION */}
        <FormInput
          {...inputValues.passwordConfirmation}
          errors={formErrors.passwordConfirmation}
          value={formValues['passwordConfirmation']}
          onChange={onChange}
        />

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          id="reset-password"
          className={
            isButtonEnabled
              ? styles['submit-btn']
              : styles['submit-btn-disabled']
          }
        >
          Reset Password
        </button>

        {responseError && (
          <span className={styles['response-error-text']}>{responseError}</span>
        )}
      </form>

      {/* Password reset confirmation modal */}
      <OkConfirmationModal
        isModalOpen={isConfirmationModalOpen}
        closeModal={closeConfirmationModal}
        message="Password has been reset successfully. Please login."
      />
    </section>
  );
};

export default ResetPassword;
