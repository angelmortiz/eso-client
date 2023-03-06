import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchEquipmentById,
  putEquipment,
} from '../../../../util/apis/activities/equipments/equipmentsApis';
import styles from '../../../UI/General/CSS/Form.module.css';


const UpdateEquipment = (props) => {
  const navigateTo = useNavigate();
  const { id } = useParams();
  const [equipment, setEquipment] = useState();

  /** INPUT VALUES */
  const [name, setName] = useState('');
  const [alternativeName, setAlternativeName] = useState('');
  const [description, setDescription] = useState('');
  const [linkToImage, setLinkToImage] = useState('');
  /** */

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
  }, [equipment]);

  const updateEquipment = (e) => {
    e.preventDefault();
    const formVals = getFormValues(e.target.elements);
    console.log('formVals:  ', formVals);

    putEquipment(id, formVals).then((response) => {
      //console.log('Response: ', response);
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
          id="update-equipment-btn"
          className={styles['submit-btn']}
        >
          Update equipment
        </button>
      </form>
    </section>
  );
};

export default UpdateEquipment;
