import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchProgramPlanLogsById } from '../../../../util/apis/activities/programPlans/programPlansApis';
import styles from '../../../UI/General/CSS/Details.module.css';

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

    if (isSkipped) return 'Skipped';
    if (!isStarted) return 'Not started';
    if (isStarted && !isCompleted) return 'Active';
    if (isCompleted) return 'Completed';
  };

  return (
    <div className={styles['card']}>
      {!programPlanLogs ? (
        <img
          src="/loading.gif"
          alt="Loading..."
          className={styles['loading-img']}
        />
      ) : (
        <div className={styles['main-section']}>
          {/* NAME */}
          <h1 className={styles['name']}>Logs</h1>
          <h2>{programPlanLogs.program.name}</h2>
          <div className={styles['general-info']}>
            {/* DESCRIPTION */}
            <div className={styles['info-block']}>
              <p className={styles['label']}>Description: </p>
              <p className={styles['value']}>
                {programPlanLogs.program.description}
              </p>
            </div>
            {/* TYPE */}
            <div className={styles['info-block']}>
              <p className={styles['label']}>Type: </p>
              <p className={styles['value']}>{programPlanLogs.program.type}</p>
            </div>
            {/* DURATION */}
            <div className={styles['info-block']}>
              <p className={styles['label']}>Durantion: </p>
              <p className={styles['value']}>
                {programPlanLogs.program.duration} weeks
              </p>
            </div>
            {/* SEQUENCE */}
            <div className={styles['info-block']}>
              <p className={styles['label']}>Sequence: </p>
              <p className={styles['value']}>
                {programPlanLogs.program.sequence}
              </p>
            </div>
          </div>
          {programPlanLogs?.logs?.weeksLog &&
            programPlanLogs?.logs?.weeksLog.map((weekLog) => (
              <section
                key={`week_section_${weekLog.weekNumber}`}
                id="weeks"
                className={styles['weeks-section']}
              >
                <h3 className={styles['section-label']}>
                  Week {weekLog.weekNumber}
                </h3>
                {/* TABLE */}
                <table className={styles['info-table']}>
                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>Workout</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      /** WORKOUTS */
                      weekLog.workouts.map((wo) => {
                        const workoutStatus = getStatus(wo.log);
                        return (
                          <tr
                            key={`week_${weekLog.weekNumber}_day_${
                              wo.dayOfTheWeek || wo.dayNumber
                            }`}
                          >
                            <td>{wo.dayOfTheWeek || wo.dayNumber}</td>
                            <td>
                              <Link
                                to={`/activities/workout/${wo.workout._id}`}
                              >
                                {wo.workout.name}
                              </Link>
                            </td>
                            <td>{workoutStatus}</td>
                            <td>
                              {workoutStatus === 'Not started' && (
                                <div className={styles['action-btns-div']}>
                                  <Link
                                    to={`/activities/programplan/logs/${programPlanLogs._id}/week/${weekLog.weekNumber}/workoutplan/${wo._id}`}
                                    className={styles['action-btn']}
                                  >
                                    Start
                                  </Link>
                                  <button className={styles['action-btn']}>
                                    Skip
                                  </button>
                                </div>
                              )}
                              {workoutStatus === 'Active' && (
                                <div className={styles['action-btns-div']}>
                                  <button className={styles['action-btn']}>
                                    Continue
                                  </button>
                                </div>
                              )}
                              {workoutStatus === 'Completed' && (
                                <div className={styles['action-btns-div']}>
                                  <button className={styles['action-btn']}>
                                    Logs
                                  </button>
                                </div>
                              )}
                              {workoutStatus === 'Skipped' && (
                                <div className={styles['action-btns-div']}>
                                  <button className={styles['action-btn']}>
                                    Start
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table>
              </section>
            ))}
        </div>
      )}
    </div>
  );
};

export default ProgramPlanLogs;
