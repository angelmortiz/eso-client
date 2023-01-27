import styles from '../../../UI/General/CSS/Form.module.css';
import SelectInput from '../../../UI/Selects/SelectInput';

const AddExercisePlan = (props) => {
  const {exercises, count} = props;

  return (
    <div className={styles['exercise-plan-div']}>
      <h3 className={styles['exercise-plan-title']}>Exercise Plan {count}</h3>
      
      {/* EXERCISE */}
      <label htmlFor="exercisePlanExercise" className={styles['text-label']}>
        Exercise:
      </label>
      <SelectInput select={exercises.select} value="_id" label="value" />

      {/* SETS */}
      <label htmlFor="exercisePlanSets" className={styles['text-label']}>
        Sets:
      </label>
      <div className={styles['select-inputs-small-div']}>
        <label className={styles['text-label-small']}>Min:</label>
        <input
          type="number"
          id="exercisePlan-sets-min"
          name="exercisePlanSetsMin"
          className={styles['select-input-small']}
          min="1"
        />
        <label className={styles['text-label-small']}>Max:</label>
        <input
          type="number"
          id="exercisePlan-sets-max"
          name="exercisePlanSetsMax"
          className={styles['select-input-small']}
          min="1"
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
          name="exercisePlanRepsMin"
          className={styles['select-input-small']}
          min="1"
        />
        <label className={styles['text-label-small']}>Max:</label>
        <input
          type="number"
          id="exercisePlan-reps-max"
          name="exercisePlanRepsMax"
          className={styles['select-input-small']}
          min="1"
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
          name="exercisePlanTempoEcc"
          className={styles['select-input-small']}
          min="1"
        />
        <label className={styles['text-label-small']}>P:</label>
        <input
          type="number"
          id="exercisePlan-tempo-pause1"
          name="exercisePlanTempoP1"
          className={styles['select-input-small']}
          min="1"
        />
        <label className={styles['text-label-small']}>Con:</label>
        <input
          type="number"
          id="exercisePlan-tempo-concentric"
          name="exercisePlanTempoCon"
          className={styles['select-input-small']}
          min="1"
        />
        <label className={styles['text-label-small']}>P:</label>
        <input
          type="number"
          id="exercisePlan-tempo-pause2"
          name="exercisePlanTempoP2"
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
          name="exercisePlanRirMin"
          className={styles['select-input-small']}
          min="0"
        />
        <label className={styles['text-label-small']}>Max:</label>
        <input
          type="number"
          id="exercisePlan-rir-max"
          name="exercisePlanRirMax"
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
          name="exercisePlanRestMin"
          className={styles['select-input-small']}
          min="0"
        />
        <label className={styles['text-label-small']}>Max:</label>
        <input
          type="number"
          id="exercisePlan-rest-max"
          name="exercisePlanRestMax"
          className={styles['select-input-small']}
          min="0"
        />
      </div>
    </div>
  );
};

export default AddExercisePlan;
