import { Link } from 'react-router-dom';
import styles from '../../../UI/General/CSS/InfoCard.module.css';

const ProgramInfoCard = (props) => {
  const { info } = props;

  return (
    <div className={styles['card']}>
      <img src={info.linkToImage} alt={info.name} className={styles['img']} />
      <div className={styles['program-info']}>
        <div className={styles['names']}>
          <h1 className={styles['name']}>{info.name}</h1>
        </div>
        <div className={styles['general-info']}>
          <div className={styles['info-block']}>
            <p className={styles['label']}>Type:</p>
            <p className={styles['value']}>{info.type}</p>
          </div>
          <div className={styles['info-block']}>
            <p className={styles['label']}>Durantion:</p>
            <p className={styles['value']}>{info.duration} weeks</p>
          </div>

          <div className={styles['info-block']}>
            <p className={styles['label']}>Sequence:</p>
            <p className={styles['value']}>{info.sequence}</p>
          </div>
        </div>
      </div>
      <Link to={`/activities/program/${info._id}`} className={styles['link']}>
        Details
      </Link>
    </div>
  );
};

export default ProgramInfoCard;
