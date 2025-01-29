 import Todos from '../components/Todos/todo';
import axiosClient from './axiosClient' ;

const END_POINT ={
    TODOS: 'todos'
    // KO phải lúc nào baseUrL bên .env cũng có đuôi là 
    // REACT_APP_URL_API=https://localhost:7239/v1/api/todes
    // nên là mình để https://localhost:7239/v1/api/ 
    // rồi Định dạng cái END_POINT cuối đuôi để dễ quản lí và dễ gọi
    // VD: STYLIST: 'stylist',
}

 export const getTodosAPI = () => {
    return axiosClient.get(`${END_POINT.TODOS}`);
 } 


 export const delTodosAPI = (id) => {
    return axiosClient.delete(`${END_POINT.TODOS}/${id}`);
 } 

 export const addTodosAPI = (todo) => {
    return axiosClient.post(`${END_POINT.TODOS}`,todo);
 } 

 export const editTodosAPI = (todo) => {
    return axiosClient.put(`${END_POINT.TODOS}`,todo);
 } 

