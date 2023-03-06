import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllExerciseNames } from '../../../../util/apis/activities/exercises/exercisesApis';
import { postWorkout } from '../../../../util/apis/activities/workouts/workoutsApis';
import styles from '../../../UI/General/CSS/Form.module.css';
import SelectInput from '../../../UI/Selects/SelectInput';
import IncrementalExercisePlan from './IncrementalExercisePlan';

//IMPROVE: Consider moving these values to a different file
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
    options: [],
  },
};

const AddWorkout = (props) => {
  const navigateTo = useNavigate();
  const [exercises, setExercises] = useState(null);
  exercisesInfo.select.options = exercises;

  useEffect(() => {
    fetchAllExerciseNames().then((response) => {
      if (!response || !response.isSuccess) return;

      //adds an empty default option
      response.body.unshift({ _id: '', name: '-- Choose an exercise --' });
      setExercises(response.body);
    });
  }, []);

  const addWorkout = (e) => {
    e.preventDefault();
    let formVals = getFormValues(e.target.elements);
    console.log('formVals', formVals);

    postWorkout(formVals).then((response) => {
      console.log('Response: ', response);
      if (response.isSuccess) {
        //IMPROVE: Navigate to the just added workout id
        navigateTo(`/activities/workouts`);
      }
    });
  };

  const getFormValues = (elements) => {
    const values = {};
    values.name = elements.name.value;
    values.description = elements.description.value;
    values.variant = elements.variant.value;
    values.type = elements.type.value;
    values.target = elements.target.value;
    values.linkToImage = elements.linkToImage.value;
    values.exercises = {};

    //extracting exercise plans info
    values.exercises.exerciseIds = filterEmptyValues(
      extractMultiOptionValues(elements.exercisePlanExercise)
    );
    values.exercises = extractExercisePlanValues(
      values.exercises.exerciseIds,
      elements
    );
    return values;
  };

  const filterEmptyValues = (arr) => {
    return arr.filter((x) => x);
  };

  const extractMultiOptionValues = (elements) => {
    //if there is only one select dropdown, it adds the HTMLSelectElement to an array before extracting the value.
    //if there are multiple select dropdowns, converts the RadioNodeList into an array (to later use .map()).
    elements = Object.prototype.toString.call(elements).includes('HTML', 0)
      ? [elements]
      : [...elements];

    //extracts the value from all elements
    let values = elements.map((element) => {
      return element.value;
    });
    return values;
  };

  const extractExercisePlanValues = (exerciseIds, elements) => {
    let exercisePlanValues = [];
    if (!exerciseIds || exerciseIds.length === 0) return null;

    /**
       * Note: All the elements of each exercise plan section follows the same
       * naming format: 'exercisePlan_x'. This enables the possibility of getting
       * all the values of each plan with the same input name.
       * The result is an array with 12 values that can be broken down to:
       * sets (2), reps (2), tempo (4), rir (2), and rest (2).
       */
    exerciseIds.forEach((id, index) => {
      const exerciseValues = extractMultiOptionValues(
        elements[`exercisePlan_${index + 1}`]
      );
      let exerciseVal = {};
      exerciseVal.exercise = id;
      exerciseVal.sets = exerciseValues.slice(0, 2);
      exerciseVal.reps = exerciseValues.slice(2, 4);
      exerciseVal.tempo = exerciseValues.slice(4, 8);
      exerciseVal.rir = exerciseValues.slice(8, 10);
      exerciseVal.rest = exerciseValues.slice(10, 12);

      exercisePlanValues.push(exerciseVal);
    });

    return exercisePlanValues;
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
        {/* LINK TO IMAGE */}
        <label htmlFor="workoutLinkToImage" className={styles['text-label']}>
          Image:
        </label>
        <input
          type="text"
          id="workout-linkToImage"
          name="linkToImage"
          placeholder="Enter a image link..."
          className={styles['select-input']}
        />
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
