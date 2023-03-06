import IncrementalSelect from '../../../UI/Selects/IncrementalSelect';
import SelectInput from '../../../UI/Selects/SelectInput';
import styles from '../../../UI/General/CSS/Form.module.css';
import { putExercise } from '../../../../util/apis/activities/exercises/exercisesApis';
import { useEffect, useState } from 'react';
import { fetchAllEquipmentNames } from '../../../../util/apis/activities/equipments/equipmentsApis';
import { fetchAllMuscleNames } from '../../../../util/apis/activities/muscles/musclesApis';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchExerciseById } from '../../../../util/apis/activities/exercises/exercisesApis';

/** FIELDS DATA */
const difficultyInfo = {
  select: {
    id: 'exercise-difficulty',
    name: 'difficulty',
    options: [
      { value: '', label: '-- Choose difficulty --' },
      { value: 'Easy', label: 'Easy' },
      { value: 'Intermediate', label: 'Intermediate' },
      { value: 'Advanced', label: 'Advanced' },
    ],
  },
};

const compoundMovementInfo = {
  select: {
    id: 'exercise-compoundMovement',
    name: 'compoundMovement',
    options: [
      { value: '', label: '-- Choose option --' },
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
  },
};

const mainMuscleInfo = {
  select: {
    id: 'exercise-mainMuscle',
    name: 'mainMuscle',
    value: '_id',
    label: 'name',
    options: [],
  },
};

const secondaryMusclesInfo = {
  select: {
    id: 'exercise-secondaryMuscle',
    name: 'secondaryMuscles',
    value: '_id',
    label: 'name',
    options: [],
  },
  button: {
    id: 'add-muscle-btn',
    label: 'Add muscle',
  },
};

const typesInfo = {
  select: {
    id: 'exercise-types',
    name: 'types',
    options: [
      // TODO: Pull values from backend
      { value: '', label: '-- Choose a type --' },
      { value: 'HIIT', label: 'HIIT' },
      { value: 'Strength', label: 'Strength' },
    ],
  },
  button: {
    id: 'add-type-btn',
    label: 'Add type',
  },
};

const equipmentsInfo = {
  select: {
    id: 'exercise-equipments',
    name: 'equipments',
    value: '_id',
    label: 'name',
    options: [],
  },
  button: {
    id: 'add-equipment-btn',
    label: 'Add equipment',
  },
};
/** [END] FIELDS DATA */

const UpdateExercise = (props) => {
  const navigateTo = useNavigate();
  const { id } = useParams();
  const [exercise, setExercise] = useState(null);
  const [musclesOptions, setMuscles] = useState([]);
  const [equipmentsOptions, setEquipmentsOptions] = useState([]);
  mainMuscleInfo.select.options = musclesOptions;
  secondaryMusclesInfo.select.options = musclesOptions;
  equipmentsInfo.select.options = equipmentsOptions;

  /** INPUT VALUES */
  const [name, setName] = useState('');
  const [alternativeName, setAlternativeName] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [compoundMovement, setCompoundMovement] = useState('');
  const [mainMuscle, setMainMuscle] = useState('');
  const [secondaryMuscles, setSecondaryMuscles] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [types, setTypes] = useState([]);
  const [linkToImage, setLinkToImage] = useState('');
  const [linkToVideo, setLinkToVideo] = useState('');
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
    setCompoundMovement(exercise.compoundMovement ? 'yes' : 'no');
    setMainMuscle(exercise.mainMuscle?._id);
    setSecondaryMuscles(
      extractSelectedValues(exercise.secondaryMuscles, '_id')
    );
    setEquipments(extractSelectedValues(exercise.equipments, '_id'));
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
      response.body.unshift({ _id: '', name: '-- Choose a muscle --' });
      setMuscles(response.body);
    });

    fetchAllEquipmentNames().then((response) => {
      if (!response || !response.isSuccess) return;
      //adds an empty default option
      response.body.unshift({ _id: '', name: '-- Choose an equipment --' });
      setEquipmentsOptions(response.body);
    });
  }, []);

  /** FUNCTIONS */
  //runs when update button is clicked
  const UpdateExercise = (e) => {
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
    values.compoundMovement = elements.compoundMovement.value === 'yes';
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
      .includes('HTMLSelectElement')
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
    <section className={styles['main-section']}>
      <form
        id="update-exercise-form"
        onSubmit={UpdateExercise}
        className={styles['main-form']}
      >
        <h1 className={styles['form-title']}>Update Exercise</h1>

        <div className={styles['form-content']}>
          {/* NAME */}
          <div className={styles['form-input']}>
            <label htmlFor="exercise-name" className={styles['text-label']}>
              Name:
            </label>
            <input
              type="text"
              id="exercise-name"
              name="name"
              placeholder="Enter the exercise name..."
              className={styles['select-input']}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* ALTERNATIVE NAME */}
          <div className={styles['form-input']}>
            <label
              htmlFor="exercise-alternativeName"
              className={styles['text-label']}
            >
              Alternative name:
            </label>
            <input
              type="text"
              id="exercise-alternativeName"
              name="alternativeName"
              placeholder="Enter an alternative name..."
              className={styles['select-input']}
              value={alternativeName}
              onChange={(e) => setAlternativeName(e.target.value)}
            />
          </div>

          {/* DIFFICULTY */}
          <div className={styles['form-input']}>
            <label
              htmlFor="exercise-difficulty"
              className={styles['text-label']}
            >
              Difficulty:
            </label>
            <SelectInput
              select={difficultyInfo.select}
              selectedValue={difficulty}
            />
          </div>

          {/* COMPOUND MOVEMENT */}
          <div className={styles['form-input']}>
            <label
              htmlFor="exercise-compoundMovement"
              className={styles['text-label']}
            >
              Compound movement:
            </label>
            <SelectInput
              select={compoundMovementInfo.select}
              selectedValue={compoundMovement}
            />
          </div>

          {/* MAIN MUSCLE */}
          <div className={styles['form-input']}>
            <label
              htmlFor="exercise-mainMuscle"
              className={styles['text-label']}
            >
              Main muscle:
            </label>
            {musclesOptions && musclesOptions.length ? (
              <SelectInput
                select={mainMuscleInfo.select}
                selectedValue={mainMuscle}
              />
            ) : (
              <img
                src="/loading.gif"
                alt="Loading..."
                className={styles['loading-img']}
              />
            )}
          </div>

          {/* SECONDARY MUSCLES */}
          <div className={styles['form-input']}>
            <label
              htmlFor="exercise-secondaryMuscles"
              className={styles['text-label']}
            >
              Secondary muscles:
            </label>
            {musclesOptions && musclesOptions.length ? (
              <IncrementalSelect
                info={secondaryMusclesInfo}
                selectedValues={secondaryMuscles}
              />
            ) : (
              <img
                src="/loading.gif"
                alt="Loading..."
                className={styles['loading-img']}
              />
            )}
          </div>

          {/* TYPES */}
          <div className={styles['form-input']}>
            <label htmlFor="exercise-types" className={styles['text-label']}>
              Types:
            </label>
            <IncrementalSelect info={typesInfo} selectedValues={types} />
          </div>

          {/* EQUIPMENTS */}
          <div className={styles['form-input']}>
            <label
              htmlFor="exercise-equipments"
              className={styles['text-label']}
            >
              Equipments:
            </label>
            {equipmentsOptions && equipmentsOptions.length ? (
              <IncrementalSelect
                info={equipmentsInfo}
                selectedValues={equipments}
              />
            ) : (
              <img
                src="/loading.gif"
                alt="Loading..."
                className={styles['loading-img']}
              />
            )}
          </div>

          {/* IMAGE */}
          <div className={styles['form-input']}>
            <label htmlFor="exercise-image" className={styles['text-label']}>
              Image:
            </label>
            <input
              type="text"
              id="exercise-image"
              name="linkToImage"
              placeholder="Enter the link for the image..."
              className={styles['select-input']}
              value={linkToImage}
              onChange={(e) => setLinkToImage(e.target.value)}
            />
          </div>

          {/* VIDEO */}
          <div className={styles['form-input']}>
            <label htmlFor="exercise-video" className={styles['text-label']}>
              Video:
            </label>
            <input
              type="text"
              id="exercise-video"
              name="linkToVideo"
              placeholder="Enter the link for the video..."
              className={styles['select-input']}
              value={linkToVideo}
              onChange={(e) => setLinkToVideo(e.target.value)}
            />
          </div>
        </div>
        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          id="update-exercse-btn"
          className={styles['submit-btn']}
        >
          Update exercise
        </button>
      </form>
    </section>
  );
};

export default UpdateExercise;
