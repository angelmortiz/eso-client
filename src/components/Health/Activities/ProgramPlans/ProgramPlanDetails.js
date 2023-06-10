import { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchProgramPlanById } from "../../../../util/apis/activities/programPlans/programPlansApis";

const ProgramPlanDetails = (props) => {
  const { id } = useParams();
  const [programPlan, setProgramPlan] = useState();

  useEffect(() => {
    if (!id) console.error(`Error: program plan id not found in the url.`);
    fetchProgramPlanById(id).then((response) => {
      if (!response || !response.isSuccess) return;

      setProgramPlan(response.body);
    });
  }, [id]);

  return (
    <>
      {!programPlan ? (
        <img
          src="/loading.gif"
          alt="Loading..."
          className="mx-auto mt-10 h-10 w-10"
        />
      ) : (
        <div className="mx-5 mt-10 overflow-hidden rounded-lg bg-white px-4 py-6 shadow lg:mx-auto lg:max-w-[75%]">
          <div className="px-4 md:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-2 md:flex-row md:justify-between">
              <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
                <img
                  className="h-16 w-16 flex-shrink-0 rounded-full border shadow"
                  src={programPlan.program?.linkToImage}
                  alt={programPlan.program?.name}
                />
                <div className="text-center md:text-left">
                  <p className="text-xs text-gray-700">Plan Details</p>
                  <h1 className="font-semibold leading-6 text-gray-900 md:text-lg">
                    {programPlan.program?.name}
                  </h1>
                  <p className="mt-1 text-sm text-gray-700">
                    {programPlan.program?.description}
                  </p>
                </div>
              </div>
              <div className="mt-2 flex gap-2 md:mt-0">
                <span className="rounded-lg bg-teal-100 px-2 py-1 text-right text-xs font-medium text-teal-800">
                  {programPlan.program?.type}
                </span>
                <span className="rounded-lg bg-cyan-100 px-2 py-1 text-right text-xs font-medium text-cyan-800">
                  {programPlan.program?.sequence}
                </span>
                <span className="rounded-lg bg-sky-100 px-2 py-1 text-right text-xs font-medium text-sky-800">
                  {programPlan.program?.duration} weeks
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
                  {/* Weeks Breakdown */}
                  {programPlan?.weeksPlan &&
                    programPlan?.weeksPlan.map((weekPlan) => (
                      <Fragment key={`week_header_${weekPlan.weekNumber}`}>
                        <tr className="border-t border-gray-200">
                          <th
                            colSpan={5}
                            scope="colgroup"
                            className="bg-gray-100 py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                          >
                            Week {weekPlan.weekNumber}
                          </th>
                        </tr>
                        {/* Program Plan Breakdown */}
                        {weekPlan.workouts?.map(
                          (workout, index) => (
                            <tr key={`workout_${index}`}>
                              <td className="w-1/3 max-w-0 py-4 pl-3 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                                {programPlan.program.sequence === "Weekly"
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
                              <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">
                                {workout.workout.type}
                              </td>
                              <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                {workout.workout.target}
                              </td>
                            </tr>
                          )
                        )}
                      </Fragment>
                    ))}
                </tbody>
              </table>
            </div>

            {/* BUTTONS */}
            <div className="-mx-4 mt-2 border-t pt-8 md:-mx-0 md:pt-5">
              <div className="flex justify-center gap-5 md:justify-end md:gap-3">
                <Link
                  to={`/activities/programplan/logs/${id}`}
                  className="inline-flex w-full justify-center rounded-md bg-cyan-700 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700 md:w-auto md:px-5"
                >
                  Logs
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProgramPlanDetails;
