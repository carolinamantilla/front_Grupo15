import axios from "axios";
import jwtDecode from "jwt-decode";

const authUrl = "https://dry-gorge-74354.herokuapp.com/auth";

export const loginAuth = async (credentials) => {
    return await axios.post(`${authUrl}/login`, credentials);
}

export const getCurrentUser = () => {
    try {
        const token = localStorage.getItem("token");
        return jwtDecode(token);
    } catch (error) {
        return null;
    }
}

export const authHeaders = {
    "auth-token":localStorage.getItem("token") 
}