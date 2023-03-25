import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteProgram,
  fetchProgramById,
} from "../../../../util/apis/activities/programs/programsApis";
import SimpleCancelConfirmationModal from "../../../UI/Modals/TwoButtonModals/SimpleCancelConfirmationModal";

const ProgramDetails = (props) => {
  const { id } = useParams();
  const navigateTo = useNavigate();
  const [program, setProgram] = useState();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (!id) console.error(`Error: program id not found in the url.`);
    fetchProgramById(id).then((response) => {
      if (!response || !response.isSuccess) return;
      // console.log("response: ", response);
      setProgram(response.body);
    });
  }, [id]);

  const openSimpleCancelConfirmationModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const confirmDeleteProgram = () => {
    closeDeleteModal();

    deleteProgram(id).then((response) => {
      if (!response || !response.isSuccess) return;
      navigateTo("/activities/programs");
    });
  };

  return (
    <div className="mx-5 mt-10 overflow-hidden rounded-lg bg-white px-4 py-6 shadow lg:mx-auto lg:max-w-[75%]">
      <div className="px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-2 md:flex-row md:justify-between">
          <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
            <img
              className="h-16 w-16 flex-shrink-0 rounded-full border shadow"
              src={program?.linkToImage}
              alt={program?.name}
            />
            <div className="text-center md:text-left">
              <h1 className="font-semibold leading-6 text-gray-900 md:text-lg">
                {program?.name}
              </h1>
              <p className="mt-1 text-sm text-gray-700">
                {program?.description}
              </p>
            </div>
          </div>
          <div className="mt-2 flex gap-2 md:mt-0">
            <span className="rounded-lg bg-teal-100 px-2 py-1 text-right text-xs font-medium text-teal-800">
              {program?.type}
            </span>
            <span className="rounded-lg bg-cyan-100 px-2 py-1 text-right text-xs font-medium text-cyan-800">
              {program?.sequence}
            </span>
            <span className="rounded-lg bg-sky-100 px-2 py-1 text-right text-xs font-medium text-sky-800">
              {program?.duration} weeks
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
                  Day
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 text-left text-sm font-semibold text-gray-900"
                >
                  Workout
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-2 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Variant
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-2 text-left text-sm font-semibold text-gray-900 md:table-cell"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-2 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Target
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {program?.workouts?.map((workout, index) => (
                <tr key={`workout_${index}`}>
                  <td className="w-1/3 max-w-0 py-4 pl-3 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                    {program.sequence === "Weekly"
                      ? workout.dayOfTheWeek
                      : workout.dayNumber}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-800">
                    <Link
                      to={`/activities/workout/${workout.workout?._id}`}
                      className="underline underline-offset-4"
                    >
                      {workout.workout?.name}
                    </Link>
                    <dl className="font-normal lg:hidden">
                      <dt className="sr-only">Variant</dt>
                      <dd className="mt-1 truncate text-gray-500">
                        <Link
                          to={`/activities/workout/${workout.workout?._id}`}
                          className="underline underline-offset-4"
                        >
                          {workout.workout.variant}
                        </Link>
                      </dd>
                      <dt className="sr-only lg:hidden">Type</dt>
                      <dd className="mt-1 truncate text-gray-500 md:hidden">
                        {workout.workout.type}
                      </dd>
                      <dt className="sr-only sm:hidden">Target</dt>
                      <dd className="mt-1 truncate text-gray-500 sm:hidden">
                        {workout.workout.target}
                      </dd>
                    </dl>
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500  underline underline-offset-4 lg:table-cell">
                    <Link
                      to={`/activities/workout/${workout.workout?._id}`}
                      className="underline underline-offset-4"
                    >
                      {workout.workout.variant}
                    </Link>
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">
                    {workout.workout.type}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {workout.workout.target}
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
              to={`/activities/update-program/${id}`}
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
        confirmDelete={confirmDeleteProgram}
        status="Warning"
        title="Confirm delete"
        message={`Are you sure you want to delete the program "${program?.name}"?`}
        mainButtonLabel="Delete"
      />
    </div>
  );
};

export default ProgramDetails;
