import axios from "axios";
import { authHeaders } from "./AuthService";

const salesUrl = "https://dry-gorge-74354.herokuapp.com/ventas"; //prod
//const salesUrl = "http://localhost:3003/ventas"; //dllo

export const getSale = async (id) => {
    return await axios.get(`${salesUrl}/${id}`, { headers: authHeaders });
}

export const getSales = async () => {
    return await axios.get(`${salesUrl}/`);
}

export const addSale = async (sale) => {
    return await axios.post(`${salesUrl}/`, sale);
}

export const deleteSale = async (id) => {
    return await axios.delete(`${salesUrl}/${id}`, { headers: authHeaders });
}

export const editSale = async (sale) => {
    return await axios.put(`${salesUrl}/${sale._id}`, sale, { headers: authHeaders });
}