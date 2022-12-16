
import classes from '../Health/General/CSS/Form.module.css'

const Signup = props => {

    const signupUser = (event) => {
        event.preventDefault();
        //TODO: add logic to signup the user
    }

    return <section className={classes['main-section']}>
        <form id="signup-form" onSubmit={signupUser} className={classes['main-form']}>
            <h1 className={classes['form-title']}>Sign Up</h1>
            
            {/* FIRST NAME */}
            <label htmlFor="text" className={classes['text-label']}>First name:</label>
            <input type="text" id="firstName" name="firstName"
                placeholder='Enter your first name' className={classes['select-input']}/>

            {/* LAST NAME */}
            <label htmlFor="text" className={classes['text-label']}>Last name:</label>
            <input type="text" id="lastName" name="lastName"
                placeholder='Enter your last name' className={classes['select-input']}/>

            {/* EMAIL */}
            <label htmlFor="email" className={classes['text-label']}>Email:</label>
            <input type="email" id="email" name="email"
                placeholder='Enter email' className={classes['select-input']}/>
            
            {/* PASSWORD */}
            <label htmlFor="password" className={classes['text-label']}>Password:</label>
            <input type="password" id="password" name="password"
                placeholder='Enter password'className={classes['select-input']} />

            {/* PASSWORD CONFIRMATION */}
            <label htmlFor="passwordConfirmation" className={classes['text-label']}>Confirm password:</label>
            <input type="password" id="passwordConfirmation" name="passwordConfirmation"
                placeholder='Re-enter password'className={classes['select-input']} />
            
            {/* SUBMIT BUTTON */}
            <button type="submit" id="signup-user" className={classes['submit-btn']}>Signup</button>
        </form>
    </section>
}

export default Signup;