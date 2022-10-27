import InfoCard from "../../General/Cards/InfoCard";
import classes from "./Exercises.module.css";
import { fetchAllExercises } from "../../../../util/apis/exercises/exercisesApis"
import { useState, useEffect } from "react";

const Exercises = props => {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        fetchAllExercises().then(data => { 
            console.log("data: ", data);
            setExercises(data);
        });
    }, []);

    const addInfoCards = () => {
        let infoCards = [];
        infoCards = exercises.map(exercise => {
            return <InfoCard key={exercise._id} info={exercise} />
        });
        return infoCards;
    };

    return <div className={classes['grid']}>
        <h1 className={classes['title']}>Exercises</h1>        
        { exercises && exercises.length 
                ? addInfoCards()
                : <img src="/loading.gif" alt="Loading..." className={classes['loading-img']}/>}
    </div>
};

export default Exercises;