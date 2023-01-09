import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../util/apis/auth/authApis';
import classes from '../Health/General/CSS/Form.module.css';
import OkConfirmationModal from '../Health/General/Popups/SimpleMessage/OkConfirmationModal';

const ForgotPassword = props => {
    const navigateTo = useNavigate();
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [isButtonEnabled, setButtonStatus] = useState(true);

    const userForgotPassword = (event) => {
        event.preventDefault();
        setButtonStatus(false);
        
        const email = event.target.elements.email.value;
        forgotPassword({email}).then(response => {
            console.log("Response: ", response);
            if (response && response.status === 'success') {
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
        <form id="forgotPassword-form" onSubmit={userForgotPassword} className={classes['main-form']}>
            <h1 className={classes['form-title']}>Forgot Password</h1>

            {/* EMAIL */}
            <label htmlFor="email" className={classes['text-label']}>Email:</label>
            <input type="email" id="email" name="email"
                placeholder='Enter email' className={classes['select-input']}/>
            
            {/* SUBMIT BUTTON */}
            <button type="submit" id="forgot-password" 
            className={isButtonEnabled ? classes['submit-btn'] : classes['submit-btn-disabled']}>
                Send Email
            </button>
        </form>

         {/* Email sent confirmation modal */}
         <OkConfirmationModal isModalOpen={isConfirmationModalOpen} closeModal={closeConfirmationModal}
            message='A link to reset your password was sent to your email.'/>
    </section>
};

export default ForgotPassword;