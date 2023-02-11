import { useEffect, useState } from 'react';
import { fetchProgramPlansAssignedToUser } from '../../../../util/apis/activities/programPlans/programPlansApis';
import styles from '../../../UI/General/CSS/ProgramPlan.module.css';
import ProgramPlanInfoCard from './ProgramPlanInfoCard';

const CompletedPrograms = (props) => {
  const [completedPrograms, setCompletedPrograms] = useState();

  useEffect(() => {
    fetchProgramPlansAssignedToUser('completed').then((response) => {
      if (!response || !response.isSuccess) return;
      setCompletedPrograms(response.body);
    });
  }, []);

  return (
    <div className={styles['grid']}>
      <h1 className={styles['page-title']}>Completed Programs</h1>

      {/* LOADING  IMAGE... */}
      {!completedPrograms && (
        <img
          src="/loading.gif"
          alt="Loading..."
          className={styles['loading-img']}
        />
      )}

      {/* COMPLETED PROGRAMS */}
      {completedPrograms && (
        <section id="pending" className={styles['program-section']}>
          <h3 className={styles['section-label']}>Completed Programs</h3>
          {completedPrograms.map((program) => (
            <ProgramPlanInfoCard program={program} />
          ))}
        </section>
      )}
    </div>
  );
};

export default CompletedPrograms;
