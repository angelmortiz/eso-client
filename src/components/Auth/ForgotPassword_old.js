import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../util/apis/auth/authApis';
import AuthFormInput from '../UI/Inputs/AuthFormInput';
import OkConfirmationModal from '../UI/Popups/SimpleMessage/OkConfirmationModal';

const emailValues = {
  name: 'email',
  label: 'Email',
  type: 'text',
  id: 'email',
  placeholder: 'Enter an email',
};

const ForgotPassword_old = (props) => {
  const navigateTo = useNavigate();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isButtonEnabled, setButtonStatus] = useState(true);
  const [formValues, setFormValues] = useState({ email: '' });
  const [formErrors, setFormErrors] = useState({ email: []});
  const [responseError, setResponseError] = useState('');

  const onChange = (e) => {
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
      } else if (response && response.message){
        setResponseError(response.message);
      }

      setButtonStatus(true);
    });
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
    navigateTo('/auth/login');
  };

  const isValidationSuccessful = () => {
    const { email } = formValues;
    let errors = {email: []};

    // email validations
    if (!email) {
      errors.email.push('Email is required.');
    } else if (email.indexOf('@') === -1) {
      errors.email.push(`The email must contain a '@' to be valid.`);
    }

    setFormErrors(errors);

    //true if no errors were found, otherwise, false
    return errors.email.length === 0;
  };

  return (
    <section className={styles['main-section']}>
      <form
        id="forgotPassword-form"
        onSubmit={userForgotPassword}
        className={styles['main-form']}
      >
        <h1 className={styles['form-title']}>Forgot Password</h1>
        
        {/* EMAIL */}
        <AuthFormInput
          {...emailValues}
          errors={formErrors.email}
          value={formValues['email']}
          onChange={onChange}
        />

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          id="forgot-password"
          className={
            isButtonEnabled
              ? styles['submit-btn']
              : styles['submit-btn-disabled']
          }
        >
          Send Email
        </button>

        {responseError && (
          <span className={styles['response-error-text']}>{responseError}</span>
        )}
      </form>

      {/* Email sent confirmation modal */}
      <OkConfirmationModal
        isModalOpen={isConfirmationModalOpen}
        closeModal={closeConfirmationModal}
        message="A link to reset your password was sent to your email."
      />
    </section>
  );
};

export default ForgotPassword_old;
