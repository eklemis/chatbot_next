// "use client";
import axios from "axios";

axios.defaults.baseURL = process.env.BASE_PATH;
let setAxios = axios;

export default setAxios;
