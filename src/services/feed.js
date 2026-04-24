import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL;

export const fetchCrosswords = async (userId) => {
    const response = await axios.get(`${API_URL}/feed/${userId}`);
    return response.data;
}