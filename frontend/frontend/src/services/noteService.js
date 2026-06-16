import axios from "axios";

const API = "http://localhost:5000/api/notes";

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getNotes = async () => {
  return axios.get(API, getAuthHeader());
};

export const createNote = async (noteData) => {
  return axios.post(API, noteData, getAuthHeader());
};

export const updateNote = async (id, noteData) => {
  return axios.put(
    `${API}/${id}`,
    noteData,
    getAuthHeader()
  );
};

export const deleteNote = async (id) => {
  return axios.delete(
    `${API}/${id}`,
    getAuthHeader()
  );
};

export const getRecentNotes = async () => {
  return axios.get(API, getAuthHeader());
};

