import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { patchAddSetLog } from '../../../../util/apis/activities/programPlans/programPlansApis';
import styles from '../../../UI/General/CSS/Form.module.css';

const AddSetLog = (props) => {
  const { setNumber, setValues, enableAddSetBtn, exercisePlanId } = props;
  const { programPlanId, weekId, workoutPlanId } = useParams();
  const [weight, setWeight] = useState(setValues?.weight || 0);
  const [reps, setReps] = useState(setValues?.reps || 0);
  const [rir, setRIR] = useState(setValues?.rir || 0);
  const [weightTouched, setWeightTouched] = useState(false);
  const [repsTouched, setRepsTouched] = useState(false);
  const [rirTouched, setRIRTouched] = useState(false);

  const addSetLog = (e) => {
    setWeightTouched(false);
    setRepsTouched(false);
    setRIRTouched(false);

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
    };

    console.log("setLogIds: ", setLogIds);
    console.log("formVals: ", setLogValues);
    patchAddSetLog(setLogIds, setLogValues).then((response) => {
      console.log('response: ', response);
      if (!response || !response.isSuccess) return;
      enableAddSetBtn(true);
    });
  };

  return (
    <div className={styles['set-div']}>
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
          value={weight}
          onChange={(e) => {
            setWeight(e.target.value);
            setWeightTouched(true);
            enableAddSetBtn(false);
          }}
        />
        <label className={styles['text-label-small']}>Reps:</label>
        <input
          type="number"
          name={'reps'}
          className={styles['select-input-medium']}
          min="0"
          value={reps}
          onChange={(e) => {
            setReps(e.target.value);
            setRepsTouched(true);
            enableAddSetBtn(false);
          }}
        />
        <label className={styles['text-label-small']}>RIR:</label>
        <input
          type="number"
          name={'rir'}
          className={styles['select-input-medium']}
          min="0"
          value={rir}
          onChange={(e) => {
            setRIR(e.target.value);
            setRIRTouched(true);
            enableAddSetBtn(false);
          }}
        />
      </div>

      {/*//IMPROVE: Disable btn while no values have been added  */}
      {/* SAVE BUTTON */}
      {(weightTouched || repsTouched || rirTouched) && (
        <button
          type="button"
          id="save-set-log"
          className={styles['add-btn-small']}
          onClick={addSetLog}
        >
          Save Set
        </button>
      )}
    </div>
  );
};
export default AddSetLog;
