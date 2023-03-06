import SelectInput from '../../../UI/Selects/SelectInput';
import styles from '../../../UI/General/CSS/Form.module.css';
import { postMuscle } from '../../../../util/apis/activities/muscles/musclesApis';
import { useNavigate } from 'react-router-dom';

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

const AddMuscle = (props) => {
  const navigateTo = useNavigate();

  /** Functions */
  const addMuscle = (e) => {
    e.preventDefault();
    const formVals = getFormValues(e.target.elements);

    postMuscle(formVals).then((response) => {
      console.log('response: ', response);
      if (!response || !response.isSuccess) return;
      navigateTo('/activities/muscles');
    });
  };

  const getFormValues = (elements) => {
    const values = {};
    values.name = elements.name.value;
    values.alternativeName = elements.alternativeName.value;
    values.type = elements.type.value;
    values.linkToImage = elements.linkToImage.value;
    return values;
  };

  /** Render */
  return (
    <section className={styles['main-section']}>
      <form
        id="add-muscle-form"
        onSubmit={addMuscle}
        className={styles['main-form']}
      >
        <h1 className={styles['form-title']}>Add Muscle</h1>

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
        />

        {/* TYPE */}
        <label htmlFor="muscle-type" className={styles['text-label']}>
          Type:
        </label>
        <SelectInput select={typesInfo.select} />

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
        />

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          id="add-muscle-btn"
          className={styles['submit-btn']}
        >
          Add muscle
        </button>
      </form>
    </section>
  );
};

export default AddMuscle;
