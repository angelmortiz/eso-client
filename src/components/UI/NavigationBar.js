import classes from './NavigationBar.module.css';
import { Link } from "react-router-dom";

const NavigationBar = props => {
    return <header>
    <nav className={classes['nav-bar']}>
        <Link to="/" className="logo-link">
            <img src= "/logo.png" className={classes['logo-img']} alt="Logo"/>
        </Link>
        <ul className={classes['ul-nav-options']}>
            {/* NUTRITION */}
            <li className={classes['dropdown']}>
                <span> Nutrition </span>
                <div className={classes['dropdown-content']}>
                    <ul className={classes['ul-dropdown-options']}>
                        {/* FOODS */}
                        <li className={classes['li-dropdown-option']}> 
                            <Link to='/nutrition/foods' className={classes['nav-links']}>Foods</Link>
                        </li>
                        {/* RECIPES */}
                        <li className={classes['li-dropdown-option']}>
                            <Link to='/nutrition/recipes' className={classes['nav-links']}>Recipes</Link>
                        </li>
                        {/* DIETS */}
                        <li className={classes['li-dropdown-option']}>
                            <Link to='/nutrition/diets' className={classes['nav-links']}>Diets</Link>
                        </li>
                        {/* CHRONIC CONDITIONS */}
                        <li className={classes['li-dropdown-option']}>
                            <Link to='/nutrition/chronicconditions' className={classes['nav-links']}>Chronic Conditions</Link>
                        </li>
                    </ul>
                </div>
            </li>

            {/* ACTIVITIES */}
            <li className={classes['dropdown']}>
                <span> Activities </span>
                <div className={classes['dropdown-content']}>
                    <ul className={classes['ul-dropdown-options']}>
                        {/* EXERCISES */}
                        <li className={classes['li-dropdown-option']}> 
                            <Link to='/activities/exercises' className={classes['nav-links']}>Exercises</Link>
                        </li>
                        {/* MUSCLES */}
                        <li className={classes['li-dropdown-option']}>
                            <Link to='/activities/muscles' className={classes['nav-links']}>Muscles</Link>
                        </li>
                        {/* EQUIPMENTS */}
                        <li className={classes['li-dropdown-option']}>
                            <Link to='/activities/equipments' className={classes['nav-links']}>Equipments</Link>
                        </li>
                        {/* PHYSICAL CONDITIONS */}
                        <li className={classes['li-dropdown-option']}>
                            <Link to='/activities/physicalconditions' className={classes['nav-links']}>Physical Conditions</Link>
                        </li>
                    </ul>
                </div>
            </li>

            {/* ADD NEW */}
            <li className={classes['dropdown']}>
                <span> Add New </span>
                <div className={classes['dropdown-content']}>
                    <ul className={classes['ul-dropdown-options']}>
                        {/* FOODS */}
                        <li className={classes['li-dropdown-option']}> 
                            <Link to='/nutrition/add-food' className={classes['nav-links']}>Food</Link>
                        </li>
                        {/* RECIPES */}
                        <li className={classes['li-dropdown-option']}>
                            <Link to='/nutrition/recipes' className={classes['nav-links']}>Recipe</Link>
                        </li>
                        {/* DIETS */}
                        <li className={classes['li-dropdown-option']}>
                            <Link to='/nutrition/diets' className={classes['nav-links']}>Diet</Link>
                        </li>
                        {/* CHRONIC CONDITIONS */}
                        <li className={classes['li-dropdown-option']}>
                            <Link to='/nutrition/chronicconditions' className={classes['nav-links']}>Chronic Condition</Link>
                        </li>
                        {/* EXERCISES */}
                        <li className={classes['li-dropdown-option']}> 
                            <Link to='/activities/add-exercise' className={classes['nav-links']}>Exercise</Link>
                        </li>
                        {/* MUSCLES */}
                        <li className={classes['li-dropdown-option']}>
                            <Link to='/activities/muscles' className={classes['nav-links']}>Muscle</Link>
                        </li>
                        {/* EQUIPMENTS */}
                        <li className={classes['li-dropdown-option']}>
                            <Link to='/activities/equipments' className={classes['nav-links']}>Equipment</Link>
                        </li>
                        {/* PHYSICAL CONDITIONS */}
                        <li className={classes['li-dropdown-option']}>
                            <Link to='/activities/physicalconditions' className={classes['nav-links']}>Physical Condition</Link>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </nav>
    </header>
}

export default NavigationBar;