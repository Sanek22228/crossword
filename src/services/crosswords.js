import axios from "axios";

export const fetchCrosswordPublication = async (user, crossword) => {
    const crosswordWords = crossword.addedWords.map(word=>({
        text: word.word, 
        startRow: word.coordinates.start_row, 
        startCol: word.coordinates.start_col, 
        isSkipped: word.isSkipped || false,
        direction: word.direction === "vertical" ? 0 : 1, 
        wordOrder: word.order
    }))
    try {
        var cleanGrid = crossword.grid.map(r => 
                r.map(cell => (typeof cell === "object" && cell !== null ? cell.value : cell)));
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