import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllExerciseNames } from '../../../../util/apis/activities/exercises/exercisesApis';
import { postWorkout } from '../../../../util/apis/activities/workouts/workoutsApis';
import styles from '../../../UI/General/CSS/Form.module.css';
import SelectInput from '../../../UI/Selects/SelectInput';
import AddExercisePlan from './AddExercisePlan';

const AddWorkout = (props) => {
  const navigateTo = useNavigate();
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetchAllExerciseNames().then((response) => {
      if (!response || !response.isSuccess) return;

      //adds an empty default option
      response.body.unshift({ _id: '', name: '-- Choose an workout --' });
      setExercises(response.body);
    });
  }, []);

  const workoutTypes = {
    select: {
      id: 'workout-types',
      name: 'types',
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
      name: 'targets',
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

  const addWorkout = (e) => {
    e.preventDefault();
    const formVals = getValuesFromForm(e.target.elements);

    postWorkout(formVals).then((response) => {
      console.log('Response: ', response);
      if (response.isSuccess) {
        //IMPROVE: Navigate to the just added workout id
        navigateTo(`/activities/workouts`);
      }
    });
  };

  const getValuesFromForm = (elements) => {
    const values = {};
    values.name = elements.name.value;
    values.description = elements.description.value;
    values.type = elements.type.value;
    values.target = elements.target.value;
    values.variant = elements.variant.value;
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
        <label htmlFor="workout-name" className={styles['text-label']}>
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
        <label htmlFor="workout-description" className={styles['text-label']}>
          Description:
        </label>
        <input
          type="text"
          id="workout-description"
          name="workout-description"
          placeholder="Enter a description..."
          className={styles['select-input']}
        />

        {/* VARIANT */}
        <label htmlFor="workout-variant" className={styles['text-label']}>
          Variant:
        </label>
        <input
          type="text"
          id="workout-variant"
          name="workout-variant"
          placeholder="Enter a variant..."
          className={styles['select-input']}
        />

        {/* TYPE */}
        <label htmlFor="workout-type" className={styles['text-label']}>
          Type:
        </label>
        <SelectInput select={workoutTypes.select} />

        {/* TARGET */}
        <label htmlFor="workout-target" className={styles['text-label']}>
          Target:
        </label>
        <SelectInput select={workoutTargets.select} />

        {/* EXERCISES */}
        <AddExercisePlan />
        
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
