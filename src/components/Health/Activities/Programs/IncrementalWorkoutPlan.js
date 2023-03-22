import { useEffect, useState } from "react";
import AddWorkoutPlan from "./AddWorkoutPlan";

/** This component makes it possible to add new workouts to
 * the program by clicking the 'add' button.
 * This allows the user to add multiple options without the need
 * of knowing in advanced how  may elements should be added.
 */

/** //IMPROVE: Consider creating a more generic Incremental component
 * that can be reused for all incremental components in the add section.
 */
const IncrementalWorkoutPlan = (props) => {
  const { workoutsInfo, selectedPlans } = props;
  const [count, setCount] = useState(1);
  const [workoutPlanList, setWorkoutPlanList] = useState([
    newWorkoutPlan(count),
  ]);

  //if this component is used to update program,
  //auto-populates the workout plans
  useEffect(() => {
    if (!selectedPlans || selectedPlans.length === 0) return;

    const selectedInputs = [];
    let newCount = 0;
    //creates an array with the pre-selected elements from db (used for updates)
    selectedPlans.forEach((plan, index) => {
      newCount = index + 1;
      selectedInputs.push(
        <AddWorkoutPlan
          workouts={workoutsInfo}
          key={`workout-plan_${newCount}`}
          title={`Workout ${newCount}`}
          selectedPlan={plan}
        />
      );
    });

    setWorkoutPlanList(selectedInputs);
    setCount(newCount);
  }, [selectedPlans, workoutsInfo]);

  const addWorkout = (e) => {
    e.preventDefault();
    //increases the count and adds a new dropdown to the DOM
    setCount((previousCount) => {
      const newCount = previousCount + 1;
      setWorkoutPlanList((s) => s.concat(newWorkoutPlan(newCount)));
      return newCount;
    });
  };

  function newWorkoutPlan(newCount) {
    return (
      <AddWorkoutPlan
        workouts={workoutsInfo}
        count={newCount}
        key={`workout-plan_${newCount}`}
        title={`Workout ${newCount}`}
      />
    );
  }

  return (
    <div>
      {/* Displays all the workout plans.*/}
      {workoutPlanList}

      {/* ADD BUTTON */}
      <div className="mt-4 -mb-2 flex items-center justify-center">
        <button
          type="button"
          id="add-workout-plan"
          className="inline-flex justify-center text-sm font-semibold text-cyan-700 hover:text-cyan-600"
          onClick={addWorkout}
        >
          Add Workout
        </button>
      </div>
    </div>
  );
};
export default IncrementalWorkoutPlan;
