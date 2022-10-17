import classes from './NavigationBar.module.css';
import { Link } from "react-router-dom";

const NavigationBar = props => {
    return <header>
    <nav className={classes['nav-bar']}>
        <a href="/" className="logo-link">
            <img src= "logo.png" className={classes['logo-img']} alt="En Optima Salud official logo"></img>
        </a>
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
                            <a href='/addfood' className={classes['nav-links']}> Add Food </a>
                        </li>
                        {/* RECIPES */}
                        <li className={classes['li-dropdown-option']}>
                            <a href='/addrecipe' className={classes['nav-links']}> Add Recipe </a> 
                        </li>
                        {/* DIETS */}
                        <li className={classes['li-dropdown-option']}>
                            <a href='/adddiet' className={classes['nav-links']}> Add Diet </a>
                        </li>
                        {/* CHRONIC CONDITIONS */}
                        <li className={classes['li-dropdown-option']}>
                            <a href='/addchroniccondition' className={classes['nav-links']}> Add Chronic Condition </a>
                        </li>
                        {/* EXERCISES */}
                        <li className={classes['li-dropdown-option']}> 
                            <a href='/addexercise' className={classes['nav-links']}> Add Exercise </a>
                        </li>
                        {/* MUSCLES */}
                        <li className={classes['li-dropdown-option']}>
                            <a href='/addmuscle' className={classes['nav-links']}> Add Muscle </a> 
                        </li>
                        {/* EQUIPMENTS */}
                        <li className={classes['li-dropdown-option']}>
                            <a href='/addequipment' className={classes['nav-links']}> Add Equipment </a>
                        </li>
                        {/* PHYSICAL CONDITIONS */}
                        <li className={classes['li-dropdown-option']}>
                            <a href='/addphysicalcondition' className={classes['nav-links']}> Add Physical Condition </a>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </nav>
    </header>
}

export default NavigationBar;