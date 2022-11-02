import InfoCard from "../../General/Cards/InfoCard";
import HealthGrid from "../../General/Pages/HealthGrid";
import { fetchAllExercises } from "../../../../util/apis/exercises/exercisesApis"
import { useState, useEffect } from "react";

const Exercises = props => {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        fetchAllExercises().then(data => { 
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

    return <HealthGrid title="Exercises">
        {addInfoCards()}
    </HealthGrid>
};

export default Exercises;