import { apiGet, apiPost } from "../../apiActions"

export const fetchAllPhysicalConditions = () => {
    return apiGet('/activities/physicalConditions');
}

export const fetchPhysicalConditionById = (id) => {
    return apiGet(`/activities/physicalCondition/${id}`);
}

export const postPhysicalCondition = (body) => {
    return apiPost(`/activities/physicalCondition`, body);
}