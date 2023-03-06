import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  patchUpdateSetLog,
  postAddSetLog,
  deleteSetLog
} from '../../../../util/apis/activities/programPlanLogs/programPlanLogsApis';
import styles from '../../../UI/General/CSS/Form.module.css';

const AddSetLog = (props) => {
  const { setNumber, setValues, setEditingSet, removeSetLog, exercisePlanId } =
    props;
  const { programPlanId, weekId, workoutPlanId } = useParams();
  const [setId, setSetId] = useState(setValues?._id || '');
  const [weight, setWeight] = useState(setValues?.weight || '');
  const [reps, setReps] = useState(setValues?.reps || '');
  const [rir, setRIR] = useState(setValues?.rir || '');
  const [weightTouched, setWeightTouched] = useState(false);
  const [repsTouched, setRepsTouched] = useState(false);
  const [rirTouched, setRIRTouched] = useState(false);

  const saveSetLog = (e) => {
    e.preventDefault();
    //ensures fields are not empty
    if (weight === '' || reps === '' || rir === '') return;

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
        console.log('response: ', response);
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
        console.log('response: ', response);
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
    if (!setId) return;//prevents deleting an empty set

    const newSetValues = setNewSetValues();
    deleteSetLog(newSetValues.setLogIds).then((response) => {
      console.log('response: ', response);
      if (!response || !response.isSuccess) return;
      setEditingSet(setNumber, false);
      removeSetLog(setNumber);
    });
  };

  return (
    <form className={styles['set-div']} onSubmit={saveSetLog}>
      {/* SET LOG */}
      <div className={styles['select-inputs-small-div']}>
        <label htmlFor="setlog-info" className={styles['text-label']}>
          <strong>Set {setNumber}:</strong>
        </label>
        <label className={styles['text-label-small']}>Weight:</label>
        <input
          type="number"
          name={'weight'}
          className={styles['select-input-medium']}
          min="0"
          required
          value={weight}
          onChange={(e) => {
            setWeight(e.target.value);
            setWeightTouched(true);
            setEditingSet(setNumber, true);
          }}
        />
        <label className={styles['text-label-small']}>Reps:</label>
        <input
          type="number"
          name={'reps'}
          className={styles['select-input-medium']}
          min="0"
          required
          value={reps}
          onChange={(e) => {
            setReps(e.target.value);
            setRepsTouched(true);
            setEditingSet(setNumber, true);
          }}
        />
        <label className={styles['text-label-small']}>RIR:</label>
        <input
          type="number"
          name={'rir'}
          className={styles['select-input-medium']}
          min="0"
          required
          value={rir}
          onChange={(e) => {
            setRIR(e.target.value);
            setRIRTouched(true);
            setEditingSet(setNumber, true);
          }}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={styles['delete-icon']}
          viewBox="0 0 512 512"
          onClick={deleteCurrentSetLog}
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
        <button
          type="submit"
          id="save-set-log"
          className={styles['add-btn-small']}
        >
          Save Set
        </button>
      )}
    </form>
  );
};
export default AddSetLog;
