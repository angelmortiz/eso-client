import { useEffect, useState } from 'react';
import { fetchProgramHistoriesAssignedToUser } from '../../../../util/apis/activities/programHistories/programHistoriesApis';
import styles from '../../../UI/General/CSS/ProgramHistory.module.css';
import ProgramHistoryInfoCard from './ProgramHistoryInfoCard';

const CompletedPrograms = (props) => {
  const [completedPrograms, setCompletedPrograms] = useState();

  useEffect(() => {
    fetchProgramHistoriesAssignedToUser('completed').then((response) => {
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
            <ProgramHistoryInfoCard program={program} />
          ))}
        </section>
      )}
    </div>
  );
};

export default CompletedPrograms;
