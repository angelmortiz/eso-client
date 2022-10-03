import styles from './NavigationBar.module.css';

function NavigationBar() {
    return <nav>
        <a href="/" className="logo-link">
            <img src= "logo.png" className={styles['logo-img']} alt="En Optima Salud official logo"></img>
        </a>
        <ul className={styles['ul']}>
            <a href="#"><li className={styles['li']}>Nutrition</li></a>
            <a href="#"><li className={styles['li']}>Activities</li></a>
        </ul>
    </nav>
}

export default NavigationBar;