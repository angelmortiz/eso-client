import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  patchUpdateSetLog,
  postAddSetLog,
  deleteSetLog,
} from "../../../../util/apis/activities/programPlanLogs/programPlanLogsApis";

const AddSetLog = (props) => {
  const { setNumber, setValues, setEditingSet, removeSetLog, exercisePlanId } =
    props;
  const { programPlanId, weekId, workoutPlanId } = useParams();
  const [setId, setSetId] = useState(setValues?._id || "");
  const [weight, setWeight] = useState(setValues?.weight || "");
  const [reps, setReps] = useState(setValues?.reps || "");
  const [rir, setRIR] = useState(setValues?.rir || "");
  const [weightTouched, setWeightTouched] = useState(false);
  const [repsTouched, setRepsTouched] = useState(false);
  const [rirTouched, setRIRTouched] = useState(false);

  const saveSetLog = (e) => {
    e.preventDefault();
    //ensures fields are not empty
    if (weight === "" || reps === "" || rir === "") return;

    setWeightTouched(false);
    setRepsTouched(false);
    setRIRTouched(false);

    //if a set was previously created, update the existing set log
    setId ? updateSetLog() : addNewSetLog();
  };

  const addNewSetLog = () => {
    const newSetValues = setNewSetValues();
    postAddSetLog(newSetValues.setLogIds, newSetValues.setLogValues).then(
      (response) => {
        //console.log('Response: ', response);
        if (!response || !response.isSuccess) return;
        setSetId(response.body._id);
        setEditingSet(setNumber, false);
      }
    );
  };

  const updateSetLog = () => {
    const newSetValues = setNewSetValues();
    patchUpdateSetLog(newSetValues.setLogIds, newSetValues.setLogValues).then(
      (response) => {
        //console.log('Response: ', response);
        if (!response || !response.isSuccess) return;
        setEditingSet(setNumber, false);
      }
    );
  };

  const setNewSetValues = () => {
    const setLogValues = {
      weight,
      reps,
      rir,
    };

    const setLogIds = {
      programPlanId,
      weekId,
      workoutPlanId,
      exercisePlanId,
      setId,
    };

    return { setLogValues, setLogIds };
  };

  const deleteCurrentSetLog = () => {
    if (!setId) return; //prevents deleting an empty set

    const newSetValues = setNewSetValues();
    deleteSetLog(newSetValues.setLogIds).then((response) => {
      //console.log('Response: ', response);
      if (!response || !response.isSuccess) return;
      setEditingSet(setNumber, false);
      removeSetLog(setNumber);
    });
  };

  return (
    <form onSubmit={saveSetLog}>
      {/* SET LOG */}
      <div className="my-5 flex justify-between gap-4 sm:items-center">
        <label
          htmlFor="setlog-info"
          className="text-md text-right font-bold leading-6 text-gray-900"
        >
          Set {setNumber}:
        </label>
        <div className="flex flex-grow flex-col items-center justify-center gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <label className="text-md text-right font-medium leading-6 text-gray-900">
              Weight:
            </label>
            <input
              type="number"
              name={"weight"}
              min="0"
              required
              value={weight}
              onChange={(e) => {
                setWeight(e.target.value);
                setWeightTouched(true);
                setEditingSet(setNumber, true);
              }}
              className="w-24 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6 justify-end"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-md text-right font-medium leading-6 text-gray-900">
              Reps:
            </label>
            <input
              type="number"
              name={"reps"}
              min="0"
              required
              value={reps}
              onChange={(e) => {
                setReps(e.target.value);
                setRepsTouched(true);
                setEditingSet(setNumber, true);
              }}
              className="w-24 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-md text-right font-medium leading-6 text-gray-900">
              RIR:
            </label>
            <input
              type="number"
              name={"rir"}
              min="0"
              required
              value={rir}
              onChange={(e) => {
                setRIR(e.target.value);
                setRIRTouched(true);
                setEditingSet(setNumber, true);
              }}
              className="w-24 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          onClick={deleteCurrentSetLog}
          className="h-6 text-red-700"
        >
          <title>Close</title>
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M368 368L144 144M368 144L144 368"
          />
        </svg>
      </div>

      {/*//IMPROVE: Disable btn while no values have been added  */}
      {/* SAVE BUTTON */}
      {(weightTouched || repsTouched || rirTouched) && (
        <button type="submit" id="save-set-log">
          Save Set
        </button>
      )}
    </form>
  );
};
export default AddSetLog;
