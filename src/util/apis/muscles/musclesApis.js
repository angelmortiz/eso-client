import { apiGet, apiPost } from "../apiActions"

export const fetchAllMuscles = () => {
    return apiGet('/activities/muscles');
}

export const fetchAllMuscleNames = () => {
    return apiGet('/activities/muscleNames');
}

export const fetchMuscleById = (id) => {
    return apiGet(`/activities/muscle/${id}`);
}

export const postMuscle = (body) => {
    return apiPost(`/activities/muscle`, body);
}