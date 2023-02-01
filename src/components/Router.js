import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import AddExercise from './Health/Activities/Exercises/AddExercise';
import AddMuscle from './Health/Activities/Muscles/AddMuscle';
import AddEquipment from './Health/Activities/Equipments/AddEquipment';
import AddPhysicalCondition from './Health/Activities/PhysicalConditions/AddPhysicalCondition';
import ExerciseDetails from './Health/Activities/Exercises/ExerciseDetails';
import Exercises from './Health/Activities/Exercises/Exercises';
import UpdateExercise from './Health/Activities/Exercises/UpdateExercise';
import Muscles from './Health/Activities/Muscles/Muscles';
import Signup from './Auth/Signup';
import Login from './Auth/Login';
import ForgotPassword from './Auth/ForgotPassword';
import ResetPassword from './Auth/ResetPassword';
import ChangePassword from './Auth/ChangePassword';
import UserInfo from './User/UserInfo';
import AuthProtected from './Auth/ProtectedRoutes/AuthProtected';
import PrivateRoute from './Auth/ProtectedRoutes/PrivateRoute';
import AddWorkout from './Health/Activities/Workouts/AddWorkout';
import AddProgram from './Health/Activities/Programs/AddProgram';
import Programs from './Health/Activities/Programs/Programs';
import Workouts from './Health/Activities/Workouts/Workouts';
import WorkoutDetails from './Health/Activities/Workouts/WorkoutDetails';
import UpdateWorkout from './Health/Activities/Workouts/UpdateWorkout';
import ProgramDetails from './Health/Activities/Programs/ProgramDetails';
import UpdateProgram from './Health/Activities/Programs/UpdateProgram';
import MuscleDetails from './Health/Activities/Muscles/MuscleDetails';
import UpdateMuscle from './Health/Activities/Muscles/UpdateMuscle';
import UpdateEquipment from './Health/Activities/Equipments/UpdateEquipment';
import EquipmentDetails from './Health/Activities/Equipments/EquipmentDetails';
import Equipments from './Health/Activities/Equipments/Equipments';

//IMPROVE: Consider breaking down the routes into different files to make it more readable
const Router = props => {
    return <Routes>
        <Route path="/" element={<Home/>}/>
        
        {/* AUTH */}
        {/* IMPROVE: Consider using nested routes to apply protection to multiple routes */}
        <Route path="/auth/signup" element={<AuthProtected> <Signup/> </AuthProtected>}/>
        <Route path="/auth/login" element={<AuthProtected> <Login/> </AuthProtected>}/>
        <Route path="/auth/forgotPassword" element={<AuthProtected> <ForgotPassword/> </AuthProtected>}/>
        <Route path="/auth/resetPassword" element={<AuthProtected> <ResetPassword/> </AuthProtected>}/>
        <Route path="/auth/changePassword" element={<PrivateRoute> <ChangePassword/> </PrivateRoute>}/>

        {/* USER */}
        <Route path="/user/info" element={<PrivateRoute> <UserInfo/> </PrivateRoute>}/>
        
        {/* ACTIVITIES */}
        {/* Display all activities */}
        <Route path="/activities/programs" element={<Programs/>}/>
        <Route path="/activities/workouts" element={<Workouts/>}/>
        <Route path="/activities/exercises" element={<Exercises/>}/>
        <Route path="/activities/muscles" element={<Muscles/>}/>
        <Route path="/activities/equipments" element={<Equipments/>}/>
        {/* <Route path="/activities/physicalConditions" element={<PhysicalConditions/>}/> */}

        {/* Display activity by id */}
        <Route path="/activities/program/:id" element={<ProgramDetails/>}/>
        <Route path="/activities/workout/:id" element={<WorkoutDetails/>}/>
        <Route path="/activities/exercise/:id" element={<ExerciseDetails/>}/>
        <Route path="/activities/muscle/:id" element={<MuscleDetails/>}/>
        <Route path="/activities/equipment/:id" element={<EquipmentDetails/>}/>
        {/* <Route path="/activities/physicalCondition/:id" element={<PhysicalConditionDetails/>}/> */}

        {/* Add activity */}
        <Route path="/activities/add-program" element={<AddProgram/>}/>
        <Route path="/activities/add-workout" element={<AddWorkout/>}/>
        <Route path="/activities/add-exercise" element={<AddExercise/>}/>
        <Route path="/activities/add-muscle" element={<AddMuscle/>}/>
        <Route path="/activities/add-equipment" element={<AddEquipment/>}/>
        {/* <Route path="/activities/add-physicalCondition" element={<AddPhysicalCondition/>}/> */}

        {/* Update activity */}
        <Route path="/activities/update-program/:id" element={<UpdateProgram/>}/>
        <Route path="/activities/update-workout/:id" element={<UpdateWorkout/>}/>
        <Route path="/activities/update-exercise/:id" element={<UpdateExercise/>}/>
        <Route path="/activities/update-muscle/:id" element={<UpdateMuscle/>}/>
        <Route path="/activities/update-equipment/:id" element={<UpdateEquipment/>}/>
        {/* <Route path="/activities/update-physicalCondition/:id" element={<UpdatePhysicalCondition/>}/> */}
        
    </Routes>
};

export default Router;