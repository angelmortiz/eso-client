import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../util/apis/auth/authApis';
import classes from '../Health/General/CSS/Form.module.css';
import FormInput from '../Health/General/Inputs/FormInput';
import OkConfirmationModal from '../Health/General/Popups/SimpleMessage/OkConfirmationModal';

const emailValues = {
  name: 'email',
  label: 'Email',
  type: 'text',
  id: 'email',
  placeholder: 'Enter an email',
};

const ForgotPassword = (props) => {
  const navigateTo = useNavigate();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isButtonEnabled, setButtonStatus] = useState(true);
  const [formValues, setFormValues] = useState({ email: '' });
  const [formErrors, setFormErrors] = useState({ email: []});
  const [responseError, setResponseError] = useState('');

  const onChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const userForgotPassword = (event) => {
    event.preventDefault();

    if (!isValidationSuccessful()) return;

    setButtonStatus(false);
    forgotPassword(formValues).then((response) => {
      console.log('Response: ', response);
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
    <section className={classes['main-section']}>
      <form
        id="forgotPassword-form"
        onSubmit={userForgotPassword}
        className={classes['main-form']}
      >
        <h1 className={classes['form-title']}>Forgot Password</h1>
        
        {/* EMAIL */}
        <FormInput
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
              ? classes['submit-btn']
              : classes['submit-btn-disabled']
          }
        >
          Send Email
        </button>

        {responseError && (
          <span className={classes['response-error-text']}>{responseError}</span>
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

export default ForgotPassword;
