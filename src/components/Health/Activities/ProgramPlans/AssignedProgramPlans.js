import { useEffect, useState } from 'react';
import { fetchProgramPlansAssignedToUser } from '../../../../util/apis/activities/programPlans/programPlansApis';
import styles from '../../../UI/General/CSS/ProgramPlan.module.css';
import ProgramPlanInfoCard from './ProgramPlanInfoCard';

const AssignedProgramPlans = (props) => {
  const [assignedProgramPlans, setAssignedProgramPlans] = useState();
  const [activeProgramPlans, setActiveProgramPlans] = useState();
  const [nextProgramPlans, setNextProgramPlans] = useState();
  const [pendingProgramPlans, setPendingProgramPlans] = useState();

  useEffect(() => {
    fetchProgramPlansAssignedToUser().then((response) => {
      if (!response || !response.isSuccess) return;
      console.log('response: ', response);
      setAssignedProgramPlans(response.body);

      //active programPlan
      setActiveProgramPlans(
        response.body.filter((programPlan) => programPlan.logs?.log?.isStarted)
      );
      //next programPlan
      setNextProgramPlans(
        response.body.filter(
          (programPlan) => !programPlan.logs?.log?.isStarted
        )[0]
      );
      //pending programPlans
      let pending = response.body.filter(
        (programPlan) => !programPlan.logs?.log?.isStarted
      );
      if (pending.length > 0) {
        pending.shift();
      }
      setPendingProgramPlans(pending);
    });
  }, []);

  return (
    <div className={styles['grid']}>
      <h1 className={styles['page-title']}>Assigned Plans</h1>

      {/* LOADING  IMAGE... */}
      {!assignedProgramPlans && (
        <img
          src="/loading.gif"
          alt="Loading..."
          className={styles['loading-img']}
        />
      )}

      {/* ACTIVE PLANS */}
      {activeProgramPlans && (
        <section id="active" className={styles['programPlan-section']}>
          <h3 className={styles['section-label']}>Active Plans</h3>
          {activeProgramPlans.map((programPlan, index) => (
            <ProgramPlanInfoCard
              programPlan={programPlan}
              key={`program-plan_active_${index}`}
            />
          ))}
        </section>
      )}

      {/* NEXT PLANS */}
      {nextProgramPlans && (
        <section id="next" className={styles['programPlan-section']}>
          <h3 className={styles['section-label']}>Next Plan</h3>
          <ProgramPlanInfoCard
            programPlan={nextProgramPlans}
            activateStart={true}
            key={`program-plan_next`}
          />
        </section>
      )}

      {/* PENDING PLANS */}
      {pendingProgramPlans && (
        <section id="pending" className={styles['programPlan-section']}>
          <h3 className={styles['section-label']}>Pending Plans</h3>
          {pendingProgramPlans.map((programPlan, index) => (
            <ProgramPlanInfoCard
              programPlan={programPlan}
              key={`program-plan_pending_${index}`}
            />
          ))}
        </section>
      )}
    </div>
  );
};

export default AssignedProgramPlans;
