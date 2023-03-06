import { useEffect, useState } from 'react';
import { fetchProgramPlansAssignedToUser } from '../../../../util/apis/activities/programPlans/programPlansApis';
import styles from '../../../UI/General/CSS/ProgramPlan.module.css';
import ProgramPlanInfoCard from './ProgramPlanInfoCard';

const CompletedProgramPlans = (props) => {
  const [completedProgramPlans, setCompletedProgramPlans] = useState();

  useEffect(() => {
    fetchProgramPlansAssignedToUser('completed').then((response) => {
      if (!response || !response.isSuccess) return;
      //console.log('Response: ', response);

      setCompletedProgramPlans(response.body);
    });
  }, []);

  return (
    <div className={styles['grid']}>
      <h1 className={styles['page-title']}>Completed Plans</h1>

      {/* LOADING  IMAGE... */}
      {!completedProgramPlans && (
        <img
          src="/loading.gif"
          alt="Loading..."
          className={styles['loading-img']}
        />
      )}

      {/* COMPLETED PROGRAMS */}
      {completedProgramPlans && (
        <section id="pending" className={styles['programPlan-section']}>
          <h3 className={styles['section-label']}>Completed Plans</h3>
          {completedProgramPlans.map((programPlan, index) => (
            <ProgramPlanInfoCard
              key={`program-plan_completed_${index}`}
              programPlan={programPlan}
            />
          ))}
        </section>
      )}
    </div>
  );
};

export default CompletedProgramPlans;
