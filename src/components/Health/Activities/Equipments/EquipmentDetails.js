import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  deleteEquipment,
  fetchEquipmentById,
} from '../../../../util/apis/activities/equipments/equipmentsApis';
import SimpleCancelConfirmationModal from '../../../UI/Modals/TwoButtonModals/SimpleCancelConfirmationModal';

const EquipmentDetails = (props) => {
  const { id } = useParams();
  const navigateTo = useNavigate();
  const [equipment, setEquipment] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (!id) console.error(`Error: equipment id not found in the url.`);
    fetchEquipmentById(id).then((response) => {
      if (!response || !response.isSuccess) return;
      setEquipment(response.body);
    });
  }, [id]);

  const openSimpleCancelConfirmationModal = (e) => {
    e.preventDefault();
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const confirmDeleteEquipment = () => {
    closeDeleteModal();

    deleteEquipment(id).then((response) => {
      if (!response || !response.isSuccess) return;
      navigateTo('/activities/equipments');
    });
  };

  return (
    <div>
    {!equipment ? (
      <img
        src="/loading.gif"
        alt="Loading..."
        className="mx-auto mt-10 h-20 w-20"
      />
    ) : (
      <main className="mx-5 my-10 space-y-6 divide-y divide-gray-200 rounded-lg bg-white px-10 py-5 shadow lg:mx-auto lg:max-w-[75%] xl:max-w-[70%]">
        {/* Equipment */}
        <div className="lg:flex lg:flex-col">
          {/* Title */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {equipment.name}
            </h1>

            <h2 id="information-heading" className="sr-only">
              Equipment information
            </h2>
            <p className="text-md mt-2 text-gray-500">
              {equipment.alternativeName}
            </p>
          </div>

          {/* Equipment info */}
          <div className="mt-4 lg:flex">
            {/* Image */}
            <div className="aspect-video rounded-lg lg:flex lg:w-1/2 lg:items-center lg:justify-center 2xl:w-1/3">
              <img
                src={equipment.linkToImage}
                alt={equipment.name}
                className="mx-auto w-max max-h-96 rounded-lg object-cover border"
              />
            </div>

            {/* Equipment details */}
            <div className="mt-4 lg:my-auto lg:ml-5 lg:w-1/2 2xl:w-2/3">
              {/* //TODO: Add description */}
              <p className="text-gray-500">
                {equipment.description}
              </p>
              <h3 className="text-md mt-4 font-medium text-gray-900">
                Equipment properties:
              </h3>
              <div className="prose prose-sm mt-4 text-gray-500">
                <ul className="flex flex-col gap-1 pl-4 lg:gap-0">
                  <li>
                    <strong>• Type:</strong>
                    {' '}{equipment.type}{' '} equipment
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-4 md:flex-row md:justify-center md:gap-10 md:border-t md:pt-5">
            <Link
              to={`/activities/update-equipment/${id}`}
              className="inline-flex w-full justify-center rounded-md bg-cyan-700 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700 md:w-auto md:px-16"
            >
              Update
            </Link>
            <button
              type="button"
              onClick={openSimpleCancelConfirmationModal}
              className="inline-flex w-full justify-center rounded-md border border-red-700 py-2 text-sm font-semibold text-red-700 hover:border-red-600 hover:text-red-600 md:w-auto md:px-16"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <SimpleCancelConfirmationModal
          isModalOpen={isDeleteModalOpen}
          closeModal={closeDeleteModal}
          confirmDelete={confirmDeleteEquipment}
          status="Warning"
          title="Confirm delete"
          message={`Are you sure you want to delete the equipment "${equipment?.name}"?`}
          mainButtonLabel="Delete"
        />
      </main>
    )}
  </div>
  );
};

export default EquipmentDetails;
