import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchAllWorkoutNames } from "../../../../util/apis/activities/workouts/workoutsApis";
import {
  fetchProgramById,
  putProgram,
} from "../../../../util/apis/activities/programs/programsApis";
import {
  ProgramSequence,
  ProgramTypes,
} from "../GlobalValues/ProgramGlobalValues";
import { DaysOfTheWeek } from "../GlobalValues/General";
import AddWorkoutPlan from "./AddWorkoutPlan";
import IncrementalWorkoutPlan from "./IncrementalWorkoutPlan";
import TextFormInput from "../../../UI/Inputs/TextFormInput";
import TextAreaFormInput from "../../../UI/Inputs/TextAreaFormInput";
import FormSelectInput from "../../../UI/Selects/FormSelectInput";

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

const UpdateProgram = (props) => {
  const navigateTo = useNavigate();
  const { id } = useParams();
  const [program, setProgram] = useState();
  const [workouts, setWorkouts] = useState(null);
  const [sequence, setSequence] = useState("");
  workoutsInfo.select.options = workouts;

  /** INPUT VALUES */
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [duration, setDuration] = useState(0);
  const [linkToImage, setLinkToImage] = useState("");
  const [workoutPlans, setWorkoutPlans] = useState([]);
  /** */

  //Gets the most updated info from current program
  useEffect(() => {
    if (!id) console.log(`Error: program id not found in the url.`);
    fetchProgramById(id).then((response) => {
      if (!response || !response.isSuccess) return;
      setProgram(response.body);
    });
  }, [id]);

  //Sets input values based on the current info fetched from the db
  useEffect(() => {
    if (!program) return;
    setName(program.name);
    setDescription(program.description);
    setType(program.type);
    setDuration(program.duration);
    setLinkToImage(program.linkToImage);
    setSequence(program.sequence);
    setWorkoutPlans(program.workouts);
  }, [program]);

  useEffect(() => {
    fetchAllWorkoutNames().then((response) => {
      if (!response || !response.isSuccess) return;

      //adds an empty default option
      response.body.unshift({ _id: "", name: "Choose a workout" });
      setWorkouts(response.body);
    });
  }, []);

  const updateProgram = (e) => {
    e.preventDefault();
    const formVals = getFormValues(e.target.elements);
    //console.log('formVals:  ', formVals);

    putProgram(id, formVals).then((response) => {
      //console.log('Response: ', response);
      if (response.isSuccess) {
        navigateTo(`/activities/program/${id}`);
      }
    });
  };

  const getFormValues = (elements) => {
    const values = {};
    values.id = id;
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

    DaysOfTheWeek.forEach((day, index) => {
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
      id="update-program"
      onSubmit={updateProgram}
      className="mx-5 mt-10 space-y-6 divide-y divide-gray-200 rounded-lg bg-white px-10 pb-6 shadow lg:mx-auto lg:max-w-[75%] xl:max-w-[60%]"
    >
      <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
        <div>
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Update Program
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Update the values of the current program by editing the form below.
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
          <FormSelectInput
            label="Type"
            select={ProgramTypes.select}
            selectedValue={type}
            requiredField={true}
          />
          <TextFormInput
            {...textInputValues.duration}
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <TextFormInput
            {...textInputValues.image}
            value={linkToImage}
            onChange={(e) => setLinkToImage(e.target.value)}
          />
          <FormSelectInput
            label="Sequence"
            select={ProgramSequence.select}
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
              Update Workouts
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Choose a workout per each day of the week.
            </p>
          </div>
          {DaysOfTheWeek.map((day) => (
            <AddWorkoutPlan
              key={`workoutPlan-${day}`}
              workouts={workoutsInfo}
              title={day}
              selectedPlan={workoutPlans.find((wo) => wo.dayOfTheWeek === day)}
            />
          ))}
        </div>
      )}

      {/* CYCLE PLAN */}
      {workouts && sequence === "Cycle" && (
        <div>
          <div className="mt-10">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Update Workouts
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Add all the required workouts for this program.
            </p>
          </div>
          <IncrementalWorkoutPlan
            workoutsInfo={workoutsInfo}
            selectedPlans={workoutPlans}
          />
        </div>
      )}

      {/* SUBMIT BUTTON */}
      <div className="pt-5">
        <div className="flex justify-center gap-5 md:justify-end md:gap-3">
          <Link
            to={`/activities/program/${id}`}
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

export default UpdateProgram;
