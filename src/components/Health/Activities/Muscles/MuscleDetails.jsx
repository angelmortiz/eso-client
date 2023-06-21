import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteMuscle,
  fetchMuscleById,
} from "../../../../util/apis/activities/muscles/musclesApis";
import SimpleCancelConfirmationModal from "../../../UI/Modals/TwoButtonModals/SimpleCancelConfirmationModal";

const MuscleDetails = (props) => {
  const { id } = useParams();
  const navigateTo = useNavigate();
  const [muscle, setMuscle] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (!id) console.error(`Error: muscle id not found in the url.`);
    fetchMuscleById(id).then((response) => {
      if (!response || !response.isSuccess) return;
      setMuscle(response.body);
    });
  }, [id]);

  const openSimpleCancelConfirmationModal = (e) => {
    e.preventDefault();
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const confirmDeleteMuscle = () => {
    closeDeleteModal();

    deleteMuscle(id).then((response) => {
      if (!response || !response.isSuccess) return;
      navigateTo("/activities/muscles");
    });
  };

  return (
    <div>
      {!muscle ? (
        <img
          src="/loading.gif"
          alt="Loading..."
          className="mx-auto mt-10 h-20 w-20"
        />
      ) : (
        <main className="mx-5 my-10 space-y-6 divide-y divide-gray-200 rounded-lg bg-white px-10 py-5 shadow lg:mx-auto lg:max-w-[75%] xl:max-w-[70%]">
          {/* Muscle */}
          <div>
            {/* Title */}
            <div>
              <p className="text-sm text-gray-500">Muscle Details</p>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {muscle.name}
              </h1>
              <h2 id="information-heading" className="sr-only">
                Muscle information
              </h2>
              <p className="text-md text-gray-500">{muscle.alternativeName}</p>
            </div>

            {/* Muscle info */}
            <div className="mt-4 lg:flex">
              {/* Image */}
              <div className="aspect-video rounded-lg lg:flex lg:w-1/2 lg:items-center lg:justify-center 2xl:w-1/3">
                <img
                  src={muscle.linkToImage}
                  alt={muscle.name}
                  className="mx-auto max-h-96 w-max rounded-lg border object-cover"
                />
              </div>

              {/* Muscle details */}
              <div className="mt-4 lg:my-auto lg:ml-5 lg:w-1/2 2xl:w-2/3">
                {/* //TODO: Add description */}
                <p className="text-gray-500">
                  Group of three muscles located at the back of the thigh. The
                  primary function of the hamstrings is to bend the knee and
                  extend the hip.{" "}
                </p>
                <h3 className="text-md mt-4 font-medium text-gray-900">
                  Muscle properties:
                </h3>
                <div className="prose prose-sm mt-4 text-gray-500">
                  <ul className="flex flex-col gap-1 pl-4 lg:gap-0">
                    <li>
                      <strong>• Type:</strong> {muscle.type} muscle
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-4 md:flex-row md:justify-center md:gap-10 md:border-t md:pt-5">
              <Link
                to={`/activities/update-muscle/${id}`}
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
            confirmDelete={confirmDeleteMuscle}
            status="Warning"
            title="Confirm delete"
            message={`Are you sure you want to delete the muscle "${muscle?.name}"?`}
            mainButtonLabel="Delete"
          />
        </main>
      )}
    </div>
  );
};

export default MuscleDetails;
