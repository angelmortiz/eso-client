import TextFormInput from "../../../UI/Inputs/TextFormInput";
import FormSelectInput from "../../../UI/Selects/FormSelectInput";
import FormIncrementalSelect from "../../../UI/Selects/FormIncrementalSelect";
import { postExercise } from "../../../../util/apis/activities/exercises/exercisesApis";
import { useEffect, useState } from "react";
import { fetchAllEquipmentNames } from "../../../../util/apis/activities/equipments/equipmentsApis";
import { fetchAllMuscleNames } from "../../../../util/apis/activities/muscles/musclesApis";
import { useNavigate } from "react-router-dom";

/** FIELDS DATA */
const difficultyInfo = {
  select: {
    id: "exercise-difficulty",
    name: "difficulty",
    options: [
      { value: "", label: "Choose a difficulty", disabled: true },
      { value: "Easy", label: "Easy" },
      { value: "Intermediate", label: "Intermediate" },
      { value: "Advanced", label: "Advanced" },
    ],
  },
};

const compoundMovementInfo = {
  select: {
    id: "exercise-compoundMovement",
    name: "compoundMovement",
    options: [
      { value: "", label: "Choose an option", disabled: true },
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
};

const typesInfo = {
  label: {
    label: "Type",
  },
  select: {
    id: "exercise-types",
    name: "types",
    options: [
      // TODO: Pull values from backend
      { value: "", label: "Choose a type" },
      { value: "HIIT", label: "HIIT" },
      { value: "Strength", label: "Strength" },
    ],
  },
  button: {
    id: "add-type-btn",
    label: "Add type",
  },
};

const selectInputValues = {
  mainMuscleInfo: {
    label: {
      label: "Main muscle",
    },
    select: {
      id: "exercise-mainMuscle",
      name: "mainMuscle",
      value: "_id",
      label: "name",
      options: [],
    },
  },
  secondaryMusclesInfo: {
    label: {
      label: "Muscle",
    },
    select: {
      id: "exercise-secondaryMuscle",
      name: "secondaryMuscles",
      value: "_id",
      label: "name",
      options: [],
    },
    button: {
      id: "add-muscle-btn",
      label: "Add muscle",
    },
  },
  equipmentsInfo: {
    label: {
      label: "Equipment",
    },
    select: {
      id: "exercise-equipments",
      name: "equipments",
      value: "_id",
      label: "name",
      options: [],
    },
    button: {
      id: "add-equipment-btn",
      label: "Add equipment",
    },
  },
};

const textInputValues = {
  name: {
    name: "name",
    label: "Name",
    type: "text",
    id: "exercise-name",
    placeholder: "Enter a name",
    requiredField: true,
  },
  alternativeName: {
    name: "alternativeName",
    label: "Alternative name",
    type: "text",
    id: "exercise-description",
    placeholder: "Enter an alternative name",
    requiredField: false,
  },
  image: {
    name: "linkToImage",
    label: "Image link",
    type: "text",
    id: "exercise-image",
    placeholder: "Enter an image link",
    requiredField: true,
  },
  video: {
    name: "linkToVideo",
    label: "Video link",
    type: "text",
    id: "exercise-video",
    placeholder: "Enter a video link",
    requiredField: true,
  },
};
/** [END] FIELDS DATA */

const AddExercise = (props) => {
  const navigateTo = useNavigate();
  const [muscles, setMuscles] = useState([]);
  const [equipments, setEquipments] = useState([]);
  selectInputValues.mainMuscleInfo.select.options = muscles;
  selectInputValues.secondaryMusclesInfo.select.options = muscles;
  selectInputValues.equipmentsInfo.select.options = equipments;

  useEffect(() => {
    fetchAllMuscleNames().then((response) => {
      if (!response || !response.isSuccess) return;
      //adds an empty default option
      response.body.unshift({
        _id: "",
        name: "Choose a muscle",
      });
      setMuscles(response.body);
    });

    fetchAllEquipmentNames().then((response) => {
      if (!response || !response.isSuccess) return;
      //adds an empty default option
      response.body.unshift({
        _id: "",
        name: "Choose an equipment",
      });
      setEquipments(response.body);
    });
  }, []);

  /** Functions */
  const addExercise = (e) => {
    e.preventDefault();
    const formVals = getFormValues(e.target.elements);
    // console.log("formVals: ", formVals);

    postExercise(formVals).then((response) => {
      // console.log('Response: ', response);
      if (response.isSuccess) {
        //IMPROVE: Navigate to the just added exercise id
        navigateTo(`/activities/exercises/`);
      }
    });
  };

  const getFormValues = (elements) => {
    const values = {};
    values.name = elements.name.value;
    values.alternativeName = elements.alternativeName.value;
    values.difficulty = elements.difficulty.value;
    values.compoundMovement = elements.compoundMovement.value === "yes";
    values.linkToImage = elements.linkToImage.value;
    values.linkToVideo = elements.linkToVideo.value;
    values.mainMuscle = elements.mainMuscle.value;

    // multi-select options
    values.secondaryMuscles = extractMultiOptionValues(
      elements.secondaryMuscles
    );
    values.types = extractMultiOptionValues(elements.types);
    values.equipments = extractMultiOptionValues(elements.equipments);

    return values;
  };

  const extractMultiOptionValues = (elements) => {
    //if there is only one select dropdown, it adds the HTMLSelectElement to an array before extracting the value.
    //if there are multiple select dropdowns, converts the RadioNodeList into an array (to later use .map()).
    elements = Object.prototype.toString
      .call(elements)
      .includes("HTMLSelectElement")
      ? [elements]
      : [...elements];

    let values = elements.map((element) => {
      return element.value;
    });
    values = values.filter((v) => v); //removes empty selections
    values = [...new Set(values)]; //removes duplicate values
    return values;
  };

  return (
    <form
      id="add-exercise-form"
      onSubmit={addExercise}
      className="mx-5 mt-10 space-y-6 divide-y divide-gray-200 rounded-lg bg-white px-10 pb-6 shadow lg:mx-auto lg:max-w-[75%] xl:max-w-[60%]"
    >
      <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
        <div>
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Add Exercise
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Add a new exercise to the exercise library by filling out the form
            below.
          </p>
        </div>
        <div className="space-y-6 sm:space-y-5">
          <TextFormInput {...textInputValues.name} />
          <TextFormInput {...textInputValues.alternativeName} />
          <FormSelectInput
            label="Difficulty"
            select={difficultyInfo.select}
            selectedValue=""
            requiredField={true}
          />
          <FormSelectInput
            label="Compound?"
            select={compoundMovementInfo.select}
            selectedValue=""
            requiredField={true}
          />
          <FormSelectInput
            label="Main muscle"
            select={selectInputValues.mainMuscleInfo.select}
            selectedValue=""
            requiredField={true}
          />
          <TextFormInput {...textInputValues.image} />
          <TextFormInput {...textInputValues.video} />
        </div>
      </div>

      {/* SECONDARY MUSCLES */}
      <div>
        <div className="mt-10">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Add secondary muscles
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Add all the secondary muscles worked by this exercise.
          </p>
        </div>
        {muscles && muscles.length && (
          <FormIncrementalSelect
            info={selectInputValues.secondaryMusclesInfo}
          />
        )}
      </div>

      {/* TYPES */}
      <div>
        <div className="mt-10">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Add exercise types
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Add all the types associated to this exercise.
          </p>
        </div>
        <FormIncrementalSelect info={typesInfo} />
      </div>

      {/* EQUIPMENTS */}
      <div>
        <div className="mt-10">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Add equipments
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Add all the equipments required to perform this exercise.
          </p>
        </div>
        {equipments && equipments.length && (
          <FormIncrementalSelect info={selectInputValues.equipmentsInfo} />
        )}
      </div>

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

export default AddExercise;
