import styles from './NavigationBar.module.css';

function NavigationBar() {
    return <nav className={styles['nav-bar']}>
        <a href="/" className="logo-link">
            <img src= "logo.png" className={styles['logo-img']} alt="En Optima Salud official logo"></img>
        </a>
        <ul className={styles['ul-nav-options']}>
            {/* NUTRITION */}
            <li className={styles['dropdown']}>
                <span> Nutrition </span>
                <div className={styles['dropdown-content']}>
                    <ul className={styles['ul-dropdown-options']}>
                        {/* FOODS */}
                        <li className={styles['li-dropdown-option']}> 
                            <a href='/foods' className={styles['nav-links']}> Foods </a>
                        </li>
                        {/* RECIPES */}
                        <li className={styles['li-dropdown-option']}>
                            <a href='/recipes' className={styles['nav-links']}> Recipes </a> 
                        </li>
                        {/* DIETS */}
                        <li className={styles['li-dropdown-option']}>
                            <a href='/diets' className={styles['nav-links']}> Diets </a>
                        </li>
                        {/* CHRONIC CONDITIONS */}
                        <li className={styles['li-dropdown-option']}>
                            <a href='/chronicconditions' className={styles['nav-links']}> Chronic Conditions </a>
                        </li>
                    </ul>
                </div>
            </li>

            {/* ACTIVITIES */}
            <li className={styles['dropdown']}>
                <span> Activities </span>
                <div className={styles['dropdown-content']}>
                    <ul className={styles['ul-dropdown-options']}>
                        {/* EXERCISES */}
                        <li className={styles['li-dropdown-option']}> 
                            <a href='/exercises' className={styles['nav-links']}> Exercises </a>
                        </li>
                        {/* MUSCLES */}
                        <li className={styles['li-dropdown-option']}>
                            <a href='/muscles' className={styles['nav-links']}> Muscles </a> 
                        </li>
                        {/* EQUIPMENTS */}
                        <li className={styles['li-dropdown-option']}>
                            <a href='/equipments' className={styles['nav-links']}> Equipments </a>
                        </li>
                        {/* PHYSICAL CONDITIONS */}
                        <li className={styles['li-dropdown-option']}>
                            <a href='/physicalconditions' className={styles['nav-links']}> Physical Conditions </a>
                        </li>
                    </ul>
                </div>
            </li>

            {/* ADD NEW */}
            <li className={styles['dropdown']}>
                <span> Add New </span>
                <div className={styles['dropdown-content']}>
                    <ul className={styles['ul-dropdown-options']}>
                        {/* FOODS */}
                        <li className={styles['li-dropdown-option']}> 
                            <a href='/addfood' className={styles['nav-links']}> Add Food </a>
                        </li>
                        {/* RECIPES */}
                        <li className={styles['li-dropdown-option']}>
                            <a href='/addrecipe' className={styles['nav-links']}> Add Recipe </a> 
                        </li>
                        {/* DIETS */}
                        <li className={styles['li-dropdown-option']}>
                            <a href='/adddiet' className={styles['nav-links']}> Add Diet </a>
                        </li>
                        {/* CHRONIC CONDITIONS */}
                        <li className={styles['li-dropdown-option']}>
                            <a href='/addchroniccondition' className={styles['nav-links']}> Add Chronic Condition </a>
                        </li>
                        {/* EXERCISES */}
                        <li className={styles['li-dropdown-option']}> 
                            <a href='/addexercise' className={styles['nav-links']}> Add Exercise </a>
                        </li>
                        {/* MUSCLES */}
                        <li className={styles['li-dropdown-option']}>
                            <a href='/addmuscle' className={styles['nav-links']}> Add Muscle </a> 
                        </li>
                        {/* EQUIPMENTS */}
                        <li className={styles['li-dropdown-option']}>
                            <a href='/addequipment' className={styles['nav-links']}> Add Equipment </a>
                        </li>
                        {/* PHYSICAL CONDITIONS */}
                        <li className={styles['li-dropdown-option']}>
                            <a href='/addphysicalcondition' className={styles['nav-links']}> Add Physical Condition </a>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </nav>
}

export default NavigationBar;