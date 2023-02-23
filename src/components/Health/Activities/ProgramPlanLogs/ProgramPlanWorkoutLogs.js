import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchWorkoutPlanLogsById } from '../../../../util/apis/activities/programPlanLogs/programPlanLogsApis';
import styles from '../../../UI/General/CSS/Details.module.css';
import IncrementalSetLogs from '../ProgramPlanLogs/IncrementalSetLogs';

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
        console.log('response: ', response);
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
    <div className={styles['card']}>
      {!workoutLogs ? (
        <img
          src="/loading.gif"
          alt="Loading..."
          className={styles['loading-img']}
        />
      ) : (
        <div className={styles['main-section']}>
          {/* NAME */}
          <h1 className={styles['name']}>Logs: {workoutLogs.workout.name}</h1>
          <div className={styles['general-info']}>
            {/* DESCRIPTION */}
            <div className={styles['info-block']}>
              <p className={styles['label']}>Description: </p>
              <p className={styles['value']}>
                {workoutLogs.workout.description}
              </p>
            </div>
            {/* VARIANT */}
            <div className={styles['info-block']}>
              <p className={styles['label']}>Variant: </p>
              <p className={styles['value']}>{workoutLogs.workout.variant}</p>
            </div>
            {/* TYPE */}
            <div className={styles['info-block']}>
              <p className={styles['label']}>Type: </p>
              <p className={styles['value']}>{workoutLogs.workout.type}</p>
            </div>
            {/* TARGET */}
            <div className={styles['info-block']}>
              <p className={styles['label']}>Target: </p>
              <p className={styles['value']}>{workoutLogs.workout.target}</p>
            </div>
          </div>
        </div>
      )}

      {/* EXERCISES LOGS */}
      {workoutLogs?.exercises.map((exercise, index) => {
        const recommendations = extractExerciseRecommendations(exercise);
        return (
          <section
            id="active"
            className={styles['programPlan-section']}
            key={`exercise_${index}`}
          >
            <h3 className={styles['section-label']}>
              Exercise: {exercise.exercise.name}
            </h3>
            <h4 className={styles['section-label']}>
              Recommendations: Sets: {recommendations.sets[0]}-
              {recommendations.sets[1]} | Reps: {recommendations.reps[0]}-
              {recommendations.reps[1]} | Tempo: {recommendations.tempo[0]}-
              {recommendations.tempo[1]}-{recommendations.tempo[2]}-
              {recommendations.tempo[3]} | RIR:{recommendations.rir[0]}-
              {recommendations.rir[1]} | Rest:{recommendations.rest[0]}-
              {recommendations.rest[1]}
            </h4>
            {/* INCREMENT SETS LOGS */}
            {/* setLogsIds = programPlanId, weekId, workoutPlanId, exercisePlanId */}
            <IncrementalSetLogs exercise={exercise}/>
          </section>
        );
      })}
    </div>
  );
};

export default ProgramPlanWorkoutLogs;
