import { useEffect, useState } from 'react';
import { fetchProgramPlansAssignedToUser } from '../../../../util/apis/activities/programPlans/programPlansApis';
import styles from '../../../UI/General/CSS/ProgramPlan.module.css';
import ProgramPlanInfoCard from './ProgramPlanInfoCard';

const AssignedPrograms = (props) => {
  const [assignedPrograms, setAssignedPrograms] = useState();
  // const [activePrograms, setActivePrograms] = useState();
  // const [nextProgram, setNextProgram] = useState();
  // const [pendingPrograms, setPendingPrograms] = useState();

  useEffect(() => {
    fetchProgramPlansAssignedToUser().then((response) => {
      if (!response || !response.isSuccess) return;
      console.log('response: ', response);
      setAssignedPrograms(response.body);

      // //active program
      // setActivePrograms(response.body.filter((program) => program.isStarted));
      // //next program
      // setNextProgram(response.body.filter((program) => !program.isStarted)[0]);
      // //pending programs
      // let pending = response.body.filter((program) => !program.isStarted);
      // if (pending.length > 0) {
      //   pending.shift();
      // }
      // setPendingPrograms(pending);
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

      {/* ASSIGNED PROGRAMS */}
      {assignedPrograms && (
        <section id="active" className={styles['program-section']}>
          <h3 className={styles['section-label']}>Assigned Programs</h3>
          {assignedPrograms.map((programPlan) => (
            <ProgramPlanInfoCard
              key={`programPlan_${programPlan._id}`}
              programPlan={programPlan}
            />
          ))}
        </section>
      )}

      {/*  
      {activePrograms && (
        <section id="active" className={styles['program-section']}>
          <h3 className={styles['section-label']}>Active Programs</h3>
          {activePrograms.map((program) => (
            <ProgramPlanInfoCard program={program} />
          ))}
        </section>
      )}

      
      {nextProgram && (
        <section id="next" className={styles['program-section']}>
          <h3 className={styles['section-label']}>Next Program</h3>
          <ProgramPlanInfoCard program={nextProgram} activateStart={true} />
        </section>
      )}

      
      {pendingPrograms && (
        <section id="pending" className={styles['program-section']}>
          <h3 className={styles['section-label']}>Pending Programs</h3>
          {pendingPrograms.map((program) => (
            <ProgramPlanInfoCard program={program} />
          ))}
        </section>
          
      )}
    */}
    </div>
  );
};

export default AssignedPrograms;
