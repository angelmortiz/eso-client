import { useState } from 'react';
import styles from '../../../UI/General/CSS/Form.module.css';
import AddWorkoutPlan from './AddWorkoutPlan';

/** This component makes it possible to add new workouts to
 * the program by clicking the 'add' button.
 * This allows the user to add multiple options without the need
 * of knowing in advanced how  may elements should be added.
 */

/** //IMPROVE: Consider creating a more generic Incremental component
 * that can be reused for all incremental components in the add section.
 */
const IncrementalWorkoutPlan = (props) => {
  const { workoutsInfo } = props;
  const [count, setCount] = useState(1);
  const [workoutPlanList, setWorkoutPlanList] = useState([
    newWorkoutPlan(count),
  ]);

  const addWorkout = (e) => {
    e.preventDefault();
    //increases the count and adds a new dropdown to the DOM
    setCount((previousCount) => {
      const newCount = previousCount + 1;
      setWorkoutPlanList((s) => s.concat(newWorkoutPlan(newCount)));
      return newCount;
    });
  };

  function newWorkoutPlan(newCount, value = undefined) {
    return (
      <AddWorkoutPlan
        workouts={workoutsInfo}
        count={newCount}
        key={`workout-plan_${newCount}`}
        title={`Workout #${newCount}`}
      />
    );
  }

  return (
    <div className={styles['plan-list']}>
      {/* Displays all the workout plans.*/}
      {workoutPlanList}

      {/* ADD BUTTON */}
      <button
        type="button"
        id="add-workout-plan"
        className={styles['add-btn']}
        onClick={addWorkout}
      >
        Add Workout Plan
      </button>
    </div>
  );
};
export default IncrementalWorkoutPlan;
