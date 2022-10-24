import { apiGet, apiPost } from "../apiActions"

export const fetchAllMuscles = () => {
    return apiGet('/activities/physicalConditions');
}

export const fetchMuscleById = (id) => {
    return apiGet(`/activities/physicalCondition/${id}`);
}

export const postMuscle = (body) => {
    return apiPost(`/activities/physicalCondition`, body);
}