import { postMuscle } from "../../../../util/apis/activities/muscles/musclesApis";
import { useNavigate } from "react-router-dom";
import TextFormInput from "../../../UI/Inputs/TextFormInput";
import FormSelectInput from "../../../UI/Selects/FormSelectInput";

const typesInfo = {
  select: {
    id: "muscles-type",
    name: "type",
    options: [
      { value: "", label: "-- Choose a type --" },
      { value: "Big", label: "Big" },
      { value: "Small", label: "Small" },
    ],
  },
};

const textInputValues = {
  name: {
    name: "name",
    label: "Name",
    type: "text",
    id: "muscle-name",
    placeholder: "Enter a name",
    requiredField: true,
  },
  alternativeName: {
    name: "alternativeName",
    label: "Alternative name",
    type: "text",
    id: "muscle-alternativeName",
    placeholder: "Enter an alternative name",
    requiredField: false,
  },
  image: {
    name: "linkToImage",
    label: "Image link",
    type: "text",
    id: "muscle-image",
    placeholder: "Enter an image link",
    requiredField: true,
  }
};

const AddMuscle = (props) => {
  const navigateTo = useNavigate();

  /** Functions */
  const addMuscle = (e) => {
    e.preventDefault();
    const formVals = getFormValues(e.target.elements);
    // console.log("formVals: ", formVals);

    postMuscle(formVals).then((response) => {
      // console.log('Response: ', response);
      if (!response || !response.isSuccess) return;
      navigateTo("/activities/muscles");
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

  return (
    <form
      id="add-muscle-form"
      onSubmit={addMuscle}
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
            label="Type"
            select={typesInfo.select}
            selectedValue=""
            requiredField={true}
          />
          <TextFormInput {...textInputValues.image} />
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

export default AddMuscle;
