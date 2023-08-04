import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  fetchEquipmentById,
  putEquipment,
} from "../../../../util/apis/activities/equipments/equipmentsApis";
import TextFormInput from "../../../UI/Inputs/TextFormInput";
import TextAreaFormInput from "../../../UI/Inputs/TextAreaFormInput";

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

const UpdateEquipment = (props) => {
  const navigateTo = useNavigate();
  const { id } = useParams();
  const [equipment, setEquipment] = useState();

  /** INPUT VALUES */
  const [name, setName] = useState("");
  const [alternativeName, setAlternativeName] = useState("");
  const [description, setDescription] = useState("");
  const [linkToImage, setLinkToImage] = useState("");
  const [linkToThumbnail, setLinkToThumbnail] = useState("");
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
    setLinkToThumbnail(equipment.linkToThumbnail);
  }, [equipment]);

  const updateEquipment = (e) => {
    e.preventDefault();
    const formVals = getFormValues(e.target.elements);
    //console.log('formVals:  ', formVals);

    putEquipment(id, formVals).then((response) => {
      //console.log('Response: ', response);
      if (response.isSuccess) {
        navigateTo(`/activities/equipment/${id}`);
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
    values.linkToThumbnail = elements.linkToThumbnail.value;
    return values;
  };

  return (
    <form
      id="update-equipment-form"
      onSubmit={updateEquipment}
      className="mx-5 mt-10 space-y-6 divide-y divide-gray-200 rounded-lg bg-white px-10 pb-6 shadow lg:mx-auto lg:max-w-[75%] xl:max-w-[60%]"
    >
      <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
        <div>
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Update Equipment
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Update the values of the current equipment by editing the form
            below.
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
            to={`/activities/equipment/${id}`}
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

export default UpdateEquipment;
