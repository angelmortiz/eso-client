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
        <text><strong>&#60;Placeholder for video&#62;</strong></text>
        <div className={classes['general-info']}>
            {/* DIFFICULTY */}
            <div className={classes['info-block']}>
                <text className={classes['label']}>Difficulty: </text>
                <text className={classes['value']}>Advanced</text>
            </div>
            {/* COMPOUND MOVEMENT */}
            <div className={classes['info-block']}>
                <text className={classes['label']}>Compound movement: </text>
                <text className={classes['value']}>Yes</text>
            </div>
            {/* MAIN MUSCLE */}
            <div className={classes['info-block']}>
                <text className={classes['label']}>Main muscle: </text>
                <text className={classes['value']}>Quadriceps</text>
            </div>
            {/* SECONDARY MUSCLES */}
            <div className={classes['info-block']}>
                <text className={classes['label']}>Secondary muscles: </text>
                <text className={classes['value']}>Glutes</text>
            </div>
            {/* TYPES */}
            <div className={classes['info-block']}>
                <text className={classes['label']}>Type: </text>
                <text className={classes['value']}>Strength</text>
            </div>
            {/* EQUIPMENTS */}
            <div className={classes['info-block']}>
                <text className={classes['label']}>Equipments: </text>
                <text className={classes['value']}>Barbell</text>
            </div>
        </div>
    </section>
    
};

export default ExerciseDetails;