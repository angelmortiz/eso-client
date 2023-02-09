import { Link } from 'react-router-dom';
import styles from '../../../UI/General/CSS/ProgramHistory.module.css';

const ProgramHistoryInfoCard = (props) => {
  const { program, activateStart } = props;
  const dateFormat = { month: 'long', day: 'numeric', year: 'numeric' };

  return (
    <div className={styles['card']}>
      <h2 className={styles['card-title']}>{program.programInfo.name}</h2>
      <div className={styles['program-info']}>
        <div className={styles['img-div']}>
          <img
            src={program.programInfo.linkToImage}
            alt={program.programInfo.name}
            className={styles['img']}
          />
        </div>
        <div className={styles['program-details']}>
          {program.isStarted && (
            <span>
              <strong>Started on:</strong>{' '}
              {new Date(program.startedOn).toLocaleDateString(
                'en-US',
                dateFormat
              )}
            </span>
          )}
          {program.isCompleted && (
            <span>
              <strong>Completed on:</strong>{' '}
              {new Date(program.completedOn).toLocaleDateString(
                'en-US',
                dateFormat
              )}
            </span>
          )}
          <span>
            <strong>Duration</strong>: {program.programInfo.duration} weeks
          </span>
          <span>
            <strong>Type</strong>: {program.programInfo.type}
          </span>
          <span>
            <strong>Assigned by</strong>: {program.assignedByName}
          </span>
        </div>
      </div>
      <div className={styles['btns-div']}>
        <Link
          to={`/activities/program/${program.programId}`}
          className={styles['btn-link']}
        >
          Details
        </Link>
        {/* CONTINUE LOGGING PROGRAM */}
        {program.isStarted && !program.isCompleted && (
          <Link
            to={`/activities/program/${program.programId}`}
            className={styles['btn-link']}
          >
            Continue
          </Link>
        )}
        {/* ACCESS PROGRAM LOGS */}
        {program.isStarted && program.isCompleted && (
          <Link
            to={`/activities/program/${program.programId}`}
            className={styles['btn-link']}
          >
            Logs
          </Link>
        )}
        {/* START PROGRAM */}
        {!program.isStarted && activateStart && (
          <Link
            to={`/activities/program/${program.programId}`}
            className={styles['btn-link']}
          >
            Start
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProgramHistoryInfoCard;
