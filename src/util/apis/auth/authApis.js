import { apiPost, apiPatch } from "../apiActions"

export const signup = (body) => {
    return apiPost(`/auth/signup`, body);
}

export const login = (body) => {
    return apiPost(`/auth/login`, body);
}

export const forgotPassword = (body) => {
    return apiPost(`/auth/forgotPassword`, body);
}

export const resetPassword = (body) => {
    return apiPatch(`/auth/resetPassword`, body);
}

export const changePassword = (body) => {
    return apiPost(`/auth/changePassword`, body);
}