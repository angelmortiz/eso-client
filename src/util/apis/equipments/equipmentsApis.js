import { apiGet, apiPost } from "../apiActions"

export const fetchAllEquipments = () => {
    return apiGet('/activities/equipments');
}

export const fetchEquipmentById = (id) => {
    return apiGet(`/activities/equipment/${id}`);
}

export const postEquipment = (body) => {
    return apiPost(`/activities/equipment`, body);
}