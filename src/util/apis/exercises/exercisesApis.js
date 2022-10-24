import { apiGet, apiPost } from "../apiActions"

export const fetchAllExercises = () => {
    return apiGet('/activities/exercises');
}

export const fetchExerciseById = (id) => {
    return apiGet(`/activities/exercise/${id}`);
}

export const postExercise = (body) => {
    return apiPost(`/activities/exercise`, body);
}