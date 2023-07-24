import {
  WorkoutTargets,
  WorkoutTypes,
} from "../GlobalValues/WorkoutGlobalValues";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchAllExerciseNames } from "../../../../util/apis/activities/exercises/exercisesApis";
import {
  fetchWorkoutById,
  putWorkout,
} from "../../../../util/apis/activities/workouts/workoutsApis";
import TextAreaFormInput from "../../../UI/Inputs/TextAreaFormInput";
import TextFormInput from "../../../UI/Inputs/TextFormInput";
import FormSelectInput from "../../../UI/Selects/FormSelectInput";
import IncrementalExercisePlan from "./IncrementalExercisePlan";

const textInputValues = {
  name: {
    name: "name",
    label: "Name",
    type: "text",
    id: "workout-name",
    placeholder: "Enter a name",
    requiredField: true,
  },
  description: {
    name: "description",
    label: "Description",
    type: "text",
    id: "workout-description",
    placeholder: "Enter a description",
    requiredField: false,
  },
  variant: {
    name: "variant",
    label: "Variant",
    type: "text",
    id: "workout-variant",
    placeholder: "Enter a variant",
    requiredField: true,
  },
  image: {
    name: "linkToImage",
    label: "Image",
    type: "text",
    id: "workout-image",
    placeholder: "Enter an image link",
    requiredField: true,
  },
  thumbnail: {
    name: "linkToThumbnail",
    label: "Thumbnail",
    type: "text",
    id: "program-thumbnail",
    placeholder: "Enter a thumbnail link",
    requiredField: true,
  },
};

const exercisesInfo = {
  select: {
    id: "exerciseplan-exercise",
    name: "exercisePlanExercise",
    value: "_id",
    label: "name",
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
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [variant, setVariant] = useState("");
  const [type, setType] = useState("");
  const [target, setTarget] = useState("");
  const [linkToImage, setLinkToImage] = useState("");
  const [linkToThumbnail, setLinkToThumbnail] = useState("");
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
    setLinkToThumbnail(workout.linkToThumbnail);
    setExercisePlans(workout.exercises);
  }, [workout]);

  useEffect(() => {
    fetchAllExerciseNames().then((response) => {
      if (!response || !response.isSuccess) return;

      //adds an empty default option
      response.body.unshift({ _id: "", name: "-- Choose an exercise --" });
      setExercises(response.body);
    });
  }, []);

  //runs when update button is clicked
  const updateWorkout = (e) => {
    e.preventDefault();
    const formVals = getFormValues(e.target.elements);

    //console.log('formVals: ', formVals);
    putWorkout(id, formVals).then((response) => {
      //console.log('Response: ', response);
      if (response && response.isSuccess) {
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
    values.linkToThumbnail = elements.linkToThumbnail.value;
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
    elements = Object.prototype.toString.call(elements).includes("HTML", 0)
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
    <form
      id="update-workout-form"
      onSubmit={updateWorkout}
      className="mx-5 mt-10 space-y-6 divide-y divide-gray-200 rounded-lg bg-white px-10 pb-6 shadow lg:mx-auto lg:max-w-[75%] xl:max-w-[60%]"
    >
      <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
        <div>
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Update Workout
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Update the values of the current workout by editing the form below.
          </p>
        </div>
        <div className="space-y-6 sm:space-y-5">
          <TextFormInput
            {...textInputValues.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextAreaFormInput
            {...textInputValues.description}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextFormInput
            {...textInputValues.variant}
            value={variant}
            onChange={(e) => setVariant(e.target.value)}
          />
          <FormSelectInput
            label="Type"
            select={WorkoutTypes.select}
            selectedValue={type}
            requiredField={true}
          />
          <FormSelectInput
            label="Target"
            select={WorkoutTargets.select}
            selectedValue={target}
            requiredField={true}
          />
          <TextFormInput
            {...textInputValues.image}
            value={linkToImage}
            onChange={(e) => setLinkToImage(e.target.value)}
          />
          <TextFormInput
            {...textInputValues.thumbnail}
            value={linkToThumbnail}
            onChange={(e) => setLinkToThumbnail(e.target.value)}
          />
          
        </div>
      </div>

      {/* EXERCISE PLANS */}
      {exercises && (
        <div>
          <div className="mt-10">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Update Exercises
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Add all the required exercises for this workout.
            </p>
          </div>
          <IncrementalExercisePlan
            exercisesInfo={exercisesInfo}
            selectedPlans={exercisePlans}
          />
        </div>
      )}

      {/* SUBMIT BUTTON */}
      <div className="pt-5">
        <div className="flex justify-center gap-5 md:justify-end md:gap-3">
          <Link
            to={`/activities/workout/${id}`}
            className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 md:mt-0 md:w-auto"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md bg-cyan-700 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700 md:w-auto md:px-5"
          >
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default UpdateWorkout;
