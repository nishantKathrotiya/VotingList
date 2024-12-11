import axios from "axios"

export const axiosInstance = axios.create({withCredentials: true});

export const apiConnector = (method, url,token, bodyData, headers={}, params) => {
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null,
        headers: headers,
        params: params ? params : null,
    });
}