import { Link } from "react-router-dom";
import { login } from '../../util/apis/auth/authApis';
import classes from '../Health/General/CSS/Form.module.css'

const Login = props => {
    const loginUser = (event) => {
        event.preventDefault();
        const formVals = getValuesFromForm(event.target.elements);

        console.log('formVals: ', formVals);
        login(formVals).then(response => {
            console.log("Response: ", response);
        });
    };

    const getValuesFromForm = (elements) => {
        const values = {};
        values.email = elements.email.value;
        values.password = elements.password.value;
        return values;
    };

    return <section className={classes['main-section']}>
        <form id="login-form" onSubmit={loginUser} className={classes['main-form']}>
            <h1 className={classes['form-title']}>Login</h1>

            {/* EMAIL */}
            <label htmlFor="email" className={classes['text-label']}>Email:</label>
            <input type="email" id="email" name="email"
                placeholder='Enter email' className={classes['select-input']}/>
            
            {/* PASSWORD */}
            <label htmlFor="password" className={classes['text-label']}>Password:</label>
            <input type="password" id="password" name="password"
                placeholder='Enter password'className={classes['select-input']} />
            
            {/* SUBMIT BUTTON */}
            <button type="submit" id="login-user" className={classes['submit-btn']}>Login</button>
        </form>

        <Link to='/auth/forgotPassword' className={classes['forgot-password']}>Forgot Password</Link>
        
        {/* Division line */}
        <div className={classes['division']}>
            <hr className={classes['horizontal-division']}/>
            &nbsp;&nbsp;or&nbsp;&nbsp;
            <hr className={classes['horizontal-division']}/>
        </div>
        <Link to='/auth/signup' className={classes['submit-btn']}>Sign Up</Link>
    </section>
}

export default Login;