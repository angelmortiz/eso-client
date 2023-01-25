import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from './Home.module.css';

const Home = props => {
    const isUserAuthenticated = useSelector(state => state.auth.isUserAuthenticated);

    return <section className={styles['main-section']}>
        <h1 className={styles['welcome-title']}>Welcome to En Salud Óptima!</h1>
        {!isUserAuthenticated && <Link to='/auth/login'><h2>Please login</h2></Link>}
    </section>

};

export default Home;