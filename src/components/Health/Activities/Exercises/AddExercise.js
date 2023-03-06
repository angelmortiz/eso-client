import IncrementalSelect from '../../../UI/Selects/IncrementalSelect';
import SelectInput from '../../../UI/Selects/SelectInput';
import styles from '../../../UI/General/CSS/Form.module.css';
import { postExercise } from '../../../../util/apis/activities/exercises/exercisesApis';
import { useEffect, useState } from 'react';
import { fetchAllEquipmentNames } from '../../../../util/apis/activities/equipments/equipmentsApis';
import { fetchAllMuscleNames } from '../../../../util/apis/activities/muscles/musclesApis';
import { useNavigate } from 'react-router-dom';

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

const AddExercise = (props) => {
  const navigateTo = useNavigate();
  const [muscles, setMuscles] = useState([]);
  const [equipments, setEquipments] = useState([]);
  mainMuscleInfo.select.options = muscles;
  secondaryMusclesInfo.select.options = muscles;
  equipmentsInfo.select.options = equipments;

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
      setEquipments(response.body);
    });
  }, []);

  /** Functions */
  const addExercise = (e) => {
    e.preventDefault();
    const formVals = getFormValues(e.target.elements);
    console.log(formVals);
    postExercise(formVals).then((response) => {
      //console.log('Response: ', response);
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
    values.compoundMovement = elements.compoundMovement.value === 'yes';
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
        id="add-exercise-form"
        onSubmit={addExercise}
        className={styles['main-form']}
      >
        <h1 className={styles['form-title']}>Add Exercise</h1>

        {/* NAME */}
        <label htmlFor="exercise-name" className={styles['text-label']}>
          Name:
        </label>
        <input
          type="text"
          id="exercise-name"
          name="name"
          placeholder="Enter the exercise name..."
          className={styles['select-input']}
        />

        {/* ALTERNATIVE NAME */}
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
        />

        {/* DIFFICULTY */}
        <label htmlFor="exercise-difficulty" className={styles['text-label']}>
          Difficulty:
        </label>
        <SelectInput select={difficultyInfo.select} />

        {/* COMPOUND MOVEMENT */}
        <label
          htmlFor="exercise-compoundMovement"
          className={styles['text-label']}
        >
          Compound movement:
        </label>
        <SelectInput select={compoundMovementInfo.select} />

        {/* MAIN MUSCLE */}
        <label htmlFor="exercise-mainMuscle" className={styles['text-label']}>
          Main muscle:
        </label>
        {muscles && muscles.length ? (
          <SelectInput select={mainMuscleInfo.select} />
        ) : (
          <img
            src="/loading.gif"
            alt="Loading..."
            className={styles['loading-img']}
          />
        )}

        {/* SECONDARY MUSCLES */}
        <label
          htmlFor="exercise-secondaryMuscles"
          className={styles['text-label']}
        >
          Secondary muscles:
        </label>
        {muscles && muscles.length ? (
          <IncrementalSelect info={secondaryMusclesInfo} />
        ) : (
          <img
            src="/loading.gif"
            alt="Loading..."
            className={styles['loading-img']}
          />
        )}

        {/* TYPES */}
        <label htmlFor="exercise-types" className={styles['text-label']}>
          Types:
        </label>
        <IncrementalSelect info={typesInfo} />

        {/* EQUIPMENTS */}
        <label htmlFor="exercise-equipments" className={styles['text-label']}>
          Equipments:
        </label>
        {equipments && equipments.length ? (
          <IncrementalSelect info={equipmentsInfo} />
        ) : (
          <img
            src="/loading.gif"
            alt="Loading..."
            className={styles['loading-img']}
          />
        )}

        {/* IMAGE */}
        <label htmlFor="exercise-image" className={styles['text-label']}>
          Image:
        </label>
        <input
          type="text"
          id="exercise-image"
          name="linkToImage"
          placeholder="Enter the link for the image..."
          className={styles['select-input']}
        />

        {/* VIDEO */}
        <label htmlFor="exercise-video" className={styles['text-label']}>
          Video:
        </label>
        <input
          type="text"
          id="exercise-video"
          name="linkToVideo"
          placeholder="Enter the link for the video..."
          className={styles['select-input']}
        />

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          id="add-exercise-btn"
          className={styles['submit-btn']}
        >
          Add exercise
        </button>
      </form>
    </section>
  );
};

export default AddExercise;
