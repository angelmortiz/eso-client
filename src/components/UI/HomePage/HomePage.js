import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classes from './HomePage.module.css';

const HomePage = props => {
    const isUserAuthenticated = useSelector(state => state.auth.isUserAuthenticated);

    return <section className={classes['main-section']}>
        <h1 className={classes['welcome-title']}>Welcome to En Salud Óptima!</h1>
        {!isUserAuthenticated && <Link to='/auth/login'><h2>Please login</h2></Link>}
    </section>

};

export default HomePage;