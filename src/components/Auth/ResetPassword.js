import { resetPassword } from '../../util/apis/auth/authApis';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classes from '../Health/General/CSS/Form.module.css';
import OkConfirmationModal from '../Health/General/Popups/SimpleMessage/OkConfirmationModal';

const ResetPassword = props => {
    const navigateTo = useNavigate();
    const [resetToken, setResetToken] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [isButtonEnabled, setButtonStatus] = useState(true);

    useEffect(() => {
        extractTokenFromUrl();
    });

    const extractTokenFromUrl = () => {
        const token = searchParams.get('token');
        if (!token) {
            if (!resetToken) {
                console.error("Error: reset token not available.");
                navigateTo('/auth/login');
            }
            return;
        }

        searchParams.delete('token');
        setResetToken(token);
        setSearchParams(searchParams);
    }

    const userResetPassword = (event) => {
        event.preventDefault();
        setButtonStatus(false);

        const password = event.target.elements.password.value;
        const passwordConfirmation = event.target.elements.passwordConfirmation.value;
        const body = {
            password, passwordConfirmation, resetToken
        }

        resetPassword(body).then(response => {
            console.log("Response: ", response);
            if (response &&  response.isSuccess) {
                setIsConfirmationModalOpen(true);
            }
            setButtonStatus(true);
        });
    };

    const closeConfirmationModal = () => {
        setIsConfirmationModalOpen(false);
        navigateTo('/auth/login');
    }

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
            <button type="submit" id="reset-password" 
            className={isButtonEnabled ? classes['submit-btn'] : classes['submit-btn-disabled']}>
                Reset Password
            </button>
        </form>

        {/* Password reset confirmation modal */}
        <OkConfirmationModal isModalOpen={isConfirmationModalOpen} closeModal={closeConfirmationModal}
            message='Password has been reset successfully. Please login.'/>
    </section>
};

export default ResetPassword;