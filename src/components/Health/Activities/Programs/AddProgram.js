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
      id: 'program-type',
      name: 'type',
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
    console.log('formVals:  ', formVals);
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
    values.durantion = elements.duration.value;
    values.sequence = elements.sequence.value;
    values.linkToImage = elements.linkToImage.value;
    values.workouts = {};

    //extracting workout plans info
    values.workouts.workoutIds = extractMultiOptionValues(
      elements.workoutPlanWorkout
    );

    values.workouts =
      values.sequence === 'Weekly'
        ? extractWeeklyWorkoutPlanValues(values.workouts.workoutIds)
        : extractCycleWorkoutPlanValues(values.workouts.workoutIds);

    return values;
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

  const extractWeeklyWorkoutPlanValues = (workoutIds) => {
    const workoutPlanValues = [];
    if (!workoutIds || workoutIds.length !== 7) return null;

    daysOfTheWeek.forEach((day, index) => {
      let planVals = {};
      planVals.dayOfTheWeek = day;
      planVals.workoutId = workoutIds[index];

      workoutPlanValues.push(planVals);
    });

    return workoutPlanValues;
  };

  const extractCycleWorkoutPlanValues = (workoutIds) => {
    const workoutPlanValues = [];
    if (!workoutIds || workoutIds.length === 0) return null;

    workoutIds.forEach((id, index) => {
      let planVals = {};
      planVals.dayNumber = index + 1;
      planVals.workoutId = id;

      workoutPlanValues.push(planVals);
    });

    return workoutPlanValues;
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
          name="description"
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
          name="duration"
          placeholder="Enter a duration..."
          className={styles['select-input']}
        />
        {/* LINK TO IMAGE */}
        <label htmlFor="programLinkToImage" className={styles['text-label']}>
          Image:
        </label>
        <input
          type="text"
          id="program-linkToImage"
          name="linkToImage"
          placeholder="Enter a image link..."
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
