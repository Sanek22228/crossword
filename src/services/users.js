import axios from "axios";
import { Crossword } from "../classes/Crossword";
import { Word } from "../classes/Word";
import { Coordinates } from "../classes/Coordinates";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchLogin = async (user) => {
    try {
        var response = await axios.post(`${API_URL}/user/login`, user);
        return response.data;
    }
    catch(e){
        console.error(e);
    }
}

export const fetchRegister = async (user) => {
    try {
        var response = await axios.post(`${API_URL}/user/register`, user);
        return response.data;
    }
    catch(e){
        console.error(e);
    }
}

export const fetchUserStatistics = async (user) => {
    try {
        const response = await axios.get(`${API_URL}/user/${user.id}`);
        const data = response.data;

        if (data.crosswords && Array.isArray(data.crosswords)) {
            data.crosswords = data.crosswords.map((item) => {
                const wordArray = (item.crosswordWords || item.words || []).map(w => {
                    const direction = w.direction === 0 ? "vertical" : "horizontal";
                    const newWord = new Word(
                        w.wordText,
                        direction,
                        new Coordinates(w.startRow, w.startCol, [])
                    );
                    newWord.order = w.wordOrder;
                    newWord.isSkipped = w.isSkipped;
                    newWord.question = w.question;
                    return newWord;
                });
                const crosswordObject = new Crossword(wordArray, item.grid);
                crosswordObject.id = item.id;
                crosswordObject.createdAt = item.createdAt;
                crosswordObject.name = item.name;

                return crosswordObject;
            });
        }
        console.log(data.completed);

        return data; // Возвращаем объект { crosswords: [Crossword, ...], completed: X }
    } catch (e) {
        console.error("Ошибка при загрузке статистики:", e);
        throw e;
    }
}

export const updateUser = async (user, data) => {
    let response = await axios.put(`${API_URL}/user/${user.id}`, data);
    return response.status === 200 || response.status === 204;
}