import { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchProgramPlanLogsById } from "../../../../util/apis/activities/programPlanLogs/programPlanLogsApis";

const ProgramPlanLogs = (props) => {
  const { id } = useParams();
  const [programPlanLogs, setProgramPlanLogs] = useState();

  useEffect(() => {
    if (!id) console.error(`Error: programPlanLogs id not found in the url.`);
    fetchProgramPlanLogsById(id).then((response) => {
      if (!response || !response.isSuccess) return;
      setProgramPlanLogs(response.body);
    });
  }, [id]);

  const getStatus = (logStatus) => {
    const { isStarted, isCompleted, isSkipped } = logStatus;

    if (isSkipped) return "Skipped";
    if (!isStarted) return "Not started";
    if (isStarted && !isCompleted) return "Active";
    if (isCompleted) return "Completed";
  };

  return (
    <>
      {!programPlanLogs ? (
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
                  src={programPlanLogs.program?.linkToThumbnail}
                  alt={programPlanLogs.program?.name}
                />
                <div className="text-center md:text-left">
                  <p className="text-xs text-gray-700">Plan Log Status</p>
                  <h1 className="font-semibold leading-6 text-gray-900 md:text-lg">
                    {programPlanLogs.program?.name}
                  </h1>
                  <p className="mt-1 text-sm text-gray-700">
                    {programPlanLogs.program?.description}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 md:mt-0">
                <span className="rounded-lg bg-teal-100 px-2 py-1 text-right text-xs font-medium text-teal-800">
                  {programPlanLogs.program?.type}
                </span>
                <span className="rounded-lg bg-cyan-100 px-2 py-1 text-right text-xs font-medium text-cyan-800">
                  {programPlanLogs.program?.sequence}
                </span>
                <span className="rounded-lg bg-sky-100 px-2 py-1 text-right text-xs font-medium text-sky-800">
                  {programPlanLogs.program?.duration} weeks
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
                      Status
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-2 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {/* Weeks Breakdown */}
                  {programPlanLogs.logs?.weeksLog &&
                    programPlanLogs.logs?.weeksLog.map((weeksLog) => (
                      <Fragment key={`week_header_${weeksLog.weekNumber}`}>
                        <tr className="border-t border-gray-200">
                          <th
                            colSpan={5}
                            scope="colgroup"
                            className="bg-gray-100 py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                          >
                            Week {weeksLog.weekNumber}
                          </th>
                        </tr>
                        {/* Program Plan Breakdown */}
                        {weeksLog.workouts?.map((workout, index) => {
                          const workoutStatus = getStatus(workout.log);
                          return (
                            <tr key={`workout_${index}`}>
                              <td className="w-1/3 max-w-0 py-4 pl-3 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                                {workout.dayOfTheWeek || workout.dayNumber}
                              </td>
                              <td className="flex flex-col gap-1 px-3 py-4 text-sm text-gray-800">
                                <Link
                                  to={`/activities/workout/${workout.workout._id}`}
                                  className="underline underline-offset-4"
                                >
                                  {workout.workout.name}
                                </Link>
                                <dl className="flex flex-col gap-1 font-normal lg:hidden">
                                  <dt className="sr-only lg:hidden">Status</dt>
                                  <dd className="mt-1 truncate text-gray-600 md:hidden">
                                    {workoutStatus}
                                  </dd>
                                  <dt className="sr-only lg:hidden">Actions</dt>
                                  <dd className="mt-1 truncate text-gray-500 sm:hidden">
                                    {workoutStatus === "Not started" && (
                                      <div className="flex gap-2">
                                        <Link
                                          to={`/activities/programplan/logs/${programPlanLogs._id}/weekId/${weeksLog._id}/week/${weeksLog.weekNumber}/workoutplan/${workout._id}`}
                                          className="inline-flex font-semibold text-cyan-700 hover:text-cyan-600"
                                        >
                                          Start
                                        </Link>
                                        <p className="text-gray-400">or</p>
                                        <button className="inline-flex font-semibold text-cyan-700 hover:text-cyan-600">
                                          Skip
                                        </button>
                                      </div>
                                    )}
                                    {workoutStatus === "Active" && (
                                      <div>
                                        <button className="inline-flex font-semibold text-cyan-700 hover:text-cyan-600">
                                          Continue
                                        </button>
                                      </div>
                                    )}
                                    {workoutStatus === "Completed" && (
                                      <div>
                                        <button className="inline-flex font-semibold text-cyan-700 hover:text-cyan-600">
                                          Logs
                                        </button>
                                      </div>
                                    )}
                                    {workoutStatus === "Skipped" && (
                                      <div>
                                        <button className="inline-flex font-semibold text-cyan-700 hover:text-cyan-600">
                                          Start
                                        </button>
                                      </div>
                                    )}
                                  </dd>
                                </dl>
                              </td>
                              <td className="hidden px-3 py-4 text-sm text-gray-600 md:table-cell">
                                {workoutStatus}
                              </td>
                              {/* Actions buttons in large screens */}
                              <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                {workoutStatus === "Not started" && (
                                  <div className="flex gap-2">
                                    <Link
                                      to={`/activities/programplan/logs/${programPlanLogs._id}/weekId/${weeksLog._id}/week/${weeksLog.weekNumber}/workoutplan/${workout._id}`}
                                      className="inline-flex font-semibold text-cyan-700 hover:text-cyan-600"
                                    >
                                      Start
                                    </Link>
                                    <p className="text-gray-400">or</p>
                                    <button className="inline-flex font-semibold text-cyan-700 hover:text-cyan-600">
                                      Skip
                                    </button>
                                  </div>
                                )}
                                {workoutStatus === "Active" && (
                                  <div>
                                    <button className="inline-flex font-semibold text-cyan-700 hover:text-cyan-600">
                                      Continue
                                    </button>
                                  </div>
                                )}
                                {workoutStatus === "Completed" && (
                                  <div>
                                    <button className="inline-flex font-semibold text-cyan-700 hover:text-cyan-600">
                                      Logs
                                    </button>
                                  </div>
                                )}
                                {workoutStatus === "Skipped" && (
                                  <div>
                                    <button className="inline-flex font-semibold text-cyan-700 hover:text-cyan-600">
                                      Start
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </Fragment>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProgramPlanLogs;
