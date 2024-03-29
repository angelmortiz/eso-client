import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteExercise,
  fetchExerciseById,
} from "../../../../util/apis/activities/exercises/exercisesApis";
import SimpleCancelConfirmationModal from "../../../UI/Modals/TwoButtonModals/SimpleCancelConfirmationModal";
import VideoPlayer from "../../../UI/EmbeddedVideo/VideoPlayer";

const ExerciseDetails = (props) => {
  const { id } = useParams();
  const navigateTo = useNavigate();
  const [exercise, setExercise] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (!id) console.error(`Error: exercise id not found in the url.`);
    fetchExerciseById(id).then((response) => {
      if (!response || !response.isSuccess) return;
      setExercise(response.body);
    });
  }, [id]);

  const toggleShowVideo = () => {
    setShowVideo(!showVideo);
  };

  const openSimpleCancelConfirmationModal = (e) => {
    e.preventDefault();
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const confirmDeleteExercise = () => {
    closeDeleteModal();

    deleteExercise(id).then((response) => {
      if (!response || !response.isSuccess) return;
      navigateTo("/activities/exercises");
    });
  };

  return (
    <div>
      {!exercise ? (
        <img
          src="/loading.gif"
          alt="Loading..."
          className="mx-auto mt-10 h-20 w-20"
        />
      ) : (
        <main className="mx-5 my-10 space-y-6 divide-y divide-gray-200 rounded-lg bg-white px-10 py-5 shadow lg:mx-auto lg:max-w-[75%] xl:max-w-[70%]">
          {/* Exercise */}
          <div className="lg:flex lg:flex-col">
            {/* Title */}
            <div>
              <p className="text-sm text-gray-500">Exercise Details</p>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {exercise.name}
              </h1>
              <h2 id="information-heading" className="sr-only">
                Exercise information
              </h2>
              <p className="text-lg text-gray-500">
                {exercise.alternativeName}
              </p>
            </div>

            {/* Exercise info */}
            <div className="mt-4 lg:flex">
              {/* Image */}
              <div className="aspect-video rounded-lg lg:flex lg:w-1/2 lg:items-center lg:justify-center 2xl:w-1/3">
                <img
                  src={exercise.linkToImage}
                  alt={exercise.name}
                  className="mx-auto w-max rounded-lg object-cover"
                />
              </div>

              {/* Exercise details */}
              <div className="mt-4 lg:my-auto lg:ml-5 lg:w-1/2 2xl:w-2/3">
                {/* //TODO: Add description */}
                <p className="text-gray-500">
                  Compound weightlifting exercise that primarily targets the
                  muscles of the lower back, hips, glutes, quads, hamstrings, as
                  well as the forearms, traps, and lats.{" "}
                </p>
                <h3 className="text-md mt-4 font-medium text-gray-900">
                  Exercise properties:
                </h3>
                <div className="prose prose-sm mt-4 text-gray-500">
                  <ul className="flex flex-col gap-1 pl-4 lg:gap-0">
                    <li>
                      <strong>• Difficulty:</strong> {exercise.difficulty}
                    </li>
                    <li>
                      <strong>• Compound movement:</strong>{" "}
                      {exercise.compoundMovement ? "Yes" : "No"}
                    </li>
                    <li>
                      <strong>• Main muscle:</strong>{" "}
                      {exercise.mainMuscle?.name}
                    </li>
                    <li>
                      <strong>• Secondary muscles:</strong>
                      {/* TODO: Implement logic for multiple options */}{" "}
                      {exercise.secondaryMuscles[0]?.name ||
                        "No secondary muscles"}
                    </li>
                    <li>
                      <strong>• Types:</strong>
                      {/* TODO: Implement logic for multiple options */}{" "}
                      {exercise.types[0]}
                    </li>
                    <li>
                      <strong>• Equipments:</strong>
                      {/* TODO: Implement logic for multiple options */}{" "}
                      {exercise.equipments[0]?.name || "No equipment"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* VIDEO PLAYER */}
            {showVideo && (
              <div className="mt-5 border-t md:mt-8">
                <VideoPlayer url={exercise.linkToVideo} />
              </div>
            )}

            <div className="mt-5 flex flex-col gap-6 border-t pt-5 md:mt-8 md:flex-row md:justify-between md:gap-10  md:px-2">
              <button
                type="button"
                onClick={toggleShowVideo}
                className="inline-flex w-full justify-center rounded-md border border-cyan-700 py-2 text-sm font-semibold text-cyan-700 hover:border-cyan-600 hover:text-cyan-600 md:w-auto md:px-16"
              >
                {showVideo ? "Hide " : "Show "} Video
              </button>
              <div className="flex flex-col gap-2 md:flex-row md:justify-between md:gap-10">
                <Link
                  to={`/activities/update-exercise/${id}`}
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
          </div>

          {/* Delete Confirmation Modal */}
          <SimpleCancelConfirmationModal
            isModalOpen={isDeleteModalOpen}
            closeModal={closeDeleteModal}
            confirmDelete={confirmDeleteExercise}
            status="Warning"
            title="Confirm delete"
            message={`Are you sure you want to delete the exercise "${exercise?.name}"?`}
            mainButtonLabel="Delete"
          />
        </main>
      )}
    </div>
  );
};

export default ExerciseDetails;
