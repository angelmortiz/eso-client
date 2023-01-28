import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllExerciseNames } from '../../../../util/apis/activities/exercises/exercisesApis';
import { postWorkout } from '../../../../util/apis/activities/workouts/workoutsApis';
import styles from '../../../UI/General/CSS/Form.module.css';
import SelectInput from '../../../UI/Selects/SelectInput';
import IncrementalExercisePlan from './IncrementalExercisePlan';

const AddWorkout = (props) => {
  const navigateTo = useNavigate();
  const [exercises, setExercises] = useState(null);

  useEffect(() => {
    fetchAllExerciseNames().then((response) => {
      if (!response || !response.isSuccess) return;

      //adds an empty default option
      response.body.unshift({ _id: '', name: '-- Choose an exercise --' });
      setExercises(response.body);
    });
  }, []);

  const workoutTypes = {
    select: {
      id: 'workout-types',
      name: 'type',
      options: [
        { value: '', label: '-- Choose type --' },
        { value: 'Strength', label: 'Strength' },
        { value: 'Hypertrophy', label: 'Hypertrophy' },
        { value: 'Endurance', label: 'Endurance' },
      ],
    },
  };

  const workoutTargets = {
    select: {
      id: 'workout-targets',
      name: 'target',
      options: [
        { value: '', label: '-- Choose target --' },
        { value: 'Full Body', label: 'Full Body' },
        { value: 'Upper Body', label: 'Upper Body' },
        { value: 'Lower Body', label: 'Lower Body' },
        { value: 'Front Muscles', label: 'Front Muscles' },
        { value: 'Back Muscles', label: 'Back Muscles' },
        { value: 'Mixed', label: 'Mixed' },
      ],
    },
  };

  const exercisesInfo = {
    select: {
      id: 'exerciseplan-exercise',
      name: 'exercisePlanExercise',
      value: '_id',
      label: 'name',
      options: exercises,
    },
  };

  const addWorkout = (e) => {
    e.preventDefault();
    let formVals = getFormValues(e.target.elements);
    formVals.exercisePlans = reformatExercisePlans(formVals.exercisePlans);

    // postWorkout(formVals).then((response) => {
    //   console.log('Response: ', response);
    //   if (response.isSuccess) {
    //     //IMPROVE: Navigate to the just added workout id
    //     navigateTo(`/activities/workouts`);
    //   }
    // });
  };

  const getFormValues = (elements) => {
    const values = {};
    values.name = elements.name.value;
    values.description = elements.description.value;
    values.variant = elements.variant.value;
    values.type = elements.type.value;
    values.target = elements.target.value;
    values.exercisePlans = {};

    //extracting exercise plans info
    values.exercisePlans.exercises = extractMultiOptionValues(elements.exercisePlanExercise);
    values.exercisePlans.setsMin = extractMultiOptionValues(elements.exercisePlanSetsMin);
    values.exercisePlans.setsMax = extractMultiOptionValues(elements.exercisePlanSetsMax);
    values.exercisePlans.repsMin = extractMultiOptionValues(elements.exercisePlanRepsMin);
    values.exercisePlans.repsMax = extractMultiOptionValues(elements.exercisePlanRepsMax);
    values.exercisePlans.tempoEcc = extractMultiOptionValues(elements.exercisePlanTempoEcc);
    values.exercisePlans.tempoP1 = extractMultiOptionValues(elements.exercisePlanTempoP1);
    values.exercisePlans.tempoCon = extractMultiOptionValues(elements.exercisePlanTempoCon);
    values.exercisePlans.tempoP2 = extractMultiOptionValues(elements.exercisePlanTempoP2);
    values.exercisePlans.rirMin = extractMultiOptionValues(elements.exercisePlanRirMin);
    values.exercisePlans.rirMax = extractMultiOptionValues(elements.exercisePlanRirMax);
    values.exercisePlans.restMin = extractMultiOptionValues(elements.exercisePlanRestMin);
    values.exercisePlans.restMax = extractMultiOptionValues(elements.exercisePlanRestMax);
    console.log('values: ', values);
  };

  const reformatExercisePlans = (plans) => {
    const count = plans.exercises.length;

    
  };

  const extractMultiOptionValues = (elements) => {    
    //if there is only one select dropdown, it adds the HTMLSelectElement to an array before extracting the value.
    //if there are multiple select dropdowns, converts the RadioNodeList into an array (to later use .map()).
    elements = Object.prototype.toString.call(elements).includes('HTML', 0) ?
        [elements] : [...elements];
    
    let values = elements.map(element => { return element.value; });
    values = values.filter(v => v); //removes empty selections
    return values;
};

  return (
    <section className={styles['main-section']}>
      <form
        id="add-workout-form"
        onSubmit={addWorkout}
        className={styles['main-form']}
      >
        <h1 className={styles['form-title']}>Add Workout</h1>
        {/* NAME */}
        <label htmlFor="workoutName" className={styles['text-label']}>
          Name:
        </label>
        <input
          type="text"
          id="workout-name"
          name="name"
          placeholder="Enter the workout name..."
          className={styles['select-input']}
        />
        {/* DESCRIPTION */}
        <label htmlFor="workoutDescription" className={styles['text-label']}>
          Description:
        </label>
        <input
          type="text"
          id="workout-description"
          name="description"
          placeholder="Enter a description..."
          className={styles['select-input']}
        />
        {/* VARIANT */}
        <label htmlFor="workoutVariant" className={styles['text-label']}>
          Variant:
        </label>
        <input
          type="text"
          id="workout-variant"
          name="variant"
          placeholder="Enter a variant..."
          className={styles['select-input']}
        />
        {/* TYPE */}
        <label htmlFor="workoutType" className={styles['text-label']}>
          Type:
        </label>
        <SelectInput select={workoutTypes.select} />
        {/* TARGET */}
        <label htmlFor="workoutTarget" className={styles['text-label']}>
          Target:
        </label>
        <SelectInput select={workoutTargets.select} />
        {/* EXERCISES */}
        {exercises ? (
          <IncrementalExercisePlan exercisesInfo={exercisesInfo} />
        ) : (
          <img
            src="/loading.gif"
            alt="Loading..."
            className={styles['loading-img']}
          />
        )}
        
        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          id="add-workout-btn"
          className={styles['submit-btn']}
        >
          Add workout
        </button>
      </form>
    </section>
  );
};

export default AddWorkout;
