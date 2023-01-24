import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../../store/authSlice';
import { userActions } from '../../store/userSlice';
import { login } from '../../util/apis/auth/authApis';
import { fetchCurrentUser } from '../../util/apis/users/usersApis';
import classes from '../UI/General/CSS/Form.module.css';
import FormInput from '../UI/Inputs/FormInput';

const inputValues = {
  email: {
    name: 'email',
    label: 'Email',
    type: 'text',
    id: 'email',
    placeholder: 'Enter an email',
  },
  password: {
    name: 'password',
    label: 'Password',
    type: 'password',
    id: 'password',
    placeholder: 'Enter a password'
  },
};

const Login = (props) => {
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({ email: [], password: [] });
  const [responseError, setResponseError] = useState('');
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

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
      navigateTo('/activities/exercises');
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
      errors.email.push('Email is required.');
    } else if (email.indexOf('@') === -1) {
      errors.email.push(`The email must contain a '@' to be valid.`);
    }

    //password validations
    if (!password) {
      errors.password.push('Password is required.');
    }
    setFormErrors(errors);

    //true if no errors were found, otherwise, false
    return errors.email.length === 0 && errors.password.length === 0;
  };

  return (
    <section className={classes['main-section']}>
      <form
        id="login-form"
        onSubmit={loginUser}
        className={classes['main-form']}
      >
        <h1 className={classes['form-title']}>Login</h1>

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

        {/* SUBMIT BUTTON */}
        <button type="submit" id="login-user" className={classes['submit-btn']}>
          Login
        </button>

        {responseError && (
          <span className={classes['response-error-text']}>{responseError}</span>
        )}
      </form>

      <Link to="/auth/forgotPassword" className={classes['forgot-password']}>
        Forgot Password
      </Link>

      {/* Division line */}
      <div className={classes['division']}>
        <hr className={classes['horizontal-division']} />
        &nbsp;&nbsp;or&nbsp;&nbsp;
        <hr className={classes['horizontal-division']} />
      </div>
      <Link to="/auth/signup" className={classes['submit-btn']}>
        Sign Up
      </Link>
    </section>
  );
};

export default Login;
