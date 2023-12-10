import axios from "axios";
import { adminAPI } from "../constants/API";

const adminInstance = axios.create({
    baseURL: adminAPI,
});
export default adminInstance;