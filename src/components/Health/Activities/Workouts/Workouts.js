import { useEffect, useState } from "react";
import { fetchAllWorkouts } from "../../../../util/apis/activities/workouts/workoutsApis";
import WorkoutInfoCard from "./WorkoutInfoCard";
import GridView from "../../../UI/Grids/GridView";

const Workouts = (props) => {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        fetchAllWorkouts().then(response => { 
            console.log('response: ', response);

            if (!response || !response.isSuccess) return;
            setWorkouts(response.body);
        });
    }, []);

    const addInfoCards = () => {
        let infoCards = [];
        infoCards = workouts.map(workout => {
            return <WorkoutInfoCard key={workout._id} info={workout} />
        });
        return infoCards;
    };

    return <GridView title="Workouts">
        {addInfoCards()}
    </GridView>
};

export default Workouts;