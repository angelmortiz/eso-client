import { Link } from "react-router-dom";
import classes from './HomePage.module.css';

const HomePage = props => {
return <section className={classes['main-section']}>
    <h1 className={classes['welcome-title']}>Welcome to En Salud Óptima!</h1>
    {/* //TODO: Only show link if user is not logged in*/}
    <Link to='/auth/login'><h2>Please login</h2></Link>
</section>

};

export default HomePage;