import { apiDelete, apiGet, apiPatch, apiPost } from '../../apiActions';

export const fetchProgramPlanLogsById = (id) => {
  return apiGet(`/activities/programPlan/logs/${id}`);
};

export const fetchWorkoutPlanLogsById = (
  programPlanId,
  weekNumber,
  workoutId
) => {
  return apiGet(
    `/activities/programPlan/logs/${programPlanId}/weekNumber/${weekNumber}/workout/${workoutId}`
  );
};

export const postAddSetLog = (ids, body) => {
  const { programPlanId, weekId, workoutPlanId, exercisePlanId } = ids;
  return apiPost(
    `/activities/programPlan/${programPlanId}/weekPlan/${weekId}/workoutPlan/${workoutPlanId}/exercisePlan/${exercisePlanId}`,
    body
  );
};

export const patchUpdateSetLog = (ids, body) => {
  const { programPlanId, weekId, workoutPlanId, exercisePlanId, setId } = ids;
  return apiPatch(
    `/activities/programPlan/${programPlanId}/weekPlan/${weekId}/workoutPlan/${workoutPlanId}/exercisePlan/${exercisePlanId}/setId/${setId}`,
    body
  );
};

export const deleteSetLog = (ids) => {
  const { programPlanId, weekId, workoutPlanId, exercisePlanId, setId } = ids;
  return apiDelete(`/activities/programPlan/${programPlanId}/weekPlan/${weekId}/workoutPlan/${workoutPlanId}/exercisePlan/${exercisePlanId}/setId/${setId}`);
};
