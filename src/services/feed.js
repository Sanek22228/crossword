import axios from "axios"

export const fetchCrosswords = async (userId) => {
    const response = await axios.get(`http://localhost:5298/feed/${userId}`);
    return response.data;
}