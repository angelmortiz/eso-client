import { Route, Routes } from 'react-router-dom';
import Exercise from './Activities/Exercises/Exercise';
import Food from './Nutrition/Foods/Food';

const HealthContent = props => {
    return <Routes>
        <Route path="/nutrition/foods" element={<Food/>}/>
        <Route path="/activities/exercises" element={<Exercise/>}/>
    </Routes>
};

export default HealthContent;