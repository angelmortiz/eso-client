import { apiGet } from "../apiActions"

export const fetchAllExercises = () => {
    return apiGet('/activities/exercises');
}

export const fetchExerciseById = (id) => {
    return apiGet(`/activities/exercise/${id}`);
}