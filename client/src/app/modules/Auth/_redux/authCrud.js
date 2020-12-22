import axios from "axios";

export const LOGIN_URL = "/api/users/login";
export const REGISTER_URL = "/api/users/register";
export const UPDATE_URL = "/api/users/update";
export const CHANGE_PASSWORD_URL = "/api/users/change-password";
export const REQUEST_PASSWORD_URL = "/api/auth/forgot-password";

export const ME_URL = "/api/users/get_me";

export function login(email, password) {
  return axios.post(LOGIN_URL, { email, password });
}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function updateUser(formData) {
  return axios.post(UPDATE_URL, formData);
}

export function changePassword(data) {
  return axios.post(CHANGE_PASSWORD_URL, data);
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
