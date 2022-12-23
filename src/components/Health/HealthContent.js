import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from '../UI/HomePage/HomePage';
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
import ResetPassword from '../Auth/ResetPassword';
import ChangePassword from '../Auth/ChangePassword';
import UserInfo from '../User/UserInfo';

//IMPROVE: This is no longer just "health", this should be place in another file
const HealthContent = props => {
    const isUserAuthenticated = useSelector(state => state.auth.isUserAuthenticated);

    return <Routes>
        <Route path="/" element={<HomePage/>}/>
        
        {/* AUTH */}
        <Route path="/auth/signup" element={isUserAuthenticated ? <Navigate replace to='/'/> : <Signup/>}/>
        <Route path="/auth/login" element={isUserAuthenticated ? <Navigate replace to='/'/> : <Login/>}/>
        <Route path="/auth/forgotPassword" element={isUserAuthenticated ? <Navigate replace to='/'/>: <ForgotPassword/>}/>
        <Route path="/auth/resetPassword" element={isUserAuthenticated ? <Navigate replace to='/'/> : <ResetPassword/>}/>
        <Route path="/auth/changePassword" element={!isUserAuthenticated ? <Navigate replace to='/auth/login'/> : <ChangePassword/>}/>
        
        {/* USER */}
        <Route path="/user/info" element={<UserInfo/>}/>
        
        {/* HEALTH */}
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