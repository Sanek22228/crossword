export class Crossword{
    constructor(addedWords, grid){
        this.verticalWords = addedWords.filter((w) => {w.direction === "vertical"});
        this.horizontalWords = addedWords.filter((w) => {w.direction === "horizontal"});
        this.wordAmount = addedWords.length;
        this.grid = grid;
    }
}