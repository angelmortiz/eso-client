import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAllExerciseNames } from '../../../../util/apis/activities/exercises/exercisesApis';
import {
  fetchWorkoutById,
  putWorkout,
} from '../../../../util/apis/activities/workouts/workoutsApis';
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

const UpdateWorkout = (props) => {
  const navigateTo = useNavigate();
  const { id } = useParams();
  const [workout, setWorkout] = useState();
  const [exercises, setExercises] = useState(null);
  exercisesInfo.select.options = exercises;

  /** INPUT VALUES */
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [variant, setVariant] = useState('');
  const [type, setType] = useState('');
  const [target, setTarget] = useState('');
  const [linkToImage, setLinkToImage] = useState('');
  const [exercisePlans, setExercisePlans] = useState([]);
  /** */

  //Gets the most updated info from current workout
  useEffect(() => {
    if (!id) console.log(`Error: workout id not found in the url.`);
    fetchWorkoutById(id).then((response) => {
      if (!response || !response.isSuccess) return;
      setWorkout(response.body);
    });
  }, [id]);

  //Sets input values based on the current info fetched from the db
  useEffect(() => {
    if (!workout) return;
    setName(workout.name);
    setDescription(workout.description);
    setVariant(workout.variant);
    setType(workout.type);
    setTarget(workout.target);
    setLinkToImage(workout.linkToImage);
    setExercisePlans(workout.exercises);
  }, [workout]);

  useEffect(() => {
    fetchAllExerciseNames().then((response) => {
      if (!response || !response.isSuccess) return;

      //adds an empty default option
      response.body.unshift({ _id: '', name: '-- Choose an exercise --' });
      setExercises(response.body);
    });
  }, []);

  //runs when update button is clicked
  const UpdateWorkout = (e) => {
    e.preventDefault();
    const formVals = getFormValues(e.target.elements);

    console.log('formVals: ', formVals);
    putWorkout(id, formVals).then((response) => {
      console.log('Response: ', response);
      if (response && response.isSuccess) {
        //Navigate to the just updated workout id
        navigateTo(`/activities/workout/${id}`);
      }
    });
  };

  const getFormValues = (elements) => {
    const values = {};
    values.id = id;
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
    let index = 0;
    for (const id of exerciseIds) {
      if (!id) continue; //removes exercise plans that do not have a exercise selected

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
      index++;
    }

    return exercisePlanValues;
  };

  return (
    <section className={styles['main-section']}>
      <form
        id="update-workout-form"
        onSubmit={UpdateWorkout}
        className={styles['main-form']}
      >
        <h1 className={styles['form-title']}>Update Workout</h1>

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
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
          value={variant}
          onChange={(e) => setVariant(e.target.value)}
        />

        {/* TYPE */}
        <label htmlFor="workoutType" className={styles['text-label']}>
          Type:
        </label>
        <SelectInput select={workoutTypes.select} selectedValue={type} />

        {/* TARGET */}
        <label htmlFor="workoutTarget" className={styles['text-label']}>
          Target:
        </label>
        <SelectInput select={workoutTargets.select} selectedValue={target} />

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
          value={linkToImage}
          onChange={(e) => setLinkToImage(e.target.value)}
        />

        {/* EXERCISES */}
        {exercises ? (
          <IncrementalExercisePlan
            exercisesInfo={exercisesInfo}
            selectedPlans={exercisePlans}
          />
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
          id="Update-workout-btn"
          className={styles['submit-btn']}
        >
          Update workout
        </button>
      </form>
    </section>
  );
};

export default UpdateWorkout;
