import InfoCard from "../../General/Cards/InfoCard";
import classes from "./Exercises.module.css";
import { fetchAllExercises } from "../../../../util/apis/exercises/exercisesApis"
import { useState } from "react";

const Exercises = props => {
    const [exercises, setExercises] = useState([]);

    if (!exercises || exercises.length ===  0) {
        fetchAllExercises().then(data => { 
            console.log("Exercises data: ", data);
            setExercises(data);
        });
    }

    return <div className={classes['grid']}>
        <h1 className={classes['title']}>Exercises</h1>
        <InfoCard id="630a1b779f9e9bd37eb241c5" />
        <InfoCard id="630a1b779f9e9bd37eb241c5" />
        <InfoCard id="630a1b779f9e9bd37eb241c5" />
        <InfoCard id="630a1b779f9e9bd37eb241c5" />
        <InfoCard id="630a1b779f9e9bd37eb241c5" />
        <InfoCard id="630a1b779f9e9bd37eb241c5" />
        <InfoCard id="630a1b779f9e9bd37eb241c5" />
        <InfoCard id="630a1b779f9e9bd37eb241c5" />
        <InfoCard id="630a1b779f9e9bd37eb241c5" />
        <InfoCard id="630a1b779f9e9bd37eb241c5" />
        <InfoCard id="630a1b779f9e9bd37eb241c5" />
        <InfoCard id="630a1b779f9e9bd37eb241c5" />
        <InfoCard id="630a1b779f9e9bd37eb241c5" />
        <InfoCard id="630a1b779f9e9bd37eb241c5" />
        <InfoCard id="630a1b779f9e9bd37eb241c5" />
        <InfoCard id="630a1b779f9e9bd37eb241c5" />
        <InfoCard id="630a1b779f9e9bd37eb241c5" />
        <InfoCard id="630a1b779f9e9bd37eb241c5" />
        <InfoCard id="630a1b779f9e9bd37eb241c5" />
        <InfoCard id="630a1b779f9e9bd37eb241c5" />
        <InfoCard id="630a1b779f9e9bd37eb241c5" />
        <InfoCard id="630a1b779f9e9bd37eb241c5" />
        <InfoCard id="630a1b779f9e9bd37eb241c5" />
        <InfoCard id="630a1b779f9e9bd37eb241c5" />
    </div>
};

export default Exercises;