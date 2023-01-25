import { apiGet } from "../apiActions";

export const fetchCurrentUser = () => {
    return apiGet(`/user/currentUser`);
}