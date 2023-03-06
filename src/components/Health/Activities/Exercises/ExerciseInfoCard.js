import { Link } from "react-router-dom";
import styles from "../../../UI/General/CSS/InfoCard.module.css"

const ExerciseInfoCard = props => {
    const { info } = props ;

    return <div className={styles['card']}> 
            <img src={info.linkToImage} alt={info.name} className={styles['img']}/>
            <div className={styles['exercise-info']}>
                <div className={styles['names']}>
                    <h1 className={styles['name']}>{info.name}</h1>
                    <h2 className={styles['alternative-name']}>{info.alternativeName}</h2>
                </div>
                <div className={styles['general-info']}>
                    <div className={styles['info-block']}>
                        <p className={styles['label']}>Muscle:</p>
                        <p className={styles['value']}>{info.mainMuscle.name}</p>
                    </div>
                    <div className={styles['info-block']}>
                        <p className={styles['label']}>Equipment:</p>
                        {/* TODO: Handle scenarios where there is more than one equipment */}
                        <p className={styles['value']}>{info.equipments[0]?.name}</p>
                    </div>
                    <div className={styles['info-block']}>
                        <p className={styles['label']}>Type:</p>
                        {/* TODO: Handle scenarios where there is more than one type */}
                        <p className={styles['value']}>{info.types[0]}</p>
                    </div>
                </div>
            </div>
            <Link to={`/activities/exercise/${info._id}`} className={styles['link']}>Details</Link>
        </div>
};

export default ExerciseInfoCard;