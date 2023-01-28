// API for future usage, u have to add baseURL (backend part)
// then u can use these methods for save and change your data on backend

import axios from "axios";

const instance = axios.create({
  baseURL: "",
});

export const getEvents = async () => {
  const { data } = await instance.get("events");
  return data;
};

export const postEvent = async (event) => {
  const { data } = await instance.post(`events`, event);
  return data;
};

export const removeEvent = async (id) => {
  const { data } = await instance.delete(`events/${id}`);
  return data.id;
};
