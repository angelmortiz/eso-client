import { Route, Routes } from 'react-router-dom';
import AddExercise from './Activities/Exercises/AddExercise';
import AddMuscle from './Activities/Muscles/AddMuscle';
import AddEquipment from './Activities/Equipments/AddEquipment';
import AddPhysicalCondition from './Activities/PhysicalConditions/AddPhysicalCondition';
import ExerciseDetails from './Activities/Exercises/ExerciseDetails';
import Exercises from './Activities/Exercises/Exercises';
import AddFood from './Nutrition/Foods/AddFood';
import UpdateExercise from './Activities/Exercises/UpdateExercise';
import Muscles from './Activities/Muscles/Muscles';
import Signup from '../Auth/Signup';
import Login from '../Auth/Login';
import ForgotPassword from '../Auth/ForgotPassword';

const HealthContent = props => {
    return <Routes>
        <Route path="/auth/signup" element={<Signup/>}/>
        <Route path="/auth/login" element={<Login/>}/>
        <Route path="/auth/forgotPassword" element={<ForgotPassword/>}/>
        <Route path="/nutrition/add-food" element={<AddFood/>}/>
        <Route path="/activities/exercises" element={<Exercises/>}/>
        <Route path="/activities/exercise/:id" element={<ExerciseDetails/>}/>
        <Route path="/activities/add-exercise" element={<AddExercise/>}/>
        <Route path="/activities/update-exercise/:id" element={<UpdateExercise/>}/>
        <Route path="/activities/muscles" element={<Muscles/>}/>
        {/* <Route path="/activities/muscle/:id" element={<MuscleDetails/>}/> */}
        <Route path="/activities/add-muscle" element={<AddMuscle/>}/>
        {/* <Route path="/activities/equipments" element={<Equipments/>}/>
        <Route path="/activities/equipment/:id" element={<EquipmentDetails/>}/> */}
        <Route path="/activities/add-equipment" element={<AddEquipment/>}/>
        {/* <Route path="/activities/physicalConditions" element={<PhysicalConditions/>}/>
        <Route path="/activities/physicalCondition/:id" element={<PhysicalConditionDetails/>}/> */}
        <Route path="/activities/add-physicalCondition" element={<AddPhysicalCondition/>}/>
    </Routes>
};

export default HealthContent;