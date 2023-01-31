import { useEffect, useState } from 'react';
import styles from '../../../UI/General/CSS/Form.module.css';
import AddExercisePlan from './AddExercisePlan';

/** This component makes it possible to add new exercises to
 * the workout by clicking the 'add' button.
 * This allows the user to add multiple options without the need
 * of knowing in advanced how  may elements should be added.
 */
const IncrementalExercisePlan = (props) => {
  const { exercisesInfo, selectedPlans } = props;
  const [count, setCount] = useState(1);
  const [exercisePlanList, setExercisePlanList] = useState([
    newExercisePlan(count),
  ]);

  //if this component is used to update workout,
  //auto-populates the exercise plans
  useEffect(() => {
    if (!selectedPlans || selectedPlans.length === 0) return;

    const selectedInputs = [];
    let newCount = 0;
    //creates an array with the pre-selected elements from db (used for updates)
    selectedPlans.forEach((plan, index) => {
      newCount = index + 1;
      selectedInputs.push(
        <AddExercisePlan
          exercises={exercisesInfo}
          count={newCount}
          key={`exercise-plan_${newCount}`}
          selectedPlan={plan}
        />
      );
    });

    setExercisePlanList(selectedInputs);
    setCount(newCount)
  },[selectedPlans, exercisesInfo]);

  const addExercise = (e) => {
    e.preventDefault();
    //increases the count and adds a new dropdown to the DOM
    setCount((previousCount) => {
      const newCount = previousCount + 1;
      setExercisePlanList((s) => s.concat(newExercisePlan(newCount)));
      return newCount;
    });
  };

  function newExercisePlan(newCount, value = undefined) {
    return (
      <AddExercisePlan
        exercises={exercisesInfo}
        count={newCount}
        key={`exercise-plan_${newCount}`}
      />
    );
  }

  return (
    <div className={styles['plan-list']}>
      {/* Displays all the exercise plans.*/}
      {exercisePlanList}

      {/* ADD BUTTON */}
      <button
        type="button"
        id="add-exercise-plan"
        className={styles['add-btn']}
        onClick={addExercise}
      >
        Add Exercise Plan
      </button>
    </div>
  );
};

export default IncrementalExercisePlan;
