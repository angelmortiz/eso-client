import { resetPassword } from '../../util/apis/auth/authApis';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classes from '../Health/General/CSS/Form.module.css';

const ResetPassword = props => {
    const navigateTo = useNavigate();
    const [resetToken, setResetToken] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    const isUserAuthenticated = useSelector(state => state.auth.isUserAuthenticated);

    useEffect(() => {
        //prevents logged user to login with another account before loggin out
        if (isUserAuthenticated) {
            navigateTo('/user/info');
            return;
        }
        extractTokenFromUrl();
    });

    const extractTokenFromUrl = () => {
        const token = searchParams.get('token');
        //IMPROVE: Show error if the token could not be found
        if (!token) return;

        searchParams.delete('token');
        setResetToken(token);
        setSearchParams(searchParams);
    }

    const userResetPassword = (event) => {
        event.preventDefault();

        const password = event.target.elements.password.value;
        const passwordConfirmation = event.target.elements.passwordConfirmation.value;
        const body = {
            password, passwordConfirmation, resetToken
        }

        resetPassword(body).then(response => {
            console.log("Response: ", response);
        });
    };

    return <section className={classes['main-section']}>
        <form id="resetPassword-form" onSubmit={userResetPassword} className={classes['main-form']}>
            <h1 className={classes['form-title']}>Reset Password</h1>

            {/* PASSWORD */}
            <label htmlFor="password" className={classes['text-label']}>New password:</label>
            <input type="password" id="password" name="password"
                placeholder='Enter password'className={classes['select-input']} />

            {/* PASSWORD CONFIRMATION */}
            <label htmlFor="passwordConfirmation" className={classes['text-label']}>Confirm password:</label>
            <input type="password" id="passwordConfirmation" name="passwordConfirmation"
                placeholder='Re-enter password'className={classes['select-input']} />
            
            {/* SUBMIT BUTTON */}
            <button type="submit" id="reset-password" className={classes['submit-btn']}>Reset Password</button>
        </form>
    </section>
};

export default ResetPassword;