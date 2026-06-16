import axios from "axios";

const API = "http://localhost:5000/api/tasks";

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getTasks = async () => {
  return axios.get(API, getAuthHeader());
};

export const createTask = async (taskData) => {
  return axios.post(API, taskData, getAuthHeader());
};

export const updateTask = async (id, taskData) => {
  return axios.put(`${API}/${id}`, taskData, getAuthHeader());
};

export const deleteTask = async (id) => {
  return axios.delete(`${API}/${id}`, getAuthHeader());
};

export const completeTask = async (id) => {
  return axios.put(
    `${API}/${id}/complete`,
    {},
    getAuthHeader()
  );
};

