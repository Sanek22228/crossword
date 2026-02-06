import axios from "axios";

export const fetchValidation = async (words) => {
    try {
        var response = await axios.post("http://localhost:5298/words/validate", {words: words});
        return response.data;
    }
    catch(e){
        console.error(e);
    }
}