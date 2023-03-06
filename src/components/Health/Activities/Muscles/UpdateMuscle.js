import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchMuscleById,
  putMuscle,
} from '../../../../util/apis/activities/muscles/musclesApis';
import styles from '../../../UI/General/CSS/Form.module.css';
import SelectInput from '../../../UI/Selects/SelectInput';

const typesInfo = {
  select: {
    id: 'muscles-type',
    name: 'type',
    options: [
      { value: '', label: '-- Choose a type --' },
      { value: 'Big', label: 'Big' },
      { value: 'Small', label: 'Small' },
    ],
  },
};

const UpdateMuscle = (props) => {
  const navigateTo = useNavigate();
  const { id } = useParams();
  const [muscle, setMuscle] = useState();

  /** INPUT VALUES */
  const [name, setName] = useState('');
  const [alternativeName, setAlternativeName] = useState('');
  const [type, setType] = useState('');
  const [linkToImage, setLinkToImage] = useState('');
  /** */

  //Gets the most updated info from current muscle
  useEffect(() => {
    if (!id) console.log(`Error: muscle id not found in the url.`);
    fetchMuscleById(id).then((response) => {
      if (!response || !response.isSuccess) return;
      setMuscle(response.body);
    });
  }, [id]);

  //Sets input values based on the current info fetched from the db
  useEffect(() => {
    if (!muscle) return;
    setName(muscle.name);
    setAlternativeName(muscle.alternativeName);
    setType(muscle.type);
    setLinkToImage(muscle.linkToImage);
  }, [muscle]);

  const updateMuscle = (e) => {
    e.preventDefault();
    const formVals = getFormValues(e.target.elements);
    console.log('formVals:  ', formVals);

    putMuscle(id, formVals).then((response) => {
      console.log('Response: ', response);
      if (response.isSuccess) {
        //IMPROVE: Navigate to the just added muscle id
        navigateTo(`/activities/muscles`);
      }
    });
  };

  const getFormValues = (elements) => {
    const values = {};
    values.id = id;
    values.name = elements.name.value;
    values.alternativeName = elements.alternativeName.value;
    values.type = elements.type.value;
    values.linkToImage = elements.linkToImage.value;

    return values;
  };

  return (
    <section className={styles['main-section']}>
      <form
        id="update-muscle-form"
        onSubmit={updateMuscle}
        className={styles['main-form']}
      >
        <h1 className={styles['form-title']}>Update Muscle</h1>

        {/* NAME */}
        <label htmlFor="muscle-name" className={styles['text-label']}>
          Name:
        </label>
        <input
          type="text"
          id="muscle-name"
          name="name"
          placeholder="Enter the muscle name..."
          className={styles['select-input']}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* ALTERNATIVE NAME */}
        <label
          htmlFor="muscle-alternativeName"
          className={styles['text-label']}
        >
          Alternative name:
        </label>
        <input
          type="text"
          id="muscle-alternativeName"
          name="alternativeName"
          placeholder="Enter an alternative name..."
          className={styles['select-input']}
          value={alternativeName}
          onChange={(e) => setAlternativeName(e.target.value)}
        />

        {/* TYPE */}
        <label htmlFor="muscle-type" className={styles['text-label']}>
          Type:
        </label>
        <SelectInput select={typesInfo.select} selectedValue={type} />

        {/* IMAGE */}
        <label htmlFor="muscle-image" className={styles['text-label']}>
          Image:
        </label>
        <input
          type="text"
          id="muscle-image"
          name="linkToImage"
          placeholder="Enter the link for the image..."
          className={styles['select-input']}
          value={linkToImage}
          onChange={(e) => setLinkToImage(e.target.value)}
        />

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          id="update-muscle-btn"
          className={styles['submit-btn']}
        >
          Update muscle
        </button>
      </form>
    </section>
  );
};

export default UpdateMuscle;
