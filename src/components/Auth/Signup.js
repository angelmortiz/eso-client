import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../../util/apis/auth/authApis';
import classes from '../Health/General/CSS/Form.module.css';
import FormInput from '../UI/Inputs/FormInput';

const inputValues = {
  firstName: {
    name: 'firstName',
    label: 'First name',
    type: 'text',
    id: 'firstName',
    placeholder: 'Enter your first name',
  },
  lastName: {
    name: 'lastName',
    label: 'Last name',
    type: 'text',
    id: 'lastName',
    placeholder: 'Enter your last name',
  },
  email: {
    name: 'email',
    label: 'Email',
    type: 'text',
    id: 'email',
    placeholder: 'Enter an email',
  },
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

const Signup = (props) => {
  const navigateTo = useNavigate();
  const [responseError, setResponseError] = useState('');
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  const [formErrors, setFormErrors] = useState({
    firstName: [],
    lastName: [],
    email: [],
    password: [],
    passwordConfirmation: [],
  });

  const onChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const signupUser = (event) => {
    event.preventDefault();

    if (!isValidationSuccessful()) return;

    signup(formValues).then((response) => {
      console.log('Response: ', response);
      if (response && response.isSuccess) {
        navigateTo('/auth/login');
      } else if (response && response.message) {
        setResponseError(response.message);
      }
    });
  };

  const isValidationSuccessful = () => {
    const { firstName, lastName, email, password, passwordConfirmation } = formValues;
    let errors = {
      firstName: [],
      lastName: [],
      email: [],
      password: [],
      passwordConfirmation: [],
    };

    //first name validations
    if (!firstName) {
      errors.firstName.push('First name is required.');
    }

    //last name validations
    if (!lastName) {
      errors.lastName.push('Last name is required.');
    }

    // email validations
    if (!email) {
      errors.email.push('Email is required.');
    } else if (email.indexOf('@') === -1) {
      errors.email.push(`The email must contain a '@' to be valid.`);
    }

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
    return (
      errors.firstName.length === 0 &&
      errors.lastName.length === 0 &&
      errors.email.length === 0 &&
      errors.password.length === 0 &&
      errors.passwordConfirmation.length === 0
    );
  };

  return (
    <section className={classes['main-section']}>
      <form
        id="signup-form"
        onSubmit={signupUser}
        className={classes['main-form']}
      >
        <h1 className={classes['form-title']}>Sign Up</h1>

        {/* FIRST NAME */}
        <FormInput
          {...inputValues.firstName}
          errors={formErrors.firstName}
          value={formValues['firstName']}
          onChange={onChange}
        />

        {/* LAST NAME */}
        <FormInput
          {...inputValues.lastName}
          errors={formErrors.lastName}
          value={formValues['lastName']}
          onChange={onChange}
        />

        {/* EMAIL */}
        <FormInput
          {...inputValues.email}
          errors={formErrors.email}
          value={formValues['email']}
          onChange={onChange}
        />

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
          id="signup-user"
          className={classes['submit-btn']}
        >
          Sign Up
        </button>

        {responseError && (
          <span className={classes['response-error-text']}>
            {responseError}
          </span>
        )}
      </form>

      {/* Division line */}
      <div className={classes['division']}>
        <hr className={classes['horizontal-division']} />
        &nbsp;&nbsp;or&nbsp;&nbsp;
        <hr className={classes['horizontal-division']} />
      </div>
      <Link to="/auth/login" className={classes['submit-btn']}>
        Login
      </Link>
    </section>
  );
};

export default Signup;
