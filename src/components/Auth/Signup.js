import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../../util/apis/auth/authApis';
import AuthFormInput from '../UI/Inputs/AuthFormInput';

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
  phone: {
    name: 'phone_number',
    label: 'Phone number',
    type: 'tel',
    id: 'phone_number',
    placeholder: 'Enter a phone number',
    pattern: "[0-9]{3}-[0-9]{2}-[0-9]{3}"
  },
  password: {
    name: 'password',
    label: 'New password',
    type: 'password',
    id: 'newPassword',
    placeholder: 'Enter a password',
    pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/,
  },
  passwordConfirmation: {
    name: 'passwordConfirmation',
    label: 'Confirm password',
    type: 'password',
    id: 'passwordConfirmation',
    placeholder: 'Re-enter the same password',
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

  const signupUser = (e) => {
    e.preventDefault();

    if (!isValidationSuccessful()) return;

    signup(formValues).then((response) => {
      //console.log('Response: ', response);
      if (response && response.isSuccess) {
        navigateTo('/auth/login');
      } else if (response && response.message) {
        setResponseError(response.message);
      }
    });
  };

  const isValidationSuccessful = () => {
    const { firstName, lastName, email, password, passwordConfirmation } =
      formValues;
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
    <div className="flex flex-col min-h-full justify-center py-6 sm:px-6 sm:py-12 lg:px-8">
      {/* LOGO AND SIGN UP LABEL */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="hidden sm:block mx-auto h-14 w-auto"
          src="/icon-logo.png"
          alt="Your Company"
        />
        <h1 className="mt-2 text-center text-4xl font-bold tracking-tight text-gray-700">
          Welcome!
        </h1>
        <h2 className="mt-4 text-center text-2xl font-semibold tracking-tight text-gray-700">
          Create a new account
        </h2>
      </div>

      {/* LOG IN CARD */}
      <div className="mt-6 m-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 rounded-lg shadow sm:px-10">
          <form
            className="flex flex-col gap-5"
            id="login-form"
            onSubmit={signupUser}
          >
            {/* FIRST NAME */}
            <AuthFormInput
              {...inputValues.firstName}
              errors={formErrors.firstName}
              value={formValues['firstName']}
              onChange={onChange}
            />
            {/* LAST NAME */}
            <AuthFormInput
              {...inputValues.lastName}
              errors={formErrors.lastName}
              value={formValues['lastName']}
              onChange={onChange}
            />
            {/* EMAIL */}
            <AuthFormInput
              {...inputValues.email}
              errors={formErrors.email}
              value={formValues['email']}
              onChange={onChange}
            />
            {/* PASSWORD */}
            <AuthFormInput
              {...inputValues.password}
              errors={formErrors.password}
              value={formValues['password']}
              onChange={onChange}
            />
            {/* PASSWORD CONFIRMATION */}
            <AuthFormInput
              {...inputValues.passwordConfirmation}
              errors={formErrors.passwordConfirmation}
              value={formValues['passwordConfirmation']}
              onChange={onChange}
            />

            <button
              type="submit"
              id="login-user"
              className="flex w-full justify-center mt-2 rounded-md bg-cyan-700 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-cyan-600"
            >
              Sign up
            </button>
            {responseError && (
              <span className="mt-1 text-red-800">{responseError}</span>
            )}
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or</span>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-gray-600">
                Do you have an account? Log in{' '}
                <Link
                  to="/auth/login"
                  className="text-cyan-700 underline hover:text-cyan-600"
                >
                  here
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
