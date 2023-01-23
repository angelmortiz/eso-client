import { Link } from "react-router-dom";
import classes from "./InfoCard.module.css"

const InfoCard = props => {
    const info = props.info;

    return <div className={classes['card']}> 
            <img src={info.linkToImage} alt={info.name} className={classes['img']}/>
            <div className={classes['exercise-info']}>
                <div className={classes['names']}>
                    <h1 className={classes['name']}>{info.name}</h1>
                    <h2 className={classes['alternative-name']}>{info.alternativeName}</h2>
                </div>
                <div className={classes['general-info']}>
                    <div className={classes['info-block']}>
                        <p className={classes['label']}>Muscle:</p>
                        <p className={classes['value']}>{info.mainMuscle.muscleName}</p>
                    </div>
                    <div className={classes['info-block']}>
                        <p className={classes['label']}>Equipment:</p>
                        {/* TODO: Handle scenarios where there is more than one equipment */}
                        <p className={classes['value']}>{info.equipments[0]?.equipmentName}</p>
                    </div>
                    <div className={classes['info-block']}>
                        <p className={classes['label']}>Type:</p>
                        {/* TODO: Handle scenarios where there is more than one equipment */}
                        <p className={classes['value']}>{info.types[0]}</p>
                    </div>
                </div>
            </div>
            <Link to={`/activities/exercise/${info._id}`} className={classes['link']}>Details</Link>
        </div>
};

export default InfoCard;