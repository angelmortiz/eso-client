import { postEquipment } from '../../../../util/apis/activities/equipments/equipmentsApis';
import { useNavigate } from 'react-router-dom';
import TextFormInput from '../../../UI/Inputs/TextFormInput';
import TextAreaFormInput from '../../../UI/Inputs/TextAreaFormInput';

const textInputValues = {
  name: {
    name: "name",
    label: "Name",
    type: "text",
    id: "equipment-name",
    placeholder: "Enter a name",
    requiredField: true,
  },
  alternativeName: {
    name: "alternativeName",
    label: "Alternative name",
    type: "text",
    id: "equipment-alternativeName",
    placeholder: "Enter an alternative name",
    requiredField: false,
  },
  description: {
    name: "description",
    label: "Description",
    type: "text",
    id: "equipment-description",
    placeholder: "Enter description",
    requiredField: false,
  },
  image: {
    name: "linkToImage",
    label: "Image",
    type: "text",
    id: "equipment-image",
    placeholder: "Enter an image link",
    requiredField: true,
  },
  thumbnail: {
    name: "linkToThumbnail",
    label: "Thumbnail",
    type: "text",
    id: "equipment-thumbnail",
    placeholder: "Enter a thumbnail link",
    requiredField: true,
  }
};

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
    values.linkToThumbnail = elements.linkToThumbnail.value;
    return values;
  };

  return (
    <form
      id="add-equipment-form"
      onSubmit={addEquipment}
      className="mx-5 mt-10 space-y-6 divide-y divide-gray-200 rounded-lg bg-white px-10 pb-6 shadow lg:mx-auto lg:max-w-[75%] xl:max-w-[60%]"
    >
      <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
        <div>
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Add Equipment
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Add a new equipment to the equipment library by filling out the form
            below.
          </p>
        </div>
        <div className="space-y-6 sm:space-y-5">
          <TextFormInput {...textInputValues.name} />
          <TextFormInput {...textInputValues.alternativeName} />
          <TextAreaFormInput {...textInputValues.description} />
          <TextFormInput {...textInputValues.image} />
          <TextFormInput {...textInputValues.thumbnail} />
        </div>
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

export default AddEquipment;
