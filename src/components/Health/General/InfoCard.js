import { Fragment } from "react";
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
                        <text className={classes['label']}>Muscle:</text>
                        <text className={classes['value']}>Quadriceps</text>
                    </div>
                    <div className={classes['info-block']}>
                        <text className={classes['label']}>Equipment:</text>
                        <text className={classes['value']}>Barbell</text>
                    </div>
                    <div className={classes['info-block']}>
                        <text className={classes['label']}>Compound:</text>
                        <text className={classes['value']}>Yes</text>
                    </div>
                </div>
            </div>
            <button className={classes['button']}>Details</button>
        </div>
    </Fragment>
};

export default InfoCard;