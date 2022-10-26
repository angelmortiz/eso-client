import { useState } from "react";
import { useParams } from 'react-router-dom';
import { fetchExerciseById } from "../../../../util/apis/exercises/exercisesApis"
import classes from '../../General/CSS/Details.module.css';


const ExerciseDetails = props => {
    const { id } = useParams();
    const [exercise, setExercise] = useState(null);

    if (!exercise) {
        fetchExerciseById(id).then(data => { 
            console.log("Exercise data: ", data);
            setExercise(data);
        });
    }

    return <section className={classes['main-section']}>
        {/* NAME */}
        <h1 className={classes['name']}>Squats</h1>
        {/* ALTERNATIVE NAME */}
        <h2 className={classes['alternative-name']}>(Sentadillas)</h2>
        {/* IMAGE */}
        <img src="/squat.jpg" alt="Squat" className={classes['img']}/>
        {/* VIDEO */}
        <p><strong>&#60;Placeholder for video&#62;</strong></p>
        <div className={classes['general-info']}>
            {/* DIFFICULTY */}
            <div className={classes['info-block']}>
                <p className={classes['label']}>Difficulty: </p>
                <p className={classes['value']}>Advanced</p>
            </div>
            {/* COMPOUND MOVEMENT */}
            <div className={classes['info-block']}>
                <p className={classes['label']}>Compound movement: </p>
                <p className={classes['value']}>Yes</p>
            </div>
            {/* MAIN MUSCLE */}
            <div className={classes['info-block']}>
                <p className={classes['label']}>Main muscle: </p>
                <p className={classes['value']}>Quadriceps</p>
            </div>
            {/* SECONDARY MUSCLES */}
            <div className={classes['info-block']}>
                <p className={classes['label']}>Secondary muscles: </p>
                <p className={classes['value']}>Glutes</p>
            </div>
            {/* TYPES */}
            <div className={classes['info-block']}>
                <p className={classes['label']}>Type: </p>
                <p className={classes['value']}>Strength</p>
            </div>
            {/* EQUIPMENTS */}
            <div className={classes['info-block']}>
                <p className={classes['label']}>Equipments: </p>
                <p className={classes['value']}>Barbell</p>
            </div>
        </div>
    </section>
    
};

export default ExerciseDetails;