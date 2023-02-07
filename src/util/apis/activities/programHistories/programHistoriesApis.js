import { apiDelete, apiGet, apiPost, apiPut } from "../../apiActions"

export const fetchAllProgramHistories = () => {
    return apiGet('/activities/programHistories');
}

export const fetchProgramHistoryById = (id) => {
    return apiGet(`/activities/programHistory/${id}`);
}

export const fetchProgramHistoriesAssignedToUser = (filter) => {
    return apiGet(`/activities/programHistories/assignedTo/currentUser/${filter}`);
}

export const postProgramHistory = (body) => {
    return apiPost(`/activities/programHistory`, body);
}

export const putProgramHistory = (id, body) => {
    return apiPut(`/activities/programHistory/${id}`, body);
}

export const deleteProgramHistory = (id) => {
    return apiDelete(`/activities/programHistory/${id}`);
}