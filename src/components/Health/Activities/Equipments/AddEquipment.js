import styles from '../../../UI/General/CSS/Form.module.css';
import { postEquipment } from '../../../../util/apis/activities/equipments/equipmentsApis';
import { useNavigate } from 'react-router-dom';

const AddEquipment = (props) => {
  const navigateTo = useNavigate();

  /** Functions */
  const addEquipment = (e) => {
    e.preventDefault();
    const formVals = getFormValues(e.target.elements);
    
    postEquipment(formVals).then((response) => {
      //console.log('Response: ', response);
      navigateTo('/activities/equipments');
    });
  };

  const getFormValues = (elements) => {
    const values = {};
    values.name = elements.name.value;
    values.alternativeName = elements.alternativeName.value;
    values.description = elements.description.value;
    values.linkToImage = elements.linkToImage.value;
    return values;
  };

  /** Render */
  return (
    <section className={styles['main-section']}>
      <form
        id="add-equipment-form"
        onSubmit={addEquipment}
        className={styles['main-form']}
      >
        <h1 className={styles['form-title']}>Add Equipment</h1>

        {/* NAME */}
        <label htmlFor="equipment-name" className={styles['text-label']}>
          Name:
        </label>
        <input
          type="text"
          id="equipment-name"
          name="name"
          placeholder="Enter the equipment name..."
          className={styles['select-input']}
        />

        {/* ALTERNATIVE NAME */}
        <label
          htmlFor="equipment-alternativeName"
          className={styles['text-label']}
        >
          Alternative name:
        </label>
        <input
          type="text"
          id="equipment-alternativeName"
          name="alternativeName"
          placeholder="Enter an alternative name..."
          className={styles['select-input']}
        />

        {/* DESCRIPTION */}
        <label htmlFor="equipment-description" className={styles['text-label']}>
          Description:
        </label>
        <input
          type="text"
          id="equipment-description"
          name="description"
          placeholder="Enter the equipment description..."
          className={styles['select-input']}
        />

        {/* IMAGE */}
        <label htmlFor="equipment-image" className={styles['text-label']}>
          Image:
        </label>
        <input
          type="text"
          id="equipment-image"
          name="linkToImage"
          placeholder="Enter the link for the image..."
          className={styles['select-input']}
        />

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          id="add-equipment-btn"
          className={styles['submit-btn']}
        >
          Add equipment
        </button>
      </form>
    </section>
  );
};

export default AddEquipment;
