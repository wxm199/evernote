import request from "@/helper/request.js";

const REGISTER = "auth/register";
const LOGIN = "auth/login";
const LOGOUT = "auth/logout";
const GET_INFO = "auth";
function auth() {
  return request(GET_INFO);
}

function register(username, password) {
  return request(REGISTER, "POST", { username, password });
}

function login(username, password) {
  return request(LOGIN, "POST", { username, password });
}

function logout() {
  return request(LOGOUT);
}

export { auth, register, login, logout };
