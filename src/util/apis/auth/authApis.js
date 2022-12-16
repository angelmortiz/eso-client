import { apiPost } from "../apiActions"

export const signup = (body) => {
    return apiPost(`/auth/signup`, body);
}