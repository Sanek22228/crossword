import axios from "axios"
import { Word } from "../classes/Word";
import { Crossword } from "../classes/Crossword";
import { Coordinates } from "../classes/Coordinates";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchCrosswords = async (userId) => {
    const response = await axios.get(`${API_URL}/feed/${userId}`);
    if (response.data.crosswords && Array.isArray(response.data.crosswords)) {
                response.data.crosswords = response.data.crosswords.map((item) => {
                    const wordArray = (item.crosswordWords || item.words || []).map(w => {
                        const direction = w.direction === 0 ? "vertical" : "horizontal";
                        const newWord = new Word(
                            w.wordText,
                            direction,
                            new Coordinates(w.startRow, w.startCol, [])
                        );
                        newWord.order = w.order;
                        newWord.isSkipped = w.isSkipped;
                        newWord.question = w.question;
                        return newWord;
                    });
                    const crosswordObject = new Crossword(wordArray, item.grid);
                    crosswordObject.id = item.id;
                    console.log(crosswordObject.id)
                    crosswordObject.createdAt = item.createdAt;
                    crosswordObject.name = item.name;
                    crosswordObject.completed = item.completed;
                    crosswordObject.user = { 
                        userName: item.user?.userName || "",
                        id: item.user.id
                    };
                    return crosswordObject;
                });
            }
    return response.data;
}