import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllWorkoutNames } from "../../../../util/apis/activities/workouts/workoutsApis";
import { postProgram } from "../../../../util/apis/activities/programs/programsApis";
import AddWorkoutPlan from "./AddWorkoutPlan";
import IncrementalWorkoutPlan from "./IncrementalWorkoutPlan";
import FormSelectInput from "../../../UI/Selects/FormSelectInput";
import TextFormInput from "../../../UI/Inputs/TextFormInput";
import TextAreaFormInput from "../../../UI/Inputs/TextAreaFormInput";

//IMPROVE: Consider moving these values to a different file
const programTypes = {
  select: {
    id: "program-type",
    name: "type",
    options: [
      { value: "", label: "Choose a type", disabled: true },
      { value: "Strength", label: "Strength" },
      { value: "Hypertrophy", label: "Hypertrophy" },
      { value: "Endurance", label: "Endurance" },
      { value: "Mixed", label: "Mixed" },
    ],
  },
};

const programSequence = {
  select: {
    id: "program-sequence",
    name: "sequence",
    options: [
      { value: "", label: "Choose a sequence", disabled: true },
      { value: "Weekly", label: "Weekly" },
      { value: "Cycle", label: "Cycle" },
    ],
  },
};

const textInputValues = {
  name: {
    name: "name",
    label: "Name",
    type: "text",
    id: "program-name",
    placeholder: "Enter a name",
    requiredField: true,
  },
  description: {
    name: "description",
    label: "Description",
    type: "text",
    id: "program-description",
    placeholder: "Enter a description",
    requiredField: false,
  },
  duration: {
    name: "duration",
    label: "Duration",
    type: "number",
    id: "program-duration",
    placeholder: "Enter a duration in weeks",
    requiredField: true,
  },
  image: {
    name: "linkToImage",
    label: "Image",
    type: "text",
    id: "program-image",
    placeholder: "Enter an image link",
    requiredField: true,
  },
};

const workoutsInfo = {
  select: {
    id: "workoutPlan-workout",
    name: "workoutPlanWorkout",
    value: "_id",
    label: "name",
    options: [],
  },
};

const daysOfTheWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thrusday",
  "Friday",
  "Saturday",
  "Sunday",
];

const AddProgram = (props) => {
  const navigateTo = useNavigate();
  const [workouts, setWorkouts] = useState(null);
  const [sequence, setSequence] = useState("");
  workoutsInfo.select.options = workouts;

  useEffect(() => {
    fetchAllWorkoutNames().then((response) => {
      if (!response || !response.isSuccess) return;

      //adds an empty default option
      response.body.unshift({
        _id: "",
        name: "Choose a workout",
      });
      setWorkouts(response.body);
    });
  }, []);

  const addProgram = (e) => {
    e.preventDefault();
    const formVals = getFormValues(e.target.elements);
    // console.log('formVals:  ', formVals);

    postProgram(formVals).then((response) => {
      // console.log('Response: ', response);
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
    values.duration = elements.duration.value;
    values.sequence = elements.sequence.value;
    values.linkToImage = elements.linkToImage.value;
    values.workouts = {};

    //extracting workout plans info
    values.workouts.workoutIds = extractMultiOptionValues(
      elements.workoutPlanWorkout
    );

    values.workouts =
      values.sequence === "Weekly"
        ? extractWeeklyWorkoutPlanValues(values.workouts.workoutIds)
        : extractCycleWorkoutPlanValues(values.workouts.workoutIds);

    return values;
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

  const extractWeeklyWorkoutPlanValues = (workoutIds) => {
    const workoutPlanValues = [];
    if (!workoutIds || workoutIds.length !== 7) return null;

    daysOfTheWeek.forEach((day, index) => {
      let planVals = {};
      planVals.dayOfTheWeek = day;
      planVals.workout = workoutIds[index];

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
      planVals.workout = id;

      workoutPlanValues.push(planVals);
    });

    return workoutPlanValues;
  };

  return (
    <form
      id="add-program"
      onSubmit={addProgram}
      className="mx-5 mt-10 space-y-6 divide-y divide-gray-200 rounded-lg bg-white px-10 pb-6 shadow lg:mx-auto lg:max-w-[75%] xl:max-w-[60%]"
    >
      <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
        <div>
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Add Program
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Add a new program to the program library by filling out the form below.
          </p>
        </div>
        <div className="space-y-6 sm:space-y-5">
          <TextFormInput {...textInputValues.name} />
          <TextAreaFormInput {...textInputValues.description} />
          <FormSelectInput
            label="Type"
            select={programTypes.select}
            selectedValue=""
            requiredField={true}
          />
          <TextFormInput {...textInputValues.duration} />
          <TextFormInput {...textInputValues.image} />
          <FormSelectInput
            label="Sequence"
            select={programSequence.select}
            selectedValue={sequence}
            setValue={setSequence}
            requiredField={true}
          />
        </div>
      </div>

      {/* WEEKLY PLAN */}
      {workouts && sequence === "Weekly" && (
        <div>
          <div className="mt-10">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Add Workouts
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Choose a workout per each day of the week.
            </p>
          </div>
          {daysOfTheWeek.map((day) => (
            <AddWorkoutPlan
              key={`workoutPlan-${day}`}
              workouts={workoutsInfo}
              title={day}
            />
          ))}
        </div>
      )}

      {/* CYCLE PLAN */}
      {workouts && sequence === "Cycle" && (
        <div>
          <div className="mt-10">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Add Workouts
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Add all the required workouts for this program.
            </p>
          </div>
          <IncrementalWorkoutPlan workoutsInfo={workoutsInfo} />
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

export default AddProgram;
