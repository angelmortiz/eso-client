import { apiDelete, apiGet, apiPost, apiPut } from "../../apiActions"

export const fetchAllPrograms = () => {
    return apiGet('/activities/programs');
}

export const fetchAllProgramNames = () => {
    return apiGet('/activities/programNames');
}

export const fetchProgramById = (id) => {
    return apiGet(`/activities/program/${id}`);
}

export const postProgram = (body) => {
    return apiPost(`/activities/program`, body);
}

export const putProgram = (id, body) => {
    return apiPut(`/activities/program/${id}`, body);
}

export const deleteProgram = (id) => {
    return apiDelete(`/activities/program/${id}`);
}