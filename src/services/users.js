import axios from "axios";
import { Crossword } from "../classes/Crossword";
import { Word } from "../classes/Word";
import { Coordinates } from "../classes/Coordinates";

export const fetchLogin = async (user) => {
    try {
        var response = await axios.post("http://localhost:5298/user/login", user);
        return response.data;
    }
    catch(e){
        console.error(e);
    }
}

export const fetchRegister = async (user) => {
    try {
        var response = await axios.post("http://localhost:5298/user/register", user);
        return response.data;
    }
    catch(e){
        console.error(e);
    }
}

export const fetchUserStatistics = async (user) => {
    try {
        const response = await axios.get(`http://localhost:5298/user/${user.id}`);
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
                    return newWord;
                });
                const crosswordObject = new Crossword(wordArray, item.grid);
                crosswordObject.id = item.id;
                crosswordObject.createdAt = item.createdAt;

                return crosswordObject;
            });
        }

        return data; // Возвращаем объект { crosswords: [Crossword, ...], completed: X }
    } catch (e) {
        console.error("Ошибка при загрузке статистики:", e);
        throw e;
    }
}

export const updateUser = async (user, data) => {
    try{
        var response = await axios.put(`http://localhost:5298/user/${user.id}`, data);
        return response.data;
    }
    catch(e){
        console.error(e)
    }
}