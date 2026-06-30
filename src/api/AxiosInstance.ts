import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

const Axios = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json", },
});

export default Axios;