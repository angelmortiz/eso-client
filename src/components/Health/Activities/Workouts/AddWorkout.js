import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllExerciseNames } from '../../../../util/apis/activities/exercises/exercisesApis';
import { postWorkout } from '../../../../util/apis/activities/workouts/workoutsApis';
import TextAreaFormInput from '../../../UI/Inputs/TextAreaFormInput';
import TextFormInput from '../../../UI/Inputs/TextFormInput';
import FormSelectInput from '../../../UI/Selects/FormSelectInput';
import SelectInput from '../../../UI/Selects/SelectInput';
import IncrementalExercisePlan from './IncrementalExercisePlan';

//IMPROVE: Consider moving these values to a different file
const workoutTypes = {
  select: {
    id: 'workout-types',
    name: 'type',
    options: [
      { value: '', label: 'Choose a type', disabled: true },
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
      { value: '', label: 'Choose a target', disabled: true },
      { value: 'Full Body', label: 'Full Body' },
      { value: 'Upper Body', label: 'Upper Body' },
      { value: 'Lower Body', label: 'Lower Body' },
      { value: 'Front Muscles', label: 'Front Muscles' },
      { value: 'Back Muscles', label: 'Back Muscles' },
      { value: 'Mixed', label: 'Mixed' },
    ],
  },
};

const textInputValues = {
  name: {
    name: 'name',
    label: 'Name',
    type: 'text',
    id: 'workout-name',
    placeholder: 'Enter a name',
    requiredField: true,
  },
  description: {
    name: 'description',
    label: 'Description',
    type: 'text',
    id: 'workout-description',
    placeholder: 'Enter a description',
    requiredField: false,
  },
  variant: {
    name: 'variant',
    label: 'Variant',
    type: 'text',
    id: 'workout-variant',
    placeholder: 'Enter a variant',
    requiredField: true,
  },
  image: {
    name: 'linkToImage',
    label: 'Image',
    type: 'text',
    id: 'program-image',
    placeholder: 'Enter an image link',
    requiredField: true,
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
      response.body.unshift({ _id: '', name: 'Choose an exercise' });
      setExercises(response.body);
    });
  }, []);

  const addWorkout = (e) => {
    e.preventDefault();
    let formVals = getFormValues(e.target.elements);
    //console.log('formVals', formVals);

    postWorkout(formVals).then((response) => {
      //console.log('Response: ', response);
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
    <form
      id="add-workout-form"
      onSubmit={addWorkout}
      className="mt-10 mx-5 pb-6 px-10 lg:mx-auto lg:max-w-[75%] xl:max-w-[60%] space-y-6 divide-y divide-gray-200 bg-white rounded-lg shadow"
    >
      <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
        <div>
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Add Workout
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Fill out the following form to add a new workout to the workout
            library.
          </p>
        </div>
        <div className="space-y-6 sm:space-y-5">
          <TextFormInput {...textInputValues.name} />
          <TextAreaFormInput {...textInputValues.description} />
          <TextFormInput {...textInputValues.variant} />
          <FormSelectInput
            label="Type"
            select={workoutTypes.select}
            selectedValue=""
            requiredField={true}
          />
          <FormSelectInput
            label="Target"
            select={workoutTargets.select}
            selectedValue=""
            requiredField={true}
          />
          <TextFormInput {...textInputValues.image} />
          
        </div>
      </div>

      {/* EXERCISE PLANS */}
      {exercises && (
        <div>
          <div className="mt-10">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Add Exercises
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Add all the required exercises for this workout.
            </p>
          </div>
          <IncrementalExercisePlan exercisesInfo={exercisesInfo} />
        </div>
      )}

      {/* SUBMIT BUTTON */}
      <div className="pt-5">
        <div className="flex justify-end gap-x-3">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md bg-cyan-700 py-2 px-5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddWorkout;
