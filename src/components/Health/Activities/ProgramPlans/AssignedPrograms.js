import { useEffect, useState } from 'react';
import { fetchProgramPlansAssignedToUser } from '../../../../util/apis/activities/programPlans/programPlansApis';
import styles from '../../../UI/General/CSS/ProgramPlan.module.css';
import ProgramPlanInfoCard from './ProgramPlanInfoCard';

const AssignedPrograms = (props) => {
  const [assignedPrograms, setAssignedPrograms] = useState();
  const [activePrograms, setActivePrograms] = useState();
  const [nextProgram, setNextProgram] = useState();
  const [pendingPrograms, setPendingPrograms] = useState();

  useEffect(() => {
    fetchProgramPlansAssignedToUser('notCompleted').then((response) => {
      if (!response || !response.isSuccess) return;
      setAssignedPrograms(response.body);

      //active program
      setActivePrograms(response.body.filter((program) => program.isStarted));
      //next program
      setNextProgram(response.body.filter((program) => !program.isStarted)[0]);
      //pending programs
      let pending = response.body.filter((program) => !program.isStarted);
      if (pending.length > 0) {
        pending.shift();
      }
      setPendingPrograms(pending);
    });
  }, []);

  return (
    <div className={styles['grid']}>
      <h1 className={styles['page-title']}>Assigned Programs</h1>

      {/* LOADING  IMAGE... */}
      {!assignedPrograms && (
        <img
          src="/loading.gif"
          alt="Loading..."
          className={styles['loading-img']}
        />
      )}

      {/* ACTIVE PROGRAM */}
      {activePrograms && (
        <section id="active" className={styles['program-section']}>
          <h3 className={styles['section-label']}>Active Programs</h3>
          {activePrograms.map((program) => (
            <ProgramPlanInfoCard program={program} />
          ))}
        </section>
      )}

      {/* NEXT PROGRAM */}
      {nextProgram && (
        <section id="next" className={styles['program-section']}>
          <h3 className={styles['section-label']}>Next Program</h3>
          <ProgramPlanInfoCard program={nextProgram} activateStart={true}/>
        </section>
      )}

      {/* PENDING PROGRAMS */}
      {pendingPrograms && (
        <section id="pending" className={styles['program-section']}>
          <h3 className={styles['section-label']}>Pending Programs</h3>
          {pendingPrograms.map((program) => (
            <ProgramPlanInfoCard program={program} />
          ))}
        </section>
      )}
    </div>
  );
};

export default AssignedPrograms;
