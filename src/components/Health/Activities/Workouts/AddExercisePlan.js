import { useEffect, useState } from 'react';
import styles from '../../../UI/General/CSS/Form.module.css';
import SelectInput from '../../../UI/Selects/SelectInput';

const AddExercisePlan = (props) => {
  const { exercises, count, selectedPlan } = props;

  /** INPUT VALUES */
  const [exercise, setExercise] = useState();
  const [sets, setSets] = useState([0, 0]);
  const [reps, setReps] = useState([0, 0]);
  const [tempo, setTempo] = useState([0, 0, 0, 0]);
  const [rir, setRir] = useState([0, 0]);
  const [rest, setRest] = useState([0, 0]);
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
        selectedValue={exercise?._id}
        onChange={(e) => setExercise(e.target.value)}
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
          value={sets[0]}
          onChange={(e) => setSets((x) => [e.target.value, x[1]])}
        />
        <label className={styles['text-label-small']}>Max:</label>
        <input
          type="number"
          id="exercisePlan-sets-max"
          name={`exercisePlan_${count}`}
          className={styles['select-input-small']}
          min="1"
          value={sets[1]}
          onChange={(e) => setSets((x) => [x[0], e.target.value])}
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
          value={reps[0]}
          onChange={(e) => setReps((s) => [e.target.value, s[1]])}
        />
        <label className={styles['text-label-small']}>Max:</label>
        <input
          type="number"
          id="exercisePlan-reps-max"
          name={`exercisePlan_${count}`}
          className={styles['select-input-small']}
          min="1"
          value={reps[1]}
          onChange={(e) => setReps((x) => [x[0], e.target.value])}
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
          value={tempo[0]}
          onChange={(e) => setTempo((x) => [e.target.value, x[1], x[2], x[3]])}
        />
        <label className={styles['text-label-small']}>P:</label>
        <input
          type="number"
          id="exercisePlan-tempo-pause1"
          name={`exercisePlan_${count}`}
          className={styles['select-input-small']}
          min="1"
          value={tempo[1]}
          onChange={(e) => setTempo((x) => [x[0], e.target.value, x[2], x[3]])}
        />
        <label className={styles['text-label-small']}>Con:</label>
        <input
          type="number"
          id="exercisePlan-tempo-concentric"
          name={`exercisePlan_${count}`}
          className={styles['select-input-small']}
          min="1"
          value={tempo[2]}
          onChange={(e) => setTempo((x) => [x[0], x[1], e.target.value, x[3]])}
        />
        <label className={styles['text-label-small']}>P:</label>
        <input
          type="number"
          id="exercisePlan-tempo-pause2"
          name={`exercisePlan_${count}`}
          className={styles['select-input-small']}
          min="1"
          value={tempo[3]}
          onChange={(e) => setTempo((x) => [x[0], x[1], x[3], e.target.value])}
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
          value={rir[0]}
          onChange={(e) => setRir((x) => [e.target.value, x[1]])}
        />
        <label className={styles['text-label-small']}>Max:</label>
        <input
          type="number"
          id="exercisePlan-rir-max"
          name={`exercisePlan_${count}`}
          className={styles['select-input-small']}
          min="0"
          value={rir[1]}
          onChange={(e) => setRir((x) => [x[0], e.target.value])}
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
          value={rest[0]}
          onChange={(e) => setRest((x) => [e.target.value, x[1]])}
        />
        <label className={styles['text-label-small']}>Max:</label>
        <input
          type="number"
          id="exercisePlan-rest-max"
          name={`exercisePlan_${count}`}
          className={styles['select-input-small']}
          min="0"
          value={rest[1]}
          onChange={(e) => setRest((x) => [x[0], e.target.value])}
        />
      </div>
    </div>
  );
};

export default AddExercisePlan;
