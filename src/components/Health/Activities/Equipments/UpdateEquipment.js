import IncrementalSelect from '../../../UI/Selects/IncrementalSelect';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAllExerciseNames } from '../../../../util/apis/activities/exercises/exercisesApis';
import {
  fetchEquipmentById,
  putEquipment,
} from '../../../../util/apis/activities/equipments/equipmentsApis';
import styles from '../../../UI/General/CSS/Form.module.css';
import SelectInput from '../../../UI/Selects/SelectInput';

const exercisesInfo = {
  select: {
    id: 'equipment-exercises',
    name: 'exercises',
    value: '_id',
    label: 'name',
    options: [],
  },
  button: {
    id: 'add-exercise-btn',
    label: 'Add exercise',
  },
};

const descriptionsInfo = {
  select: {
    id: 'equipments-description',
    name: 'description',
    options: [
      { value: '', label: '-- Choose a description --' },
      { value: 'Big', label: 'Big' },
      { value: 'Small', label: 'Small' },
    ],
  },
};

const UpdateEquipment = (props) => {
  const navigateTo = useNavigate();
  const { id } = useParams();
  const [equipment, setEquipment] = useState();
  const [exercises, setExercises] = useState();
  exercisesInfo.select.options = exercises;

  /** INPUT VALUES */
  const [name, setName] = useState('');
  const [alternativeName, setAlternativeName] = useState('');
  const [description, setDescription] = useState('');
  const [linkToImage, setLinkToImage] = useState('');
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  /** */

  useEffect(() => {
    fetchAllExerciseNames().then((response) => {
      if (!response || !response.isSuccess) return;
      //adds an empty default option
      response.body.unshift({ _id: '', name: '-- Choose an exercise --' });
      setExercises(response.body);
    });
  }, []);

  //Gets the most updated info from current equipment
  useEffect(() => {
    if (!id) console.log(`Error: equipment id not found in the url.`);
    fetchEquipmentById(id).then((response) => {
      if (!response || !response.isSuccess) return;
      setEquipment(response.body);
    });
  }, [id]);

  //Sets input values based on the current info fetched from the db
  useEffect(() => {
    if (!equipment) return;
    setName(equipment.name);
    setAlternativeName(equipment.alternativeName);
    setDescription(equipment.description);
    setLinkToImage(equipment.linkToImage);
    setEquipmentExercises(equipment.exercises.map((ex) => ex.exerciseId));
  }, [equipment]);

  const updateEquipment = (e) => {
    e.preventDefault();
    const formVals = getFormValues(e.target.elements);
    console.log('formVals:  ', formVals);

    putEquipment(id, formVals).then((response) => {
      console.log('Response: ', response);
      if (response.isSuccess) {
        //IMPROVE: Navigate to the just added equipment id
        navigateTo(`/activities/equipments`);
      }
    });
  };

  const getFormValues = (elements) => {
    const values = {};
    values.id = id;
    values.name = elements.name.value;
    values.alternativeName = elements.alternativeName.value;
    values.description = elements.description.value;
    values.linkToImage = elements.linkToImage.value;

    //extract values from multi-select options
    values.exercises = extractMultiOptionValues(elements.exercises);

    values.exercises = mapIdsToNames(
      values.exercises,
      exercises,
      'exerciseId',
      'exerciseName'
    );

    return values;
  };

  const mapIdsToNames = (values, mapArr, idProperty, nameProperty) => {
    //maps values to objects of ids and names (required for backend)
    return values.map((id) => {
      const name = mapArr.find((arr) => arr._id === id)?.name;
      return { [idProperty]: id, [nameProperty]: name };
    });
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

  return (
    <section className={styles['main-section']}>
      <form
        id="update-equipment-form"
        onSubmit={updateEquipment}
        className={styles['main-form']}
      >
        <h1 className={styles['form-title']}>Update Equipment</h1>

        {/* NAME */}
        <label htmlFor="equipment-name" className={styles['text-label']}>
          Name:
        </label>
        <input
          description="text"
          id="equipment-name"
          name="name"
          placeholder="Enter the equipment name..."
          className={styles['select-input']}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* ALTERNATIVE NAME */}
        <label
          htmlFor="equipment-alternativeName"
          className={styles['text-label']}
        >
          Alternative name:
        </label>
        <input
          description="text"
          id="equipment-alternativeName"
          name="alternativeName"
          placeholder="Enter an alternative name..."
          className={styles['select-input']}
          value={alternativeName}
          onChange={(e) => setAlternativeName(e.target.value)}
        />

        {/* DESCRIPTION */}
        <label
          htmlFor="equipment-description"
          className={styles['text-label']}
        >
          Description:
        </label>
        <input
          description="text"
          id="equipment-description"
          name="description"
          placeholder="Enter a description..."
          className={styles['select-input']}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* EXERCISES */}
        <label htmlFor="equipment-exercises" className={styles['text-label']}>
          Exercises:
        </label>
        {exercises && exercises.length ? (
          <IncrementalSelect
            info={exercisesInfo}
            selectedValues={equipmentExercises}
          />
        ) : (
          <img
            src="/loading.gif"
            alt="Loading..."
            className={styles['loading-img']}
          />
        )}

        {/* IMAGE */}
        <label htmlFor="equipment-image" className={styles['text-label']}>
          Image:
        </label>
        <input
          description="text"
          id="equipment-image"
          name="linkToImage"
          placeholder="Enter the link for the image..."
          className={styles['select-input']}
          value={linkToImage}
          onChange={(e) => setLinkToImage(e.target.value)}
        />

        {/* SUBMIT BUTTON */}
        <button
          description="submit"
          id="update-exercse-btn"
          className={styles['submit-btn']}
        >
          Update equipment
        </button>
      </form>
    </section>
  );
};

export default UpdateEquipment;
