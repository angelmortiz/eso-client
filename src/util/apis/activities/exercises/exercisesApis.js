import { apiDelete, apiGet, apiPost, apiPut } from "../../apiActions"

export const fetchAllExercises = () => {
    return apiGet('/activities/exercises');
}

export const fetchAllExerciseNames = () => {
    return apiGet('/activities/exerciseNames');
}

export const fetchExerciseById = (id) => {
    return apiGet(`/activities/exercise/${id}`);
}

export const postExercise = (body) => {
    return apiPost(`/activities/exercise`, body);
}

export const putExercise = (id, body) => {
    return apiPut(`/activities/exercise/${id}`, body);
}

export const deleteExercise = (id) => {
    return apiDelete(`/activities/exercise/${id}`);
}