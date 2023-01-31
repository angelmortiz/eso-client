import { useState } from 'react';
import styles from '../../../UI/General/CSS/Form.module.css';
import SelectInput from '../../../UI/Selects/SelectInput';

const AddExercisePlan = (props) => {
  const { exercises, count, selectedPlan } = props;

  /** INPUT VALUES */
  const [sets, setSets] = useState([]);
  const [reps, setReps] = useState([]);

  return (
    <div className={styles['plan-div']}>
      <h3 className={styles['plan-title']}>Exercise Plan {count}</h3>

      {/* EXERCISE */}
      <label htmlFor="exercisePlanExercise" className={styles['text-label']}>
        Exercise:
      </label>
      <SelectInput
        select={exercises.select}
        value="_id"
        label="value"
        selectedValue={selectedPlan.exerciseId}
      />

      {/* SETS */}
      <label htmlFor="exercisePlanSets" className={styles['text-label']}>
        Sets:
      </label>
      <div className={styles['select-inputs-small-div']}>
        <label className={styles['text-label-small']}>Min:</label>
        <input
          type="number"
          id="exercisePlan-sets-min"
          name={`exercisePlan_${count}`}
          className={styles['select-input-small']}
          min="1"
          value={selectedPlan?.sets[0]}
          onChange={(e) => setSets((s) => [e.target.value, s[1]])}
        />
        <label className={styles['text-label-small']}>Max:</label>
        <input
          type="number"
          id="exercisePlan-sets-max"
          name={`exercisePlan_${count}`}
          className={styles['select-input-small']}
          min="1"
          value={selectedPlan?.sets[1]}
          onChange={(e) => setSets((s) => [s[0], e.target.value])}
        />
      </div>

      {/* REPS */}
      <label htmlFor="exercisePlanReps" className={styles['text-label']}>
        Reps:
      </label>
      <div className={styles['select-inputs-small-div']}>
        <label className={styles['text-label-small']}>Min:</label>
        <input
          type="number"
          id="exercisePlan-reps-min"
          name={`exercisePlan_${count}`}
          className={styles['select-input-small']}
          min="1"
          value={selectedPlan?.reps[0]}
          onChange={(e) => setReps((s) => [e.target.value, s[1]])}
        />
        <label className={styles['text-label-small']}>Max:</label>
        <input
          type="number"
          id="exercisePlan-reps-max"
          name={`exercisePlan_${count}`}
          className={styles['select-input-small']}
          min="1"
          value={selectedPlan?.reps[1]}
          onChange={(e) => setReps((s) => [s[0], e.target.value, ])}
        />
      </div>

      {/* TEMPO */}
      <label htmlFor="exercisePlanTempo" className={styles['text-label']}>
        Tempo:
      </label>
      <div className={styles['select-inputs-small-div']}>
        <label className={styles['text-label-small']}>Ecc:</label>
        <input
          type="number"
          id="exercisePlan-tempo-eccentric"
          name={`exercisePlan_${count}`}
          className={styles['select-input-small']}
          min="1"
        />
        <label className={styles['text-label-small']}>P:</label>
        <input
          type="number"
          id="exercisePlan-tempo-pause1"
          name={`exercisePlan_${count}`}
          className={styles['select-input-small']}
          min="1"
        />
        <label className={styles['text-label-small']}>Con:</label>
        <input
          type="number"
          id="exercisePlan-tempo-concentric"
          name={`exercisePlan_${count}`}
          className={styles['select-input-small']}
          min="1"
        />
        <label className={styles['text-label-small']}>P:</label>
        <input
          type="number"
          id="exercisePlan-tempo-pause2"
          name={`exercisePlan_${count}`}
          className={styles['select-input-small']}
          min="1"
        />
      </div>

      {/* RIR */}
      <label htmlFor="exercisePlanRir" className={styles['text-label']}>
        RIR:
      </label>
      <div className={styles['select-inputs-small-div']}>
        <label className={styles['text-label-small']}>Min:</label>
        <input
          type="number"
          id="exercisePlan-rir-min"
          name={`exercisePlan_${count}`}
          className={styles['select-input-small']}
          min="0"
        />
        <label className={styles['text-label-small']}>Max:</label>
        <input
          type="number"
          id="exercisePlan-rir-max"
          name={`exercisePlan_${count}`}
          className={styles['select-input-small']}
          min="0"
        />
      </div>

      {/* REST */}
      <label htmlFor="exercisePlanRest" className={styles['text-label']}>
        Rest:
      </label>
      <div className={styles['select-inputs-small-div']}>
        <label className={styles['text-label-small']}>Min:</label>
        <input
          type="number"
          id="exercisePlan-rest-min"
          name={`exercisePlan_${count}`}
          className={styles['select-input-small']}
          min="0"
        />
        <label className={styles['text-label-small']}>Max:</label>
        <input
          type="number"
          id="exercisePlan-rest-max"
          name={`exercisePlan_${count}`}
          className={styles['select-input-small']}
          min="0"
        />
      </div>
    </div>
  );
};

export default AddExercisePlan;
