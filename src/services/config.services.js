import axios from "axios";
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_SERVER_URI
});

service.interceptors.request.use(config =>{
    const authToken = localStorage.getItem("authToken");
    if(authToken) {
        config.headers.authorization = `Bearer ${authToken}`
    }
    return config
});

 export default service;