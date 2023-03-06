import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './NavigationBar.module.css';

const NavigationBar = (props) => {
  const isUserAuthenticated = useSelector(
    (state) => state.auth.isUserAuthenticated
  );
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentUserInfo = useSelector((state) => state.userInfo.userInfo);

  const mobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header>
      <nav className={styles['nav-bar']}>
        <Link to="/" className={styles['logo-link']} onClick={closeMobileMenu}>
          <img src="/logo.png" className={styles['logo-img']} alt="Logo" />
        </Link>
        <div
          className={`${styles['menu-items']} ${
            isMobileMenuOpen ? '' : styles.hidden
          }`}
          onClick={closeMobileMenu}
        >
          <ul className={styles['ul-nav-options']}>
            {/* MY PROGRAMS  */}
            {isUserAuthenticated && (
              <li key="my-programs" className={styles['dropdown']}>
                <span> My Programs </span>
                <div className={styles['dropdown-content']}>
                  <ul className={styles['ul-dropdown-options']}>
                    <li
                      key="assigned-programs"
                      className={styles['li-dropdown-option']}
                    >
                      <Link
                        to="/activities/programplan/assigned"
                        className={styles['nav-links']}
                      >
                        Assigned
                      </Link>
                    </li>
                    <li
                      key="programs-plan"
                      className={styles['li-dropdown-option']}
                    >
                      <Link
                        to="/activities/programplan/completed"
                        className={styles['nav-links']}
                      >
                        Completed
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            )}

            {/* NUTRITION */}
            {/* <li key="nutrition"className={styles['dropdown']}>
                    <span> Nutrition </span>
                    <div className={styles['dropdown-content']}>
                        <ul className={styles['ul-dropdown-options']}>
                            <li key="foods"className={styles['li-dropdown-option']}> 
                                <Link to='/nutrition/foods' className={styles['nav-links']}>Foods</Link>
                            </li>
                            <li key="recipes"className={styles['li-dropdown-option']}>
                                <Link to='/nutrition/recipes' className={styles['nav-links']}>Recipes</Link>
                            </li>
                            <li key="diets"className={styles['li-dropdown-option']}>
                                <Link to='/nutrition/diets' className={styles['nav-links']}>Diets</Link>
                            </li>
                            <li key="chronicConditions"className={styles['li-dropdown-option']}>
                                <Link to='/nutrition/chronicconditions' className={styles['nav-links']}>Chronic Conditions</Link>
                            </li>
                        </ul>
                    </div>
                </li> */}

            {/* ACTIVITIES */}
            <li key="activities" className={styles['dropdown']}>
              <span> Activities </span>
              <div className={styles['dropdown-content']}>
                <ul className={styles['ul-dropdown-options']}>
                  {/* PROGRAMS */}
                  <li key="programs" className={styles['li-dropdown-option']}>
                    <Link
                      to="/activities/programs"
                      className={styles['nav-links']}
                    >
                      Programs
                    </Link>
                  </li>
                  {/* WORKOUTS */}
                  <li key="workouts" className={styles['li-dropdown-option']}>
                    <Link
                      to="/activities/workouts"
                      className={styles['nav-links']}
                    >
                      Workouts
                    </Link>
                  </li>
                  {/* EXERCISES */}
                  <li key="exercises" className={styles['li-dropdown-option']}>
                    <Link
                      to="/activities/exercises"
                      className={styles['nav-links']}
                    >
                      Exercises
                    </Link>
                  </li>
                  {/* MUSCLES */}
                  <li key="muscles" className={styles['li-dropdown-option']}>
                    <Link
                      to="/activities/muscles"
                      className={styles['nav-links']}
                    >
                      Muscles
                    </Link>
                  </li>
                  {/* EQUIPMENTS */}
                  <li key="equipments" className={styles['li-dropdown-option']}>
                    <Link
                      to="/activities/equipments"
                      className={styles['nav-links']}
                    >
                      Equipments
                    </Link>
                  </li>
                  {/* PHYSICAL CONDITIONS */}
                  {/* <li key="physicalConditions" className={styles['li-dropdown-option']}>
                                <Link to='/activities/physicalconditions' className={styles['nav-links']}>Physical Conditions</Link>
                            </li> */}
                </ul>
              </div>
            </li>

            {/* ADD NEW */}
            {/* Only available for Admin and editor users */}
            {isUserAuthenticated &&
              (currentUserInfo.role === 'Admin' ||
                currentUserInfo.role === 'editor') && (
                <li key="addNew" className={styles['dropdown']}>
                  <span> Add New </span>
                  <div className={styles['dropdown-content']}>
                    <ul className={styles['ul-dropdown-options']}>
                      {/* <li key="addFoods"className={styles['li-dropdown-option']}> 
                                <Link to='/nutrition/add-food' className={styles['nav-links']}>Food</Link>
                            </li>
                            <li key="addRecipes"className={styles['li-dropdown-option']}>
                                <Link to='/nutrition/add-recipe' className={styles['nav-links']}>Recipe</Link>
                            </li>
                            <li key="addDiets"className={styles['li-dropdown-option']}>
                                <Link to='/nutrition/add-diet' className={styles['nav-links']}>Diet</Link>
                            </li>
                            <li key="addChronicConditions"className={styles['li-dropdown-option']}>
                                <Link to='/nutrition/add-chronicConditions' className={styles['nav-links']}>Chronic Condition</Link>
                            </li> */}
                      <li
                        key="addPrograms"
                        className={styles['li-dropdown-option']}
                      >
                        <Link
                          to="/activities/add-program"
                          className={styles['nav-links']}
                        >
                          Program
                        </Link>
                      </li>
                      <li
                        key="addWorkouts"
                        className={styles['li-dropdown-option']}
                      >
                        <Link
                          to="/activities/add-workout"
                          className={styles['nav-links']}
                        >
                          Workout
                        </Link>
                      </li>
                      <li
                        key="addExercises"
                        className={styles['li-dropdown-option']}
                      >
                        <Link
                          to="/activities/add-exercise"
                          className={styles['nav-links']}
                        >
                          Exercise
                        </Link>
                      </li>
                      <li
                        key="addMuscles"
                        className={styles['li-dropdown-option']}
                      >
                        <Link
                          to="/activities/add-muscle"
                          className={styles['nav-links']}
                        >
                          Muscle
                        </Link>
                      </li>
                      <li
                        key="addEquipments"
                        className={styles['li-dropdown-option']}
                      >
                        <Link
                          to="/activities/add-equipment"
                          className={styles['nav-links']}
                        >
                          Equipment
                        </Link>
                      </li>
                      {/* <li key="addPhysicalConditions" className={styles['li-dropdown-option']}>
                                <Link to='/activities/add-physicalCondition' className={styles['nav-links']}>Physical Condition</Link>
                            </li> */}
                    </ul>
                  </div>
                </li>
              )}

            {/* ASSIGN  */}
            {/* Only available for Admin and editor users */}
            {isUserAuthenticated &&
              (currentUserInfo.role === 'Admin' ||
                currentUserInfo.role === 'editor') && (
                <li key="assign" className={styles['dropdown']}>
                  <span> Assign </span>
                  <div className={styles['dropdown-content']}>
                    <ul className={styles['ul-dropdown-options']}>
                      <li
                        key="assignProgram"
                        className={styles['li-dropdown-option']}
                      >
                        <Link
                          to="/activities/programplan/assign"
                          className={styles['nav-links']}
                        >
                          Program
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              )}
          </ul>
          {/* //IMPROVE: Consider creating components login and user profile in NavBar */}
          {!isUserAuthenticated && (
            <div className={styles['registration-menu']}>
              <Link to="/auth/login">Login</Link>
              <span> | </span>
              <Link to="/auth/signup">Sign up</Link>
            </div>
          )}
          {isUserAuthenticated && (
            <Link to="/user/info" className={styles['user-account']}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles['avatar-icon']}
                viewBox="0 0 512 512"
              >
                <title>Avatar</title>
                <path d="M258.9 48C141.92 46.42 46.42 141.92 48 258.9c1.56 112.19 92.91 203.54 205.1 205.1 117 1.6 212.48-93.9 210.88-210.88C462.44 140.91 371.09 49.56 258.9 48zm126.42 327.25a4 4 0 01-6.14-.32 124.27 124.27 0 00-32.35-29.59C321.37 329 289.11 320 256 320s-65.37 9-90.83 25.34a124.24 124.24 0 00-32.35 29.58 4 4 0 01-6.14.32A175.32 175.32 0 0180 259c-1.63-97.31 78.22-178.76 175.57-179S432 158.81 432 256a175.32 175.32 0 01-46.68 119.25z" />
                <path d="M256 144c-19.72 0-37.55 7.39-50.22 20.82s-19 32-17.57 51.93C191.11 256 221.52 288 256 288s64.83-32 67.79-71.24c1.48-19.74-4.8-38.14-17.68-51.82C293.39 151.44 275.59 144 256 144z" />
              </svg>
              {currentUserInfo.firstName}
            </Link>
          )}
        </div>
        <div className={styles['menu-tray']} onClick={mobileMenuToggle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles['menu-icon']}
            viewBox="0 0 512 512"
          >
            <title>Menu</title>
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="32"
              d="M80 160h352M80 256h352M80 352h352"
            />
          </svg>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className={styles['menu-overlay']} onClick={closeMobileMenu}></div>
      )}
    </header>
  );
};

export default NavigationBar;
