import { changePassword } from '../../util/apis/auth/authApis';
import classes from '../Health/General/CSS/Form.module.css';

const userChangePassword = (event) =>  {
    event.preventDefault();
    const formVals = getValuesFromForm(event.target.elements);

    changePassword(formVals).then(response => {
        console.log("Response: ", response);
    });
};

const getValuesFromForm = (elements) => {
    const values = {};
    values.currentPassword = elements.currentPassword.value;
    values.newPassword = elements.password.value;
    values.passwordConfirmation = elements.passwordConfirmation.value;
    return values;
};

const ChangePassword = props => {
    return <section className={classes['main-section']}>
        <form id="changePassword-form" onSubmit={userChangePassword} className={classes['main-form']}>
            <h1 className={classes['form-title']}>Change Password</h1>

            {/* CURRENT PASSWORD */}
            <label htmlFor="current-password" className={classes['text-label']}>Current password:</label>
            <input type="password" id="current-password" name="currentPassword"
                placeholder='Enter current password'className={classes['select-input']} />


            {/* PASSWORD */}
            <label htmlFor="password" className={classes['text-label']}>New password:</label>
            <input type="password" id="password" name="password"
                placeholder='Enter new password'className={classes['select-input']} />

            {/* PASSWORD CONFIRMATION */}
            <label htmlFor="passwordConfirmation" className={classes['text-label']}>Confirm password:</label>
            <input type="password" id="passwordConfirmation" name="passwordConfirmation"
                placeholder='Re-enter new password'className={classes['select-input']} />
            
            {/* SUBMIT BUTTON */}
            <button type="submit" id="change-password" className={classes['submit-btn']}>Change Password</button>
        </form>
    </section>

}

export default ChangePassword;