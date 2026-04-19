import axios from "axios";

export const fetchCrosswordPublication = async (user, crossword) => {
    const crosswordWords = crossword.addedWords.map(word=>({
        text: word.wordText, 
        startRow: word.coordinates.startRow, 
        startCol: word.coordinates.startCol, 
        isSkipped: word.isSkipped || false,
        direction: word.direction === "vertical" ? 0 : 1, 
        wordOrder: word.order,
        question: word.question || ""
    }))
    try {
        var cleanGrid = crossword.grid.map(r => 
                r.map(cell => (typeof cell === "object" && cell !== null ? {value: cell.value, direction: cell.direction} : cell)));
        var response = await axios.post("http://localhost:5298/crossword/", {
            userId: user.id,
            wordAmount: crossword.wordAmount,
            grid: cleanGrid,
            crosswordWords: crosswordWords
        });
        return response.data;
    }
    catch(e){
        console.error("Server errors:", e.response?.data?.errors);
    }
}

export const fetchUserCrosswords = async(user) => {
    try{
        var response = await axios.get(`http://localhost:5298/crossword/${user.id}`);
        return response.data;
    }
    catch(e){
        console.error("Server errors:", e.response?.data?.errors);
        return null;
    }
}