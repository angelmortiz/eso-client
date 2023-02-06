import { apiGet } from "../apiActions";

export const fetchCurrentUser = () => {
    return apiGet(`/users/user`);
}

export const fetchAllUsers = () => {
    return apiGet(`/users`);
}