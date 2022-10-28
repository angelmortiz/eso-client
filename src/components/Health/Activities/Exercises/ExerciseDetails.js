import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { fetchExerciseById } from "../../../../util/apis/exercises/exercisesApis"
import classes from '../../General/CSS/Details.module.css';


const ExerciseDetails = props => {
    const { id } = useParams();
    const [exercise, setExercise] = useState(null);

    useEffect(() => {
        if (!id) console.log(`Error: exercise id not found in the url.`);
        fetchExerciseById(id).then(data => { 
            setExercise(data);
        });
    }, [id]);

    return <section className={classes['card']}>
        { !exercise
        ? <img src="/loading.gif" alt="Loading..." className={classes['loading-img']}/>
        : <div className={classes['main-section']}>
            {/* NAME */}
            <h1 className={classes['name']}>{exercise.name}</h1>
            {/* ALTERNATIVE NAME */}
            <h2 className={classes['alternative-name']}>{exercise.alternativeName}</h2>
            {/* IMAGE */}
            <img src={exercise.linkToImage} alt={exercise.name} className={classes['img']}/>
            {/* VIDEO */}
            <p><strong>&#60;Placeholder for video&#62;</strong></p>
            <div className={classes['general-info']}>
                {/* DIFFICULTY */}
                <div className={classes['info-block']}>
                    <p className={classes['label']}>Difficulty: </p>
                    <p className={classes['value']}>{exercise.difficulty}</p>
                </div>
                {/* COMPOUND MOVEMENT */}
                <div className={classes['info-block']}>
                    <p className={classes['label']}>Compound movement: </p>
                    <p className={classes['value']}>{exercise.compoundMovement ? 'Yes' : 'No'}</p>
                </div>
                {/* MAIN MUSCLE */}
                <div className={classes['info-block']}>
                    <p className={classes['label']}>Main muscle: </p>
                    <p className={classes['value']}>{exercise.mainMuscle.muscleName}</p>
                </div>
                {/* SECONDARY MUSCLES */}
                <div className={classes['info-block']}>
                    <p className={classes['label']}>Secondary muscles: </p>
                    {/* TODO: Implement logic for multiple options */}
                    <p className={classes['value']}>{exercise.secondaryMuscles[0]?.muscleName || "No secondary muscles"}</p>
                </div>
                {/* TYPES */}
                <div className={classes['info-block']}>
                    <p className={classes['label']}>Type: </p>
                    {/* TODO: Implement logic for multiple options */}
                    <p className={classes['value']}>{exercise.types[0]}</p>
                </div>
                {/* EQUIPMENTS */}
                <div className={classes['info-block']}>
                    <p className={classes['label']}>Equipments: </p>
                    {/* TODO: Implement logic for multiple options */}
                    <p className={classes['value']}>{exercise.equipments[0]?.equipmentName || "No equipment"}</p>
                </div>
            </div>
         </div>
        }
    </section>
    
};

export default ExerciseDetails;