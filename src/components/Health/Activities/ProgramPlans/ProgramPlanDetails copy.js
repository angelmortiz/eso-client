import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchProgramPlanById } from '../../../../util/apis/activities/programPlans/programPlansApis';
import styles from '../../../UI/General/CSS/Details.module.css';

const ProgramPlanDetails = (props) => {
  const { id } = useParams();
  const [programPlan, setProgramPlan] = useState();

  useEffect(() => {
    if (!id) console.error(`Error: program plan id not found in the url.`);
    fetchProgramPlanById(id).then((response) => {
      if (!response || !response.isSuccess) return;

      //console.log("Response: ", response);
      setProgramPlan(response.body);
    });
  }, [id]);

  return (
    <div className={styles['card']}>
      {!programPlan ? (
        <img
          src="/loading.gif"
          alt="Loading..."
          className={styles['loading-img']}
        />
      ) : (
        <div className={styles['main-section']}>
          {/* NAME */}
          <h1 className={styles['name']}>Program Plan</h1>
          <h2>{programPlan.program.name}</h2>
          <div className={styles['general-info']}>
            {/* DESCRIPTION */}
            <div className={styles['info-block']}>
              <p className={styles['label']}>Description: </p>
              <p className={styles['value']}>
                {programPlan.program.description}
              </p>
            </div>
            {/* TYPE */}
            <div className={styles['info-block']}>
              <p className={styles['label']}>Type: </p>
              <p className={styles['value']}>{programPlan.program.type}</p>
            </div>
            {/* DURATION */}
            <div className={styles['info-block']}>
              <p className={styles['label']}>Durantion: </p>
              <p className={styles['value']}>
                {programPlan.program.duration} weeks
              </p>
            </div>
            {/* SEQUENCE */}
            <div className={styles['info-block']}>
              <p className={styles['label']}>Sequence: </p>
              <p className={styles['value']}>{programPlan.program.sequence}</p>
            </div>
          </div>
          {programPlan?.weeksPlan &&
            programPlan?.weeksPlan.map((weekPlan) => (
              <section
                key={`wee_section_${weekPlan.weekNumber}`}
                id="weeks"
                className={styles['weeks-section']}
              >
                <h3 className={styles['section-label']}>
                  Week {weekPlan.weekNumber}
                </h3>
                {/* TABLE */}
                <table className={styles['info-table']}>
                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>Workout</th>
                      <th>Target</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weekPlan.workouts.map((wo) => (
                      <tr key={`row_${wo._id}`}>
                        <td>
                          {programPlan.program.sequence === 'Weekly'
                            ? wo.dayOfTheWeek
                            : wo.dayNumber}
                        </td>
                        <td>
                          <Link to={`/activities/workout/${wo.workout._id}`}>
                            {wo.workout.name}
                          </Link>
                        </td>
                        <td>{wo.workout.target}</td>
                        <td>{wo.workout.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            ))}
        </div>
      )}
      <div className={styles['bottom-btns-div']}>
        <Link
          to={`/activities/update-programPlan/${id}`}
          className={styles['bottom-btns']}
        >
          Log
        </Link>
      </div>
    </div>
  );
};

export default ProgramPlanDetails;
