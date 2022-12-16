import classes from '../Health/General/CSS/Form.module.css'

const Login = props => {
    const loginUser = (event) => {
        event.preventDefault();
        //TODO: add logic to login the user
    }

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
    </section>
}

export default Login;