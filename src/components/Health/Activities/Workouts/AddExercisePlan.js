import styles from '../../../UI/General/CSS/Form.module.css';
import SelectInput from '../../../UI/Selects/SelectInput';

const AddExercisePlan = (props) => {
  // const exercises = props.exercises;

  const exercises = {
    select: {
      id: 'exerciseplan-exercise',
      name: 'exerciseplan-exercise',
      options: [
        {
          value: '',
          label: '-- Choose an exercise --',
        },
        {
          value: '635ad2f5c485d32428804e9a',
          label: 'Romanian Deadlift',
        },
        {
          value: '635a855cc485d32428804e79',
          label: 'Deadlift',
        },
        {
          value: '6361739cfcc32170737d8627',
          label: 'Squat',
        },
      ],
    },
  };

  return (
    <div className={styles['exercise-plan-div']}>
      {/* EXERCISE */}
      <label htmlFor="exerciseplan-exercise" className={styles['text-label']}>
        Exercise:
      </label>
      <SelectInput select={exercises.select} />

      {/* SETS */}
      <label htmlFor="exerciseplan-sets" className={styles['text-label']}>
        Sets:
      </label>
      <div className={styles['select-inputs-small-div']}>
        <label className={styles['text-label-small']}>Min:</label>
        <input
          type="number"
          id="exerciseplan-sets-min"
          name="exerciseplan-sets-min"
          className={styles['select-input-small']}
          min="1"
        />
        <label className={styles['text-label-small']}>Max:</label>
        <input
          type="number"
          id="exerciseplan-sets-max"
          name="exerciseplan-sets-max"
          className={styles['select-input-small']}
          min="1"
        />
      </div>

      {/* REPS */}
      <label htmlFor="exerciseplan-reps" className={styles['text-label']}>
        Reps:
      </label>
      <div className={styles['select-inputs-small-div']}>
        <label className={styles['text-label-small']}>Min:</label>
        <input
          type="number"
          id="exerciseplan-reps-min"
          name="exerciseplan-reps-min"
          className={styles['select-input-small']}
          min="1"
        />
        <label className={styles['text-label-small']}>Max:</label>
        <input
          type="number"
          id="exerciseplan-reps-max"
          name="exerciseplan-reps-max"
          className={styles['select-input-small']}
          min="1"
        />
      </div>

      {/* TEMPO */}
      <label htmlFor="exerciseplan-tempo" className={styles['text-label']}>
        Tempo:
      </label>
      <div className={styles['select-inputs-small-div']}>
        <label className={styles['text-label-small']}>Ecc:</label>
        <input
          type="number"
          id="exerciseplan-tempo-eccentric"
          name="exerciseplan-tempo-eccentric"
          className={styles['select-input-small']}
          min="1"
        />
        <label className={styles['text-label-small']}>P:</label>
        <input
          type="number"
          id="exerciseplan-tempo-pause1"
          name="exerciseplan-tempo-pause1"
          className={styles['select-input-small']}
          min="1"
        />
        <label className={styles['text-label-small']}>Con:</label>
        <input
          type="number"
          id="exerciseplan-tempo-concentric"
          name="exerciseplan-tempo-concentric"
          className={styles['select-input-small']}
          min="1"
        />
        <label className={styles['text-label-small']}>P:</label>
        <input
          type="number"
          id="exerciseplan-tempo-pause2"
          name="exerciseplan-tempo-pause2"
          className={styles['select-input-small']}
          min="1"
        />
      </div>

      {/* RIR */}
      <label htmlFor="exerciseplan-rir" className={styles['text-label']}>
        RIR:
      </label>
      <div className={styles['select-inputs-small-div']}>
        <label className={styles['text-label-small']}>Min:</label>
        <input
          type="number"
          id="exerciseplan-rir-min"
          name="exerciseplan-rir-min"
          className={styles['select-input-small']}
          min="0"
        />
        <label className={styles['text-label-small']}>Max:</label>
        <input
          type="number"
          id="exerciseplan-rir-max"
          name="exerciseplan-rir-max"
          className={styles['select-input-small']}
          min="0"
        />
      </div>

      {/* REST */}
      <label htmlFor="exerciseplan-rest" className={styles['text-label']}>
        Rest:
      </label>
      <div className={styles['select-inputs-small-div']}>
        <label className={styles['text-label-small']}>Min:</label>
        <input
          type="number"
          id="exerciseplan-rest-min"
          name="exerciseplan-rest-min"
          className={styles['select-input-small']}
          min="0"
        />
        <label className={styles['text-label-small']}>Max:</label>
        <input
          type="number"
          id="exerciseplan-rest-max"
          name="exerciseplan-rest-max"
          className={styles['select-input-small']}
          min="0"
        />
      </div>
    </div>
  );
};

export default AddExercisePlan;
