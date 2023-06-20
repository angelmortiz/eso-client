import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchWorkoutPlanLogsById } from "../../../../util/apis/activities/programPlanLogs/programPlanLogsApis";
import IncrementalSetLogs from "../ProgramPlanLogs/IncrementalSetLogs";

const ProgramPlanWorkoutLogs = (props) => {
  const { programPlanId, weekNumber, workoutPlanId } = useParams();
  const [workoutLogs, setWorkoutLogs] = useState();

  useEffect(() => {
    if (!programPlanId || !workoutPlanId) {
      console.error(
        `Error: programPlanId or workoutPlanId not found in the url.`
      );
    }
    fetchWorkoutPlanLogsById(programPlanId, weekNumber, workoutPlanId).then(
      (response) => {
        if (!response || !response.isSuccess) return;
        //console.log('Response: ', response);
        setWorkoutLogs(response.body);
      }
    );
  }, [programPlanId, weekNumber, workoutPlanId]);

  /**
   * //IMPROVE: Better to implement a logic on the backend to return the
   * exercise logs with the recommendations. This would avoid looping
   * through exercises to find the values.
   * */
  const extractExerciseRecommendations = (exercise) => {
    return workoutLogs.workout.exercises.find(
      (ex) => ex.exercise === exercise.exercise._id
    );
  };

  return (
    <>
      {!workoutLogs ? (
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
                  src={workoutLogs.workout.linkToImage}
                  alt={workoutLogs.workout.name}
                />
                <div className="text-center md:text-left">
                  <p className="text-xs text-gray-700">Workout Logs</p>
                  <div className="flex items-center justify-center gap-2 md:justify-start">
                    <h1 className="font-semibold leading-6 text-gray-900 md:text-lg">
                      {workoutLogs.workout.name}
                    </h1>
                    <span className="rounded-lg bg-teal-100 px-1.5 py-0.5 text-right text-sm font-medium text-teal-800">
                      {workoutLogs.workout.variant}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-700">
                    {workoutLogs.workout.description}
                  </p>
                </div>
              </div>
              <div className="mt-2 flex gap-2 md:mt-0">
                <span className="rounded-lg bg-cyan-100 px-2 py-1 text-right text-xs font-medium text-cyan-800">
                  {workoutLogs.workout.type}
                </span>
                <span className="rounded-lg bg-sky-100 px-2 py-1 text-right text-xs font-medium text-sky-800">
                  {workoutLogs.workout.target}
                </span>
              </div>
            </div>

            <div id="add-workout-form">
              {/* EXERCISES LOGS */}
              {workoutLogs.exercises.map((exercise, index) => {
                const recommendations =
                  extractExerciseRecommendations(exercise);
                return (
                  <div
                    key={`exercise_${exercise.exercise.name}`}
                    className="mt-10"
                  >
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                      {exercise.exercise.name}
                    </h3>
                    {/* Exercise properties */}
                    <div className="mt-1 flex max-w-2xl flex-wrap gap-2 text-sm text-gray-600">
                      <span>
                        Sets: {recommendations.sets[0]}-
                        {recommendations.sets[1]}
                      </span>
                      <span className="text-gray-300">|</span>
                      <span>
                        Reps: {recommendations.reps[0]}-
                        {recommendations.reps[1]}
                      </span>
                      <span className="text-gray-300">|</span>
                      <span>
                        Tempo: {recommendations.tempo[0]}-
                        {recommendations.tempo[1]}-{recommendations.tempo[2]}-
                        {recommendations.tempo[3]}
                      </span>
                      <span className="text-gray-300">|</span>
                      <span>
                        RIR: {recommendations.rir[0]}-{recommendations.rir[1]}
                      </span>
                      <span className="text-gray-300">|</span>
                      <span>
                        Rest: {recommendations.rest[0]}-
                        {recommendations.rest[1]}
                      </span>
                    </div>
                    {/* INCREMENT SETS LOGS */}
                    {/* setLogsIds = programPlanId, weekId, workoutPlanId, exercisePlanId */}
                    <div className="my-2 border-t border-gray-200"></div>
                    <IncrementalSetLogs exercise={exercise} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ProgramPlanWorkoutLogs;
