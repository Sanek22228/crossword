export class Crossword{
    constructor(addedWords, skippedWords, grid){
        
        addedWords.sort((a,b) => {
            if(a.coordinates.start_row !== b.coordinates.start_row) return a.coordinates.start_row - b.coordinates.start_row;
            else return a.coordinates.start_col - b.coordinates.start_col;
        })

        this.verticalWords = addedWords.filter((w) => {return w.direction === "vertical"});
        this.horizontalWords = addedWords.filter((w) => {return w.direction === "horizontal"});

        this.wordAmount = addedWords.length;
        this.grid = grid;
        this.addedWords = addedWords;
        this.skippedWords = skippedWords;
    }

    SetWordArrays(){
        
    }

    SortWords() {
        this.addedWords.sort((a,b) => {return a.id - b.id});
    }
}