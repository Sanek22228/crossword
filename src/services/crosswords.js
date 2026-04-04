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
        var response = await axios.post("http://localhost:5298/crossword/", {
            userId: user.id,
            wordAmount: crossword.wordAmount,
            grid: crossword.grid.map(r => {r.forEach(c => {
                if(typeof c === "object" && c !== null){
                    c = "0";
                }
            });}),
            crosswordWords: crosswordWords
        });
        return response.data;
    }
    catch(e){
        console.error("Server errors:", e.response?.data?.errors);
    }
}
