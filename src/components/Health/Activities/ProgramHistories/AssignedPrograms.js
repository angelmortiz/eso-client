import { useEffect, useState } from 'react';
import { fetchProgramHistoriesAssignedToUser } from '../../../../util/apis/activities/programHistories/programHistoriesApis';
import styles from '../../../UI/General/CSS/ProgramHistory.module.css';
import ProgramHistoryInfoCard from './ProgramHistoryInfoCard';

const AssignedPrograms = (props) => {
  const [assignedPrograms, setAssignedPrograms] = useState();
  const [activePrograms, setActivePrograms] = useState();
  const [nextProgram, setNextProgram] = useState();
  const [pendingPrograms, setPendingPrograms] = useState();

  useEffect(() => {
    fetchProgramHistoriesAssignedToUser('notCompleted').then((response) => {
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
            <ProgramHistoryInfoCard program={program} />
          ))}
        </section>
      )}

      {/* NEXT PROGRAM */}
      {nextProgram && (
        <section id="next" className={styles['program-section']}>
          <h3 className={styles['section-label']}>Next Program</h3>
          <ProgramHistoryInfoCard program={nextProgram} activateStart={true}/>
        </section>
      )}

      {/* PENDING PROGRAMS */}
      {pendingPrograms && (
        <section id="pending" className={styles['program-section']}>
          <h3 className={styles['section-label']}>Pending Programs</h3>
          {pendingPrograms.map((program) => (
            <ProgramHistoryInfoCard program={program} />
          ))}
        </section>
      )}
    </div>
  );
};

export default AssignedPrograms;
