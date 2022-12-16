import classes from './NavigationBar.module.css';
import { Link } from "react-router-dom";
import { useState } from 'react';

const NavigationBar = props => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const mobileMenuToggle = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    }

    return <header>
    <nav className={classes['nav-bar']}>
        <Link to="/" className={classes['logo-link']} onClick={closeMobileMenu}>
            <img src= "/logo.png" className={classes['logo-img']} alt="Logo"/>
        </Link>
        <div className={`${classes['menu-items']} ${isMobileMenuOpen ? '' : classes.hidden}`} onClick={closeMobileMenu}>
            <ul className={classes['ul-nav-options']}>
                {/* NUTRITION */}
                {/* <li key="nutrition"className={classes['dropdown']}>
                    <span> Nutrition </span>
                    <div className={classes['dropdown-content']}>
                        <ul className={classes['ul-dropdown-options']}>
                            <li key="foods"className={classes['li-dropdown-option']}> 
                                <Link to='/nutrition/foods' className={classes['nav-links']}>Foods</Link>
                            </li>
                            <li key="recipes"className={classes['li-dropdown-option']}>
                                <Link to='/nutrition/recipes' className={classes['nav-links']}>Recipes</Link>
                            </li>
                            <li key="diets"className={classes['li-dropdown-option']}>
                                <Link to='/nutrition/diets' className={classes['nav-links']}>Diets</Link>
                            </li>
                            <li key="chronicConditions"className={classes['li-dropdown-option']}>
                                <Link to='/nutrition/chronicconditions' className={classes['nav-links']}>Chronic Conditions</Link>
                            </li>
                        </ul>
                    </div>
                </li> */}

                {/* ACTIVITIES */}
                <li key="activities"className={classes['dropdown']}>
                    <span> Activities </span>
                    <div className={classes['dropdown-content']}>
                        <ul className={classes['ul-dropdown-options']}>
                            {/* EXERCISES */}
                            <li key="exercises" className={classes['li-dropdown-option']}> 
                                <Link to='/activities/exercises' className={classes['nav-links']}>Exercises</Link>
                            </li>
                            {/* MUSCLES */}
                            <li key="muscles" className={classes['li-dropdown-option']}>
                                <Link to='/activities/muscles' className={classes['nav-links']}>Muscles</Link>
                            </li>
                            {/* EQUIPMENTS */}
                            <li key="equipments" className={classes['li-dropdown-option']}>
                                <Link to='/activities/equipments' className={classes['nav-links']}>Equipments</Link>
                            </li>
                            {/* PHYSICAL CONDITIONS */}
                            <li key="physicalConditions" className={classes['li-dropdown-option']}>
                                <Link to='/activities/physicalconditions' className={classes['nav-links']}>Physical Conditions</Link>
                            </li>
                        </ul>
                    </div>
                </li>

                {/* ADD NEW */}
                <li key="addNew"className={classes['dropdown']}>
                    <span> Add New </span>
                    <div className={classes['dropdown-content']}>
                        <ul className={classes['ul-dropdown-options']}>
                            {/* <li key="addFoods"className={classes['li-dropdown-option']}> 
                                <Link to='/nutrition/add-food' className={classes['nav-links']}>Food</Link>
                            </li>
                            <li key="addRecipes"className={classes['li-dropdown-option']}>
                                <Link to='/nutrition/add-recipe' className={classes['nav-links']}>Recipe</Link>
                            </li>
                            <li key="addDiets"className={classes['li-dropdown-option']}>
                                <Link to='/nutrition/add-diet' className={classes['nav-links']}>Diet</Link>
                            </li>
                            <li key="addChronicConditions"className={classes['li-dropdown-option']}>
                                <Link to='/nutrition/add-chronicConditions' className={classes['nav-links']}>Chronic Condition</Link>
                            </li> */}
                            <li key="addExercises" className={classes['li-dropdown-option']}> 
                                <Link to='/activities/add-exercise' className={classes['nav-links']}>Exercise</Link>
                            </li>
                            <li key="addMuscles" className={classes['li-dropdown-option']}>
                                <Link to='/activities/add-muscle' className={classes['nav-links']}>Muscle</Link>
                            </li>
                            <li key="addEquipments" className={classes['li-dropdown-option']}>
                                <Link to='/activities/add-equipment' className={classes['nav-links']}>Equipment</Link>
                            </li>
                            <li key="addPhysicalConditions" className={classes['li-dropdown-option']}>
                                <Link to='/activities/add-physicalCondition' className={classes['nav-links']}>Physical Condition</Link>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
            <div className={classes['registration-menu']}>
                <Link to='/auth/login'>Login</Link>
                <span> | </span>
                <Link to='/auth/signup'>Sign up</Link>
            </div>
        </div>
        <div className={classes["menu-tray"]} onClick={mobileMenuToggle}>
            <svg xmlns="http://www.w3.org/2000/svg" className={classes["menu-icon"]} viewBox="0 0 512 512"><title>Menu</title><path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M80 160h352M80 256h352M80 352h352"/></svg>
        </div>

    </nav>

    {isMobileMenuOpen && <div className={classes['menu-overlay']} onClick={closeMobileMenu}></div>}
    </header>
}

export default NavigationBar;