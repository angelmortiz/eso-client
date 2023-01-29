import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllWorkoutNames } from '../../../../util/apis/activities/workouts/workoutsApis';
import { postProgram } from '../../../../util/apis/activities/programs/programsApis';
import styles from '../../../UI/General/CSS/Form.module.css';
import SelectInput from '../../../UI/Selects/SelectInput';
import AddWorkoutPlan from './AddWorkoutPlan';
import IncrementalWorkoutPlan from './IncrementalWorkoutPlan';

const AddProgram = (props) => {
  const navigateTo = useNavigate();
  const [workouts, setWorkouts] = useState(null);
  const [sequenceType, setSequenceType] = useState('');

  useEffect(() => {
    fetchAllWorkoutNames().then((response) => {
      if (!response || !response.isSuccess) return;

      //adds an empty default option
      response.body.unshift({ _id: '', name: '-- Choose a workout --' });
      setWorkouts(response.body);
    });
  }, []);

  const programTypes = {
    select: {
      id: 'program-types',
      name: 'types',
      options: [
        { value: '', label: '-- Choose type --' },
        { value: 'Strength', label: 'Strength' },
        { value: 'Hypertrophy', label: 'Hypertrophy' },
        { value: 'Endurance', label: 'Endurance' },
        { value: 'Mixed', label: 'Mixed' },
      ],
    },
  };

  const programSequence = {
    select: {
      id: 'program-sequence',
      name: 'sequence',
      options: [
        { value: '', label: '-- Choose sequence --' },
        { value: 'Weekly', label: 'Weekly' },
        { value: 'Cycle', label: 'Cycle' },
      ],
    },
  };

  const workoutsInfo = {
    select: {
      id: 'workoutPlan-workout',
      name: 'workoutPlanWorkout',
      value: '_id',
      label: 'name',
      options: workouts,
    },
  };

  const daysOfTheWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thrusday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const addProgram = (e) => {
    e.preventDefault();
    const formVals = getFormValues(e.target.elements);

    postProgram(formVals).then((response) => {
      console.log('Response: ', response);
      if (response.isSuccess) {
        //IMPROVE: Navigate to the just added program id
        navigateTo(`/activities/programs`);
      }
    });
  };

  const getFormValues = (elements) => {
    const values = {};
    values.name = elements.name.value;
    values.description = elements.description.value;
    values.type = elements.type.value;
    values.sequence = elements.sequence.value;
    values.durantion = elements.duration.value;
  };

  return (
    <section className={styles['main-section']}>
      <form
        id="add-program-form"
        onSubmit={addProgram}
        className={styles['main-form']}
      >
        <h1 className={styles['form-title']}>Add Program</h1>

        {/* NAME */}
        <label htmlFor="program-name" className={styles['text-label']}>
          Name:
        </label>
        <input
          type="text"
          id="program-name"
          name="name"
          placeholder="Enter the program name..."
          className={styles['select-input']}
        />

        {/* DESCRIPTION */}
        <label htmlFor="program-description" className={styles['text-label']}>
          Description:
        </label>
        <input
          type="text"
          id="program-description"
          name="program-description"
          placeholder="Enter a description..."
          className={styles['select-input']}
        />

        {/* TYPE */}
        <label htmlFor="program-type" className={styles['text-label']}>
          Type:
        </label>
        <SelectInput select={programTypes.select} />

        {/* DURANTION */}
        <label htmlFor="program-duration" className={styles['text-label']}>
          Durantion:
        </label>
        <input
          type="text"
          id="program-duration"
          name="program-duration"
          placeholder="Enter a duration..."
          className={styles['select-input']}
        />

        {/* SEQUENCE */}
        <label htmlFor="program-sequence" className={styles['text-label']}>
          Sequence:
        </label>
        <SelectInput
          select={programSequence.select}
          selectedValue={sequenceType}
          setValue={setSequenceType}
        />

        {/* WEEKLY PLAN */}
        {workouts &&
          sequenceType === 'Weekly' &&
          daysOfTheWeek.map((day) => (
            <AddWorkoutPlan
              key={`workoutPlan-${day}`}
              workouts={workoutsInfo}
              title={day}
            />
          ))}

        {/* CYCLE PLAN */}
        {workouts && sequenceType === 'Cycle' && (
          <IncrementalWorkoutPlan workoutsInfo={workoutsInfo} />
        )}

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          id="add-program-btn"
          className={styles['submit-btn']}
        >
          Add program
        </button>
      </form>
    </section>
  );
};

export default AddProgram;
