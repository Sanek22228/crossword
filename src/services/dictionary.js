import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchValidation = async (words) => {
    try {
        const response = await axios.post(`${API_URL}/words/validate`, {words: words});
        return response.data;
    }
    catch(e){
        console.error(e);
    }
}