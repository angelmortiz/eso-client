import { Fragment } from "react";
import { Link } from "react-router-dom";
import classes from "./InfoCard.module.css"

const InfoCard = props => {

    return <Fragment>
        <div className={classes['card']}> 
            <img src="/squat.jpg" alt="Squat" className={classes['img']}/>
            <div className={classes['exercise-info']}>
                <div className={classes['names']}>
                    <h1 className={classes['name']}>Squats</h1>
                    <h2 className={classes['alternative-name']}>Sentadillas</h2>
                </div>
                <div className={classes['general-info']}>
                    <div className={classes['info-block']}>
                        <p className={classes['label']}>Muscle:</p>
                        <p className={classes['value']}>Quadriceps</p>
                    </div>
                    <div className={classes['info-block']}>
                        <p className={classes['label']}>Equipment:</p>
                        <p className={classes['value']}>Barbell</p>
                    </div>
                    <div className={classes['info-block']}>
                        <p className={classes['label']}>Compound:</p>
                        <p className={classes['value']}>Yes</p>
                    </div>
                </div>
            </div>
            <Link to={`/activities/exercise/${props.id}`} className={classes['link']}>
                Details
            </Link>
        </div>
    </Fragment>
};

export default InfoCard;