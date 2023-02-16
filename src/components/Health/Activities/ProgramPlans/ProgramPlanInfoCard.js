import { Link } from 'react-router-dom';
import styles from '../../../UI/General/CSS/ProgramPlan.module.css';

const ProgramPlanInfoCard = (props) => {
  const { programPlan, activateStart } = props;
  const dateFormat = { month: 'long', day: 'numeric', year: 'numeric' };

  return (
    <div className={styles['card']}>
      <h2 className={styles['card-title']}>{programPlan.program.name}</h2>
      <div className={styles['programPlan-info']}>
        <div className={styles['img-div']}>
          <img
            src={programPlan.program.linkToImage}
            alt={programPlan.program.name}
            className={styles['img']}
          />
        </div>
        <div className={styles['programPlan-details']}>
          {programPlan.isStarted && (
            <span>
              <strong>Started on:</strong>{' '}
              {new Date(programPlan.startedOn).toLocaleDateString(
                'en-US',
                dateFormat
              )}
            </span>
          )}
          {programPlan.isCompleted && (
            <span>
              <strong>Completed on:</strong>{' '}
              {new Date(programPlan.completedOn).toLocaleDateString(
                'en-US',
                dateFormat
              )}
            </span>
          )}
          <span>
            <strong>Duration</strong>: {programPlan.program.duration} weeks
          </span>
          <span>
            <strong>Type</strong>: {programPlan.program.type}
          </span>
          <span>
            <strong>Assigned by</strong>: {programPlan.assignedBy.fullName}
          </span>
        </div>
      </div>
      <div className={styles['btns-div']}>
        <Link
          to={`/activities/programplan/${programPlan._id}`}
          className={styles['btn-link']}
        >
          Details
        </Link>
        <Link
          to={`/activities/programplan/${programPlan._id}`}
          className={styles['btn-link']}
        >
          Log
        </Link>
        {/*  
        {programPlan.isStarted && !programPlan.isCompleted && (
          <Link
            to={`/activities/programplan/${programPlan.program_id}`}
            className={styles['btn-link']}
          >
            Continue
          </Link>
        )}
        
        {programPlan.isStarted && programPlan.isCompleted && (
          <Link
            to={`/activities/program/${programPlan.program._id}`}
            className={styles['btn-link']}
          >
            Logs
          </Link>
        )}
        
        {!programPlan.isStarted && activateStart && (
          <Link
            to={`/activities/program/${programPlan.program._id}`}
            className={styles['btn-link']}
          >
            Start
          </Link>
        )}
        */}
      </div>
    </div>
  );
};

export default ProgramPlanInfoCard;
