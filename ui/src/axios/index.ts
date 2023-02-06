/**
 * @title https://gist.github.com/JaysonChiang/fa704307bacffe0f17d51acf6b1292fc
 * @description This file was copied from gist above with some additional features
 */

import axios, { AxiosError, AxiosResponse } from "axios";

export interface Agent extends OptionalParams {
  [k: string]: any;
  name: string;
  status: boolean | false;
  ticketId: string | null;
}

export interface Ticket extends OptionalParams {
  [k: string]: any;
  title: string;
  description: string;
  customerName: string;
  email: string;
  productNo: string;
}

export interface OptionalParams {
  _id?: string | any;
}

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

axios.interceptors.request.use((config) => {
  return config;
});

axios.interceptors.response.use(
  (res: AxiosResponse) => res,
  (error: AxiosError) => {
    const { data, status, config } = error.response!;
    console.log("data", data);

    switch (status) {
      case 400:
        console.error(data);
        break;
      case 401:
        console.error("Unauthorized");
        break;
      case 404:
        console.error("Not found");
        break;
      case 500:
        console.error("Server error");
    }

    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;
const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const agents = {
  getAll: () => request.get<Agent[]>("/agents"),
  getOne: (id: string) => request.get<Agent>(`/agents/${id}`),
  create: (data: Agent) => request.post<Agent>("/agents", data),
  update: (id: string, data: Agent) =>
    request.put<Agent>(`/agents/${id}`, data),
  delete: (id: string) => request.delete<Agent>(`/agents/${id}`),
};

const tickets = {
  getAll: () => request.get<Ticket[]>("/tickets"),
  create: (data: Ticket) => request.post<Ticket>("/tickets", data),
  getOne: (id: string) => request.get<Agent>(`/tickets/${id}`),
  update: (id: string, data: any) => request.put<Agent>(`/tickets/${id}`, data),
  delete: (id: string) => request.delete<Ticket>(`/tickets/${id}`),
};

export default {
  agents,
  tickets,
};
