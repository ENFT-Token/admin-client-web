import axios, { Method } from "axios";
import { SERVER_URL } from "../confing";
import store from "./store";

export const getAccessToken = () =>
  JSON.parse(localStorage["login"])?.access_token;

export function RequestAuth(method: Method, url: string, data?: any) {
  if (getAccessToken() === undefined) {
    throw new Error("[AuthFetch ERROR] Not Login");
  }
  return axios.request({
    method: method,
    baseURL: `http://${SERVER_URL}`,
    url,
    headers: {
      Authorization: `Bearer ${store.getState().admin.adminInfo?.access_token}`,
    },
    data: method.toUpperCase() !== "GET" ? data : undefined,
    params: method.toUpperCase() === "GET" ? data : undefined,
  });
}

export function Request(method: Method, url: string, data?: any) {
  return axios.request({
    method: method,
    baseURL: `http://${SERVER_URL}`,
    url,
    data: method.toUpperCase() !== "GET" ? data : undefined,
    params: method.toUpperCase() === "GET" ? data : undefined,
  });
}

// `http://${SERVER_URL}/admin/approve/list`,
// {
//     headers: { "Authorization": `Bearer ${admin?.access_token}` }
// });
