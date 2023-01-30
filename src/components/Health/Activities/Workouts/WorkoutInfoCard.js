import { Link } from 'react-router-dom';
import styles from '../../../UI/General/CSS/InfoCard.module.css';

const WorkoutInfoCard = (props) => {
  const { info } = props;

  return (
    <div className={styles['card']}>
      <img src={info.linkToImage} alt={info.name} className={styles['img']} />
      <div className={styles['workout-info']}>
        <div className={styles['names']}>
          <h1 className={styles['name']}>{info.name}</h1>
        </div>
        <div className={styles['general-info']}>
          <div className={styles['info-block']}>
            <p className={styles['label']}>Variant:</p>
            <p className={styles['value']}>{info.variant}</p>
          </div>
          <div className={styles['info-block']}>
            <p className={styles['label']}>Type:</p>
            <p className={styles['value']}>{info.type}</p>
          </div>
          <div className={styles['info-block']}>
            <p className={styles['label']}>Target:</p>
            <p className={styles['value']}>{info.target}</p>
          </div>
        </div>
      </div>
      <Link to={`/activities/workout/${info._id}`} className={styles['link']}>
        Details
      </Link>
    </div>
  );
};

export default WorkoutInfoCard;
