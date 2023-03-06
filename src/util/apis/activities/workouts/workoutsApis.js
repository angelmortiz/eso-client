import { apiDelete, apiGet, apiPost, apiPut } from "../../apiActions"

export const fetchAllWorkouts = () => {
    return apiGet('/activities/workouts');
}

export const fetchAllWorkoutNames = () => {
    return apiGet('/activities/workoutNames');
}

export const fetchWorkoutById = (id) => {
    return apiGet(`/activities/workout/${id}`);
}

export const postWorkout = (body) => {
    return apiPost(`/activities/workout`, body);
}

export const putWorkout = (id, body) => {
    return apiPut(`/activities/workout/${id}`, body);
}

export const deleteWorkout = (id) => {
    return apiDelete(`/activities/workout/${id}`);
}