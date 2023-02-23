import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  patchUpdateSetLog,
  postAddSetLog,
} from '../../../../util/apis/activities/programPlans/programPlansApis';
import styles from '../../../UI/General/CSS/Form.module.css';

const AddSetLog = (props) => {
  const { setNumber, setValues, setEditingSet, exercisePlanId } = props;
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
    setId ? updateSetLog(): addNewSetLog();
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
      setNumber,
      weight,
      reps,
      rir,
    };

    const setLogIds = {
      programPlanId,
      weekId,
      workoutPlanId,
      exercisePlanId,
      setId
    };

    return { setLogValues, setLogIds };
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
