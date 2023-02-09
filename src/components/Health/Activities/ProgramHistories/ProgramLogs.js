import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchProgramHistoryById } from '../../../../util/apis/activities/programHistories/programHistoriesApis';
import { fetchProgramById } from '../../../../util/apis/activities/programs/programsApis';
import styles from '../../../UI/General/CSS/Details.module.css';

const daysOfTheWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thrusday',
  'Friday',
  'Saturday',
  'Sunday',
];

const ProgramLogs = (props) => {
  const { id } = useParams();
  const [programLog, setProgramLog] = useState();
  const [program, setProgram] = useState();
  const [weeks, setWeeks] = useState();

  useEffect(() => {
    if (!id) console.error(`Error: programLog id not found in the url.`);
    fetchProgramHistoryById(id).then((response) => {
      if (!response || !response.isSuccess) return;
      setProgramLog(response.body);
    });
  }, [id]);

  useEffect(() => {
    if (!programLog) return;

    fetchProgramById(programLog.programId).then((response) => {
      if (!response || !response.isSuccess) return;
      setProgram(response.body);
      //creates an array of numbers based on duration.
      setWeeks([...Array(response.body.duration).keys()]);
    });
  }, [programLog]);

  return (
    <div className={styles['card']}>
      {!programLog ? (
        <img
          src="/loading.gif"
          alt="Loading..."
          className={styles['loading-img']}
        />
      ) : (
        <div className={styles['main-section']}>
          {/* NAME */}
          <h1 className={styles['name']}>Logs</h1>
          <h2>{programLog.programInfo.name}</h2>
          <div className={styles['general-info']}>
            {/* DESCRIPTION */}
            <div className={styles['info-block']}>
              <p className={styles['label']}>Description: </p>
              <p className={styles['value']}>
                {programLog.programInfo.description}
              </p>
            </div>
            {/* TYPE */}
            <div className={styles['info-block']}>
              <p className={styles['label']}>Type: </p>
              <p className={styles['value']}>{programLog.programInfo.type}</p>
            </div>
            {/* DURATION */}
            <div className={styles['info-block']}>
              <p className={styles['label']}>Durantion: </p>
              <p className={styles['value']}>
                {programLog.programInfo.duration} weeks
              </p>
            </div>
            {/* SEQUENCE */}
            <div className={styles['info-block']}>
              <p className={styles['label']}>Sequence: </p>
              <p className={styles['value']}>
                {programLog.programInfo.sequence}
              </p>
            </div>
          </div>
          {weeks &&
            weeks.map((weekNumber) => (
              <section
                key={`wee_section_${weekNumber}`}
                id="weeks"
                className={styles['weeks-section']}
              >
                <h3 className={styles['section-label']}>
                  Week {weekNumber + 1}
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
                    {!program ? (
                      <img
                        src="/loading.gif"
                        alt="Loading..."
                        className={styles['loading-img']}
                      />
                    ) : /** WEEKLY WORKOUTS */
                    program.sequence === 'Weekly' ? (
                      program.workouts.map((wo) => (
                        <tr key={`row_${wo.workoutId}`}>
                          <td>{wo.dayOfTheWeek}</td>
                          <td>
                            <Link to={`/activities/workout/${wo.workoutId}`}>
                              {wo.name}
                            </Link>
                          </td>
                          <td>Status</td>
                          <td>Buttons</td>
                        </tr>
                      ))
                    ) : (
                      /** CYCLE WORKOUTS */
                      <tr></tr>
                    )}
                  </tbody>
                </table>
              </section>
            ))}
        </div>
      )}
      <div className={styles['bottom-btns-div']}>
        <Link
          to={`/activities/update-programLog/${id}`}
          className={styles['bottom-btns']}
        >
          Update
        </Link>
      </div>
    </div>
  );
};

export default ProgramLogs;
