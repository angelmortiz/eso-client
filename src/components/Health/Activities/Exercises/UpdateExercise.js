import { putExercise } from "../../../../util/apis/activities/exercises/exercisesApis";
import { useEffect, useState } from "react";
import { fetchAllEquipmentNames } from "../../../../util/apis/activities/equipments/equipmentsApis";
import { fetchAllMuscleNames } from "../../../../util/apis/activities/muscles/musclesApis";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchExerciseById } from "../../../../util/apis/activities/exercises/exercisesApis";
import {
  ExerciseCompoundMovement,
  ExerciseDifficulty,
  ExerciseTypes,
} from "../GlobalValues/ExerciseGlobalValues";
import TextFormInput from "../../../UI/Inputs/TextFormInput";
import FormSelectInput from "../../../UI/Selects/FormSelectInput";
import FormIncrementalSelect from "../../../UI/Selects/FormIncrementalSelect";

/** FIELDS DATA */
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
    id: "exercise-alternativeName",
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

const UpdateExercise = (props) => {
  const navigateTo = useNavigate();
  const { id } = useParams();
  const [exercise, setExercise] = useState(null);
  const [musclesOptions, setMuscles] = useState([]);
  const [equipmentsOptions, setEquipmentsOptions] = useState([]);
  selectInputValues.mainMuscleInfo.select.options = musclesOptions;
  selectInputValues.secondaryMusclesInfo.select.options = musclesOptions;
  selectInputValues.equipmentsInfo.select.options = equipmentsOptions;

  /** INPUT VALUES */
  const [name, setName] = useState("");
  const [alternativeName, setAlternativeName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [compoundMovement, setCompoundMovement] = useState("");
  const [mainMuscle, setMainMuscle] = useState("");
  const [secondaryMuscles, setSecondaryMuscles] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [types, setTypes] = useState([]);
  const [linkToImage, setLinkToImage] = useState("");
  const [linkToVideo, setLinkToVideo] = useState("");
  /** */

  //Gets the most updated info from current exercise
  useEffect(() => {
    if (!id) console.log(`Error: exercise id not found in the url.`);
    fetchExerciseById(id).then((response) => {
      if (!response || !response.isSuccess) return;
      setExercise(response.body);
    });
  }, [id]);

  //Sets input values based on the current info fetched from the db
  useEffect(() => {
    if (!exercise) return;
    setName(exercise.name);
    setAlternativeName(exercise.alternativeName);
    setDifficulty(exercise.difficulty);
    setCompoundMovement(exercise.compoundMovement ? "yes" : "no");
    setMainMuscle(exercise.mainMuscle?._id);
    setSecondaryMuscles(
      extractSelectedValues(exercise.secondaryMuscles, "_id")
    );
    setEquipments(extractSelectedValues(exercise.equipments, "_id"));
    setTypes(exercise.types);
    setLinkToImage(exercise.linkToImage);
    setLinkToVideo(exercise.linkToVideo);
  }, [exercise]);

  const extractSelectedValues = (arrObjs, propertyName) => {
    return arrObjs.map((obj) => obj[propertyName]);
  };

  //Fetches options for muscles and equipments
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
      setEquipmentsOptions(response.body);
    });
  }, []);

  /** FUNCTIONS */
  //runs when update button is clicked
  const updateExercise = (e) => {
    e.preventDefault();
    const formVals = getFormValues(e.target.elements);

    putExercise(id, formVals).then((response) => {
      //console.log('Response: ', response);
      if (response && response.isSuccess) {
        //Navigate to the just updated exercise id
        navigateTo(`/activities/exercise/${id}`);
      }
    });
  };

  const getFormValues = (elements) => {
    const values = {};
    values.id = id;
    values.name = elements.name.value;
    values.alternativeName = elements.alternativeName.value;
    values.difficulty = elements.difficulty.value;
    values.compoundMovement = elements.compoundMovement.value === "yes";
    values.linkToImage = elements.linkToImage.value;
    values.linkToVideo = elements.linkToVideo.value;
    values.mainMuscle = elements.mainMuscle.value;

    //extract values from multi-select options
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

  /** Render */
  return (
    <form
      id="update-exercise-form"
      onSubmit={updateExercise}
      className="mx-5 mt-10 space-y-6 divide-y divide-gray-200 rounded-lg bg-white px-10 pb-6 shadow lg:mx-auto lg:max-w-[75%] xl:max-w-[60%]"
    >
      <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
        <div>
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Update Exercise
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Update the values of the current exercise by editing the form below.
          </p>
        </div>
        <div className="space-y-6 sm:space-y-5">
          <TextFormInput
            {...textInputValues.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextFormInput
            {...textInputValues.alternativeName}
            value={alternativeName}
            onChange={(e) => setAlternativeName(e.target.value)}
          />
          <FormSelectInput
            label="Difficulty"
            select={ExerciseDifficulty.select}
            selectedValue={difficulty}
            requiredField={true}
          />
          <FormSelectInput
            label="Compound?"
            select={ExerciseCompoundMovement.select}
            selectedValue={compoundMovement}
            requiredField={true}
          />
          <FormSelectInput
            label="Main muscle"
            select={selectInputValues.mainMuscleInfo.select}
            selectedValue={mainMuscle}
            requiredField={true}
          />
          <TextFormInput
            {...textInputValues.image}
            value={linkToImage}
            onChange={(e) => setLinkToImage(e.target.value)}
          />
          <TextFormInput
            {...textInputValues.video}
            value={linkToVideo}
            onChange={(e) => setLinkToVideo(e.target.value)}
          />
        </div>
      </div>

      {/* SECONDARY MUSCLES */}
      <div>
        <div className="mt-10">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Update secondary muscles
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Add all the secondary muscles worked by this exercise.
          </p>
        </div>
        {musclesOptions && musclesOptions.length && (
          <FormIncrementalSelect
            info={selectInputValues.secondaryMusclesInfo}
            selectedValues={secondaryMuscles}
          />
        )}
      </div>

      {/* TYPES */}
      <div>
        <div className="mt-10">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Update exercise types
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Add all the types associated to this exercise.
          </p>
        </div>
        <FormIncrementalSelect info={ExerciseTypes} selectedValues={types} />
      </div>

      {/* EQUIPMENTS */}
      <div>
        <div className="mt-10">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Update equipments
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Add all the equipments required to perform this exercise.
          </p>
        </div>
        {equipmentsOptions && equipmentsOptions.length && (
          <FormIncrementalSelect
            info={selectInputValues.equipmentsInfo}
            selectedValues={equipments}
          />
        )}
      </div>

      {/* SUBMIT BUTTON */}
      <div className="pt-5">
        <div className="flex justify-end gap-x-3">
          <Link
            to={`/activities/exercise/${id}`}
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md bg-cyan-700 py-2 px-5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700"
          >
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default UpdateExercise;
