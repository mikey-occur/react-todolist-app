import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_URL_API, // GỌI API ở .env
    timeout: 300000 // Thời gian timeout khi xài api 
});

instance.interceptors.response.use(
    (response) => {
        return response.data 
        // khi nhận được response thì sẽ trả ra dữ liệu của response
     },
    (error) => {
        console.log(error)
        // khi lỗi thì ko trả data mà là thông báo lỗi
    } 
);

export default instance;