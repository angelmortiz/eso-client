import { useEffect, useState } from "react";
import AddExercisePlan from "./AddExercisePlan";

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
    setCount(newCount);
  }, [selectedPlans, exercisesInfo]);

  const addExercise = (e) => {
    e.preventDefault();
    //increases the count and adds a new dropdown to the DOM
    setCount((previousCount) => {
      const newCount = previousCount + 1;
      setExercisePlanList((s) => s.concat(newExercisePlan(newCount)));
      return newCount;
    });
  };

  function newExercisePlan(newCount) {
    return (
      <AddExercisePlan
        exercises={exercisesInfo}
        count={newCount}
        key={`exercise-plan_${newCount}`}
      />
    );
  }

  return (
    <div className="flex flex-col justify-center">
      {/* Displays all the exercise plans.*/}
      {exercisePlanList}

      {/* ADD BUTTON */}
      <div className="mt-4 -mb-2 flex items-center justify-center">
        <button
          type="button"
          id="add-exercise-plan"
          className="inline-flex justify-center text-sm font-semibold text-cyan-700 hover:text-cyan-600"
          onClick={addExercise}
        >
          Add Exercise
        </button>
      </div>
    </div>
  );
};

export default IncrementalExercisePlan;
