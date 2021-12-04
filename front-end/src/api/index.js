import axios from "axios";
const url = "http://localhost:5000/";
export const readTodos = () => axios.get(url);
export const createTodos = (newTodo) => axios.post(url, newTodo);
export const updateTodos = (id, todo) => axios.patch(`${url}${id}`, todo);
export const deleteTodos = (id) => axios.delete(`${url}${id}`);
export const doneTodos = (id) => axios.post(`${url}${id}`);
