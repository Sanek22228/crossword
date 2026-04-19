import axios from "axios"

export const fetchCrosswords = async () => {
    const response = await axios.get("http://localhost:5298/feed");
    return response.data;
}