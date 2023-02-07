import { useEffect, useState } from 'react';
import { fetchProgramHistoriesAssignedToUser } from '../../../../util/apis/activities/programHistories/programHistoriesApis';
import styles from '../../../UI/General/CSS/ProgramHistory.module.css';
import ProgramHistoryInfoCard from './ProgramHistoryInfoCard';

const AssignedPrograms = (props) => {
  const [assignedPrograms, setAssignedPrograms] = useState();
  const [activeProgram, setActiveProgram] = useState();
  const [nextProgram, setNextProgram] = useState();
  const [waitingPrograms, setWaitingPrograms] = useState();

  useEffect(() => {
    fetchProgramHistoriesAssignedToUser('notCompleted').then((response) => {
      if (!response || !response.isSuccess) return;
      setAssignedPrograms(response.body);

      //active program
      setActiveProgram(response.body.filter((program) => program.isStarted)[0]);
      //next program
      setNextProgram(response.body.filter((program) => !program.isStarted)[0]);
      //waiting programs
      let waiting = response.body.filter((program) => !program.isStarted);
      if (waiting.length > 0) {
        waiting.shift();
      }
      setWaitingPrograms(waiting);
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
      {activeProgram && (
        <section id="active" className={styles['program-section']}>
          <h3 className={styles['section-label']}>Active Program</h3>
          <ProgramHistoryInfoCard program={activeProgram} />
        </section>
      )}

      {/* NEXT PROGRAM */}
      {nextProgram && (
        <section id="next" className={styles['program-section']}>
          <h3 className={styles['section-label']}>Next Program</h3>
          <ProgramHistoryInfoCard program={nextProgram} activateStart={true}/>
        </section>
      )}

      {/* WAITING PROGRAMS */}
      {waitingPrograms && (
        <section id="waiting" className={styles['program-section']}>
          <h3 className={styles['section-label']}>Waiting Programs</h3>
          {waitingPrograms.map((program) => (
            <ProgramHistoryInfoCard program={program} />
          ))}
        </section>
      )}
    </div>
  );
};

export default AssignedPrograms;
