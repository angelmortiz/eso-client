import { Route, Routes } from 'react-router-dom';
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
import AuthProtected from '../Auth/ProtectedRoutes/AuthProtected';
import PrivateRoute from '../Auth/ProtectedRoutes/PrivateRoute';

//IMPROVE: This is no longer just "health", this should be place in another file
const Router = props => {
    return <Routes>
        <Route path="/" element={<HomePage/>}/>
        
        {/* AUTH */}
        {/* IMPROVE: Consider using nested routes to apply protection to multiple routes */}
        <Route path="/auth/signup" element={<AuthProtected> <Signup/> </AuthProtected>}/>
        <Route path="/auth/login" element={<AuthProtected> <Login/> </AuthProtected>}/>
        <Route path="/auth/forgotPassword" element={<AuthProtected> <ForgotPassword/> </AuthProtected>}/>
        <Route path="/auth/resetPassword" element={<AuthProtected> <ResetPassword/> </AuthProtected>}/>
        <Route path="/auth/changePassword" element={<PrivateRoute> <ChangePassword/> </PrivateRoute>}/>

        {/* USER */}
        <Route path="/user/info" element={<PrivateRoute> <UserInfo/> </PrivateRoute>}/>
        
        {/* HEALTH */}
        <Route path="/nutrition/add-food" element={<AddFood/>}/>
        <Route path="/activities/exercises" element={<PrivateRoute> <Exercises/> </PrivateRoute>}/>
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

export default Router;