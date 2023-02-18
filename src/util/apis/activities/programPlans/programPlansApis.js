import { apiDelete, apiGet, apiPost, apiPut } from "../../apiActions"

export const fetchAllProgramPlans = () => {
    return apiGet('/activities/programPlans');
}

export const fetchProgramPlanById = (id) => {
    return apiGet(`/activities/programPlan/${id}`);
}

export const fetchProgramPlanLogsById = (id) => {
    return apiGet(`/activities/programPlan/logs/${id}`);
}

export const fetchWorkoutPlanLogsById = (programPlanId, weekNumber, workoutId) => {
    return apiGet(`/activities/programPlan/logs/${programPlanId}/weekNumber/${weekNumber}/workout/${workoutId}`);
}

export const fetchProgramPlansAssignedToUser = (filter) => {
    filter = !filter ? '' : `/${filter}`;
    return apiGet(`/activities/programPlans/assignedTo/currentUser${filter}`);
}

export const postProgramPlan = (body) => {
    return apiPost(`/activities/programPlan`, body);
}

export const putProgramPlan = (id, body) => {
    return apiPut(`/activities/programPlan/${id}`, body);
}

export const deleteProgramPlan = (id) => {
    return apiDelete(`/activities/programPlan/${id}`);
}