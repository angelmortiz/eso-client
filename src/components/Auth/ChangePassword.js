import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../util/apis/auth/authApis';
import classes from '../UI/General/CSS/Form.module.css';
import FormInput from '../UI/Inputs/FormInput';
import OkConfirmationModal from '../UI/Popups/SimpleMessage/OkConfirmationModal';

const inputValues = {
  currentPassword: {
    name: 'currentPassword',
    label: 'Current password',
    type: 'password',
    id: 'currentPassword',
    placeholder: 'Enter the current password',
  },
  newPassword: {
    name: 'newPassword',
    label: 'New password',
    type: 'password',
    id: 'newPassword',
    placeholder: 'Enter the new password',
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

const ChangePassword = (props) => {
  const navigateTo = useNavigate();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isButtonEnabled, setButtonStatus] = useState(true);
  const [responseError, setResponseError] = useState('');
  const [formValues, setFormValues] = useState({
    currentPassword: '',
    newPassword: '',
    passwordConfirmation: '',
  });
  const [formErrors, setFormErrors] = useState({
    currentPassword: [],
    newPassword: [],
    passwordConfirmation: [],
  });

  const onChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const userChangePassword = (event) => {
    event.preventDefault();

    if (!isValidationSuccessful()) return;

    changePassword(formValues).then((response) => {
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
    const { currentPassword, newPassword, passwordConfirmation } = formValues;
    let errors = {
      currentPassword: [],
      newPassword: [],
      passwordConfirmation: [],
    };

    //current password validations
    if (!currentPassword) {
      errors.currentPassword.push('Current password is required.');
    }

    //new confirmation validations
    if (!newPassword) {
      errors.newPassword.push('New password is required.');
    } else if (!inputValues.newPassword.pattern.test(newPassword)) {
      errors.newPassword.push(
        'Password must contain 8-20 characters and include at least one letter, one number, and one special character.'
      );
    }

    //password confirmation validations
    if (!passwordConfirmation) {
      errors.passwordConfirmation.push('Password confirmation is required.');
    } else if (formValues.passwordConfirmation !== formValues.newPassword) {
      errors.passwordConfirmation.push('Passwords do not match.');
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
    navigateTo('/auth/login');
  };

  return (
    <section className={classes['main-section']}>
      <form
        id="changePassword-form"
        onSubmit={userChangePassword}
        className={classes['main-form']}
      >
        <h1 className={classes['form-title']}>Change Password</h1>

        {/* CURRENT PASSWORD */}
        <FormInput
          {...inputValues.currentPassword}
          errors={formErrors.currentPassword}
          value={formValues['currentPassword']}
          onChange={onChange}
        />

        {/* NEW PASSWORD */}
        <FormInput
          {...inputValues.newPassword}
          errors={formErrors.newPassword}
          value={formValues['newPassword']}
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
          id="change-password"
          className={
            isButtonEnabled
              ? classes['submit-btn']
              : classes['submit-btn-disabled']
          }
        >
          Change Password
        </button>

        {responseError && (
          <span className={classes['response-error-text']}>{responseError}</span>
        )}
      </form>

      {/* Password changed confirmation modal */}
      <OkConfirmationModal
        isModalOpen={isConfirmationModalOpen}
        closeModal={closeConfirmationModal}
        message="Password has been changed successfully."
      />
    </section>
  );
};

export default ChangePassword;
