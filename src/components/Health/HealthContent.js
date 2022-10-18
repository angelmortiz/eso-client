import { Route, Routes } from 'react-router-dom';
import AddExercise from './Activities/Exercises/AddExercise';
import Exercises from './Activities/Exercises/Exercises';
import AddFood from './Nutrition/Foods/AddFood';

const HealthContent = props => {
    return <Routes>
        <Route path="/activities/exercises" element={<Exercises/>}/>
        <Route path="/nutrition/add-food" element={<AddFood/>}/>
        <Route path="/activities/add-exercise" element={<AddExercise/>}/>
    </Routes>
};

export default HealthContent;