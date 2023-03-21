import { useEffect, useState } from "react";
import FormSelectInput from "../../../UI/Selects/FormSelectInput";

const AddExercisePlan = (props) => {
  const { exercises, count, selectedPlan } = props;

  /** INPUT VALUES */
  const [exercise, setExercise] = useState();
  const [sets, setSets] = useState(["", ""]);
  const [reps, setReps] = useState(["", ""]);
  const [tempo, setTempo] = useState(["", "", "", ""]);
  const [rir, setRir] = useState(["", ""]);
  const [rest, setRest] = useState(["", ""]);
  /** [END] INPUT VALUES */

  //Sets input values based on the current info fetched from the db
  useEffect(() => {
    if (!selectedPlan) return;

    setExercise(selectedPlan.exercise);
    setSets(selectedPlan.sets);
    setReps(selectedPlan.reps);
    setTempo(selectedPlan.tempo);
    setRir(selectedPlan.rir);
    setRest(selectedPlan.rest);
  }, [selectedPlan]);

  return (
    <div className="my-6">
      {/* EXERCISE */}
      <FormSelectInput
        label={`Exercise ${count}`}
        select={exercises.select}
        selectedValue={exercise?._id}
        onChange={(e) => setExercise(e.target.value)}
        width="md"
      />

      {/* SETS */}
      <div className="mt-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
        <label
          className="text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
          htmlFor="exercisePlanSets"
        >
          Sets:
        </label>
        <div className="mt-1 flex items-center gap-2 sm:col-span-2 sm:mt-0 sm:max-w-md">
          <div className="flex flex-auto items-center gap-2">
            <label className="text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
              Min:
            </label>
            <input
              type="number"
              id="exercisePlan-sets-min"
              name={`exercisePlan_${count}`}
              min="1"
              value={sets[0]}
              onChange={(e) => setSets((x) => [e.target.value, x[1]])}
              className="w-0 flex-auto rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex flex-auto items-center  gap-2">
            <label className="text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
              Max:
            </label>
            <input
              type="number"
              id="exercisePlan-sets-max"
              name={`exercisePlan_${count}`}
              min="1"
              value={sets[1]}
              onChange={(e) => setSets((x) => [x[0], e.target.value])}
              className="w-0 flex-auto rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExercisePlan;
