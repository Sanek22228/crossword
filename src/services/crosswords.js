import axios from "axios";
import { Crossword } from "../classes/Crossword";
import { Word } from "../classes/Word";
import { Coordinates } from "../classes/Coordinates";

const API_URL = "http://localhost:5298";

export const fetchCrosswordPublication = async (user, crossword) => {
    const crosswordWords = crossword.addedWords.map(word=>({
        text: word.wordText, 
        startRow: word.coordinates.startRow, 
        startCol: word.coordinates.startCol, 
        isSkipped: word.isSkipped || false,
        direction: word.direction === Word.DIRECTIONS.VERTICAL ? 0 : 1, 
        wordOrder: word.order,
        question: word.question || ""
    }))
    try {
        let cleanGrid = crossword.grid.map(r => 
                r.map(cell => (typeof cell === "object" && cell !== null ? {value: cell.value, direction: cell.direction} : cell)));
        let response = await axios.post(`${API_URL}/crossword`, {
            userId: user.id,
            wordAmount: crossword.wordAmount,
            grid: cleanGrid,
            crosswordWords: crosswordWords
        });
        return response.data;
    }
    catch(e){
        console.error("Server errors:" + e.response?.data?.errors);
    }
}

export const fetchUserCrosswords = async(user) => {
    try{
        let response = await axios.get(`${API_URL}/crossword/${user.id}`);
        return response.data;
    }
    catch(e){
        console.error("Server errors:" + e.response?.data?.errors);
        return null;
    }
}

export const getCrosswordById = async(id) => {
    try{
        let response = await axios.get(`${API_URL}/crossword/${id}`);
        let data = deserialize(response.data);
        data.id = id;
        return data;
    }
    catch(e){
        console.error("Server errors:", e.response?.data?.errors);
        return null;
    }
}

export const deleteCrossword = async (crosswordId) => {
    try{
        let response = axios.delete(`${API_URL}/crossword/${crosswordId}`);
        return response.data;
    }
    catch(e){
        console.error("Server errors:", e.response?.data?.errors);
        return null;
    }
}

function deserialize(crossword){
    let words = crossword.crosswordWords.map(w => {
        let direction = Word.DIRECTIONS[w.direction];
        let word = new Word(w.wordText, direction, new Coordinates(w.startRow, w.startCol, []));
        word.order = w.wordOrder;
        word.question = w.question;
        return word;
    });
    let newCrossword = new Crossword(words, crossword.grid);
    newCrossword.createdAt = crossword.createdAt;
    newCrossword.userId = crossword.userId;
    console.log(newCrossword);
    return newCrossword;
}