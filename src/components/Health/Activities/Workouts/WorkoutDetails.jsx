import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteWorkout,
  fetchWorkoutById,
} from "../../../../util/apis/activities/workouts/workoutsApis";
import SimpleCancelConfirmationModal from "../../../UI/Modals/TwoButtonModals/SimpleCancelConfirmationModal";

const WorkoutDetails = (props) => {
  const { id } = useParams();
  const navigateTo = useNavigate();
  const [workout, setWorkout] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (!id) console.error(`Error: workout id not found in the url.`);
    fetchWorkoutById(id).then((response) => {
      if (!response || !response.isSuccess) return;
      console.log("response: ", response);
      setWorkout(response.body);
    });
  }, [id]);

  const openSimpleCancelConfirmationModal = (e) => {
    e.preventDefault();
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const confirmDeleteWorkout = () => {
    closeDeleteModal();

    deleteWorkout(id).then((response) => {
      if (!response || !response.isSuccess) return;
      navigateTo("/activities/workouts");
    });
  };

  return (
    <>
      {!workout ? (
        <img
          src="/loading.gif"
          alt="Loading..."
          className="mx-auto mt-10 h-10 w-10"
        />
      ) : (
        <div className="mx-5 mt-10 overflow-hidden rounded-lg bg-white px-4 py-6 shadow lg:mx-auto lg:max-w-[75%]">
          <div className="px-4 md:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-2 md:flex-row md:justify-between">
              <div className="flex flex-col items-center gap-2 md:w-2/3 md:flex-row md:gap-4">
                <img
                  className="h-16 w-16 flex-shrink-0 rounded-full border shadow"
                  src={workout?.linkToThumbnail}
                  alt={workout?.name}
                />
                <div className="text-center md:text-left">
                  <p className="text-xs text-gray-700">Workout Details</p>
                  <div className="flex items-center justify-center gap-2 md:justify-start">
                    <h1 className="font-semibold leading-6 text-gray-900 md:text-lg">
                      {workout?.name}
                    </h1>
                    <span className="rounded-lg bg-teal-100 px-1.5 py-0.5 text-right text-sm font-medium text-teal-800">
                      {workout?.variant}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-700">
                    {workout?.description}
                  </p>
                </div>
              </div>
              <div className="mt-2 flex gap-2 md:mt-0">
                <span className="rounded-lg bg-cyan-100 px-2 py-1 text-right text-xs font-medium text-cyan-800">
                  {workout?.type}
                </span>
                <span className="rounded-lg bg-sky-100 px-2 py-1 text-right text-xs font-medium text-sky-800">
                  {workout?.target}
                </span>
              </div>
            </div>
            <div className="-mx-4 mt-4 md:-mx-0">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-2 pl-3 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Exercise
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 text-left text-sm font-semibold text-gray-900 lg:hidden"
                    >
                      Info
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-2 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                    >
                      Sets
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-2 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                    >
                      Reps
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-2 text-left text-sm font-semibold text-gray-900 md:table-cell"
                    >
                      Tempo
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-2 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                    >
                      RIR
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-2 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                    >
                      Rest
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {workout?.exercises?.map((exercise, index) => (
                    <tr key={`exercise_${index}`}>
                      <td className="w-1/2 max-w-0 py-4 pl-3 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                        <Link
                          to={`/activities/exercise/${exercise.exercise?._id}`}
                          className="underline underline-offset-4"
                        >
                          {exercise.exercise?.name}
                        </Link>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 lg:hidden">
                        <dl className="font-normal lg:hidden">
                          <dt className="sr-only">Variant</dt>
                          <dd className="mt-1 truncate text-gray-500">
                            Sets: {exercise.sets.join("-")}
                          </dd>
                          <dt className="sr-only">Variant</dt>
                          <dd className="mt-1 truncate text-gray-500">
                            Reps: {exercise.reps.join("-")}
                          </dd>
                          <dt className="sr-only lg:hidden">Type</dt>
                          <dd className="mt-1 truncate text-gray-500 md:hidden">
                            Tempo: {exercise.tempo.join("-")}
                          </dd>
                          <dt className="sr-only sm:hidden">Target</dt>
                          <dd className="mt-1 truncate text-gray-500 sm:hidden">
                            RIR: {exercise.rir.join("-")}
                          </dd>
                          <dt className="sr-only sm:hidden">Target</dt>
                          <dd className="mt-1 truncate text-gray-500 sm:hidden">
                            Rest: {exercise.rest.join("-")} mins
                          </dd>
                        </dl>
                      </td>
                      <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                        {exercise.sets.join("-")}
                      </td>
                      <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                        {exercise.reps.join("-")}
                      </td>
                      <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">
                        {exercise.tempo.join("-")}
                      </td>
                      <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                        {exercise.rir.join("-")}
                      </td>
                      <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                        {exercise.rest.join("-")} mins
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* BUTTONS */}
            <div className="-mx-4 mt-2 border-t pt-8 md:-mx-0 md:pt-5">
              <div className="flex justify-center gap-5 md:justify-end md:gap-3">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-red-700 py-2 text-sm font-semibold text-red-700 hover:border-red-600 hover:text-red-600 md:w-auto md:px-5"
                  onClick={openSimpleCancelConfirmationModal}
                >
                  Delete
                </button>
                <Link
                  to={`/activities/update-workout/${id}`}
                  className="inline-flex w-full justify-center rounded-md bg-cyan-700 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700 md:w-auto md:px-5"
                >
                  Update
                </Link>
              </div>
            </div>
          </div>

          {/* Delete Confirmation Modal */}
          <SimpleCancelConfirmationModal
            isModalOpen={isDeleteModalOpen}
            closeModal={closeDeleteModal}
            confirmDelete={confirmDeleteWorkout}
            status="Warning"
            title="Confirm delete"
            message={`Are you sure you want to delete the workout "${workout?.name}"?`}
            mainButtonLabel="Delete"
          />
        </div>
      )}
    </>
  );
};

export default WorkoutDetails;
