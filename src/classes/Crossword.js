export class Crossword{
    constructor(addedWords, skippedWords, grid){
        this.verticalWords = addedWords.filter((w) => {return w.direction === "vertical"});
        this.verticalWords.sort((a,b) => {
            if(a.coordinates.start_col !== b.coordinates.start_col) return a.coordinates.start_col - b.coordinates.start_col;
            else return a.coordinates.start_row - b.coordinates.start_row;
        })

        this.horizontalWords = addedWords.filter((w) => {return w.direction === "horizontal"});
        this.horizontalWords.sort((a,b) => {
            if(a.coordinates.start_row !== b.coordinates.start_row) return a.coordinates.start_row - b.coordinates.start_row
            else return a.coordinates.start_col - b.coordinates.start_col;
        });

        this.sortedWords = addedWords.sort((a,b) => {
            if(a.coordinates.start_row !== b.coordinates.start_row) return a.coordinates.start_row - b.coordinates.start_row;
            else return a.coordinates.start_col - b.coordinates.start_col;
        })
        console.log(this.sortedWords);

        this.wordAmount = addedWords.length;
        this.grid = grid;
        this.addedWords = addedWords;
        this.skippedWords = skippedWords;
    }
}