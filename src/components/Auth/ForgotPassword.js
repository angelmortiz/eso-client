import { forgotPassword } from '../../util/apis/auth/authApis';
import classes from '../Health/General/CSS/Form.module.css';

const ForgotPassword = props => {

    const userForgotPassword = (event) => {
        event.preventDefault();

        const email = event.target.elements.email.value;
        forgotPassword({email}).then(response => {
            console.log("Response: ", response);
        });
    };

    return <section className={classes['main-section']}>
        <form id="forgotPassword-form" onSubmit={userForgotPassword} className={classes['main-form']}>
            <h1 className={classes['form-title']}>Forgot Password</h1>

            {/* EMAIL */}
            <label htmlFor="email" className={classes['text-label']}>Email:</label>
            <input type="email" id="email" name="email"
                placeholder='Enter email' className={classes['select-input']}/>
            
            {/* SUBMIT BUTTON */}
            <button type="submit" id="forgot-password" className={classes['submit-btn']}>Send Email</button>
        </form>
    </section>
};

export default ForgotPassword;