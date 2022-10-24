import { Route, Routes } from 'react-router-dom';
import AddExercise from './Activities/Exercises/AddExercise';
import AddMuscle from './Activities/Muscles/AddMuscle';
import ExerciseDetails from './Activities/Exercises/ExerciseDetails';
import Exercises from './Activities/Exercises/Exercises';
import AddFood from './Nutrition/Foods/AddFood';

const HealthContent = props => {
    return <Routes>
        <Route path="/nutrition/add-food" element={<AddFood/>}/>
        <Route path="/activities/exercises" element={<Exercises/>}/>
        <Route path="/activities/exercise/:id" element={<ExerciseDetails/>}/>
        <Route path="/activities/add-exercise" element={<AddExercise/>}/>
        {/* <Route path="/activities/muscles" element={<Muscles/>}/>
        <Route path="/activities/muscle/:id" element={<MuscleDetails/>}/> */}
        <Route path="/activities/add-muscle" element={<AddMuscle/>}/>

    </Routes>
};

export default HealthContent;