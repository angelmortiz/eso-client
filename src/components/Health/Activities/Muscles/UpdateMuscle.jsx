import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  fetchMuscleById,
  putMuscle,
} from "../../../../util/apis/activities/muscles/musclesApis";
import TextFormInput from "../../../UI/Inputs/TextFormInput";
import FormSelectInput from "../../../UI/Selects/FormSelectInput";
import { MuscleTypes } from "../GlobalValues/MuscleGlobalValues";
import TextAreaFormInput from "../../../UI/Inputs/TextAreaFormInput";

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
  description: {
    name: "description",
    label: "Description",
    type: "text",
    id: "muscle-description",
    placeholder: "Enter description",
    requiredField: false,
  },
  image: {
    name: "linkToImage",
    label: "Image",
    type: "text",
    id: "muscle-image",
    placeholder: "Enter an image link",
    requiredField: true,
  },
  thumbnail: {
    name: "linkToThumbnail",
    label: "Thumbnail",
    type: "text",
    id: "muscle-thumbnail",
    placeholder: "Enter a thumbnail link",
    requiredField: true,
  },
};

const UpdateMuscle = (props) => {
  const navigateTo = useNavigate();
  const { id } = useParams();
  const [muscle, setMuscle] = useState();

  /** INPUT VALUES */
  const [name, setName] = useState("");
  const [alternativeName, setAlternativeName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [linkToImage, setLinkToImage] = useState("");
  const [linkToThumbnail, setLinkToThumbnail] = useState("");
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
    setDescription(muscle.description);
    setType(muscle.type);
    setLinkToImage(muscle.linkToImage);
    setLinkToThumbnail(muscle.linkToThumbnail);
  }, [muscle]);

  const updateMuscle = (e) => {
    e.preventDefault();
    const formVals = getFormValues(e.target.elements);
    //console.log('formVals:  ', formVals);

    putMuscle(id, formVals).then((response) => {
      //console.log('Response: ', response);
      if (response.isSuccess) {
        navigateTo(`/activities/muscle/${id}`);
      }
    });
  };

  const getFormValues = (elements) => {
    const values = {};
    values.id = id;
    values.name = elements.name.value;
    values.alternativeName = elements.alternativeName.value;
    values.description = elements.description.value;
    values.type = elements.type.value;
    values.linkToImage = elements.linkToImage.value;
    values.linkToThumbnail = elements.linkToThumbnail.value;

    return values;
  };

  return (
    <form
      id="update-muscle-form"
      onSubmit={updateMuscle}
      className="mx-5 mt-10 space-y-6 divide-y divide-gray-200 rounded-lg bg-white px-10 pb-6 shadow lg:mx-auto lg:max-w-[75%] xl:max-w-[60%]"
    >
      <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
        <div>
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Update Muscle
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Update the values of the current muscle by editing the form below.
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
          <TextAreaFormInput
            {...textInputValues.description}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <FormSelectInput
            label="Type"
            select={MuscleTypes.select}
            selectedValue={type}
            requiredField={true}
          />
          <TextFormInput
            {...textInputValues.image}
            value={linkToImage}
            onChange={(e) => setLinkToImage(e.target.value)}
          />
          <TextFormInput
            {...textInputValues.thumbnail}
            value={linkToThumbnail}
            onChange={(e) => setLinkToThumbnail(e.target.value)}
          />
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <div className="pt-5">
        <div className="flex justify-center gap-5 md:justify-end md:gap-3">
          <Link
            to={`/activities/muscle/${id}`}
            className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 md:mt-0 md:w-auto"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md bg-cyan-700 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700 md:w-auto md:px-5"
          >
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default UpdateMuscle;
