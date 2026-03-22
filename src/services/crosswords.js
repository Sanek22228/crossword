import axios from "axios";

export const fetchCrosswordPublication = async (crossword, userId) => {
    try {
        var response = await axios.post("http://localhost:5298/crossword/", crossword, userId);
        return response.data;
    }
    catch(e){
        console.error(e);
    }
}
