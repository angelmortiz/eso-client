import { fetchAllExercises } from "../../../../util/apis/activities/exercises/exercisesApis";
import { useState, useEffect } from "react";
import ExerciseInfoCard from "./ExerciseInfoCard";
import GridView from "../../../UI/Grids/GridView";

const Exercises = (props) => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetchAllExercises().then((response) => {
      //console.log('Response: ', response);

      if (!response || !response.isSuccess) return;
      setExercises(response.body);
    });
  }, []);

  const addInfoCards = () => {
    let infoCards = [];
    infoCards = exercises.map((exercise) => {
      return <ExerciseInfoCard key={exercise._id} info={exercise} />;
    });
    return infoCards;
  };

  return <GridView title="Exercises">{addInfoCards()}</GridView>;
};

export default Exercises;
