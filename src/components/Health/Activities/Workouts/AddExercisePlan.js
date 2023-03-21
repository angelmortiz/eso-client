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
      <div className="mt-6 sm:mt-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
        <label
          className="text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
          htmlFor="exercisePlanSets"
        >
          Sets:
        </label>
        <div className="mt-1 flex items-center gap-2 sm:col-span-2 sm:mt-0 sm:max-w-md">
          <div className="flex flex-auto items-center gap-2">
            <label className="text-sm font-medium leading-6 text-gray-900">
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
          <div className="flex flex-auto items-center gap-2">
            <label className="text-sm font-medium leading-6 text-gray-900">
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

      {/* REPS */}
      <div className="mt-6 sm:mt-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
        <label
          htmlFor="exercisePlanReps"
          className="text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
        >
          Reps:
        </label>
        <div className="mt-1 flex items-center gap-2 sm:col-span-2 sm:mt-0 sm:max-w-md">
          <div className="flex flex-auto items-center gap-2">
            <label className="text-sm font-medium leading-6 text-gray-900">
              Min:
            </label>
            <input
              type="number"
              id="exercisePlan-reps-min"
              name={`exercisePlan_${count}`}
              min="1"
              value={reps[0]}
              onChange={(e) => setReps((s) => [e.target.value, s[1]])}
              className="w-0 flex-auto rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
            />
            <div className="flex flex-auto items-center gap-2">
              <label className="text-sm font-medium leading-6 text-gray-900">
                Max:
              </label>
              <input
                type="number"
                id="exercisePlan-reps-max"
                name={`exercisePlan_${count}`}
                min="1"
                value={reps[1]}
                onChange={(e) => setReps((x) => [x[0], e.target.value])}
                className="w-0 flex-auto rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>

      {/* TEMPO */}
      <div className="mt-6 sm:mt-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
        <label
          htmlFor="exercisePlanReps"
          className="text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
        >
          Tempo:
        </label>
        <div className="mt-1 flex items-center gap-2 sm:col-span-2 sm:mt-0 sm:max-w-md">
          <div className="flex flex-auto items-center gap-2">
            <label className="text-sm font-medium leading-6 text-gray-900">
              Ecc:
            </label>
            <input
              type="number"
              id="exercisePlan-tempo-eccentric"
              name={`exercisePlan_${count}`}
              min="1"
              value={tempo[0]}
              onChange={(e) =>
                setTempo((x) => [e.target.value, x[1], x[2], x[3]])
              }
              className="w-0 flex-auto rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex flex-auto items-center gap-2">
            <label className="text-sm font-medium leading-6 text-gray-900">
              P1:
            </label>
            <input
              type="number"
              id="exercisePlan-tempo-pause1"
              name={`exercisePlan_${count}`}
              min="1"
              value={tempo[1]}
              onChange={(e) =>
                setTempo((x) => [x[0], e.target.value, x[2], x[3]])
              }
              className="w-0 flex-auto rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex flex-auto items-center gap-2">
            <label className="text-sm font-medium leading-6 text-gray-900">
              Con:
            </label>
            <input
              type="number"
              id="exercisePlan-tempo-concentric"
              name={`exercisePlan_${count}`}
              min="1"
              value={tempo[2]}
              onChange={(e) =>
                setTempo((x) => [x[0], x[1], e.target.value, x[3]])
              }
              className="w-0 flex-auto rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex flex-auto items-center gap-2">
            <label className="text-sm font-medium leading-6 text-gray-900">
              P2:
            </label>
            <input
              type="number"
              id="exercisePlan-tempo-pause2"
              name={`exercisePlan_${count}`}
              min="1"
              value={tempo[3]}
              onChange={(e) =>
                setTempo((x) => [x[0], x[1], x[3], e.target.value])
              }
              className="w-0 flex-auto rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      {/* RIR */}
      <div className="mt-6 sm:mt-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
        <label
          htmlFor="exercisePlanRir"
          className="text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
        >
          RIR:
        </label>
        <div className="mt-1 flex items-center gap-2 sm:col-span-2 sm:mt-0 sm:max-w-md">
          <div className="flex flex-auto items-center gap-2">
            <label className="text-sm font-medium leading-6 text-gray-900">
              Min:
            </label>
            <input
              type="number"
              id="exercisePlan-rir-min"
              name={`exercisePlan_${count}`}
              min="0"
              value={rir[0]}
              onChange={(e) => setRir((x) => [e.target.value, x[1]])}
              className="w-0 flex-auto rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
            />
            <div className="flex flex-auto items-center gap-2">
              <label className="text-sm font-medium leading-6 text-gray-900">
                Max:
              </label>
              <input
                type="number"
                id="exercisePlan-rir-max"
                name={`exercisePlan_${count}`}
                min="0"
                value={rir[1]}
                onChange={(e) => setRir((x) => [x[0], e.target.value])}
                className="w-0 flex-auto rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>

      {/* REST */}
      <div className="mt-6 sm:mt-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
        <label
          htmlFor="exercisePlanRest"
          className="text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
        >
          Rest:
        </label>
        <div className="mt-1 flex items-center gap-2 sm:col-span-2 sm:mt-0 sm:max-w-md">
          <div className="flex flex-auto items-center gap-2">
            <label className="text-sm font-medium leading-6 text-gray-900">
              Min:
            </label>
            <input
              type="number"
              id="exercisePlan-rest-min"
              name={`exercisePlan_${count}`}
              min="0"
              value={rest[0]}
              onChange={(e) => setRest((x) => [e.target.value, x[1]])}
              className="w-0 flex-auto rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
            />
            <div className="flex flex-auto items-center gap-2">
              <label className="text-sm font-medium leading-6 text-gray-900">
                Max:
              </label>
              <input
                type="number"
                id="exercisePlan-rest-max"
                name={`exercisePlan_${count}`}
                min="0"
                value={rest[1]}
                onChange={(e) => setRest((x) => [x[0], e.target.value])}
                className="w-0 flex-auto rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      {/*  */}
    </div>
  );
};

export default AddExercisePlan;
