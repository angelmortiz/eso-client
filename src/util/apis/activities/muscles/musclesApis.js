import { apiDelete, apiGet, apiPost, apiPut } from "../../apiActions"

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

export const putMuscle = (id, body) => {
    return apiPut(`/activities/muscle/${id}`, body);
}

export const deleteMuscle = (id) => {
    return apiDelete(`/activities/muscle/${id}`);
}