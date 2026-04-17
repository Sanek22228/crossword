import { Word } from "./Word";

export class Crossword{
    constructor(words, grid){
        this.words = words;
        this.SortWords();
        this.wordAmount = this.addedWords.length;
        this.grid = grid;
    }
    SortWords() {
        this.words.sort((a,b) => {
            return a.coordinates.startRow - b.coordinates.startRow || a.coordinates.startCol - b.coordinates.startCol;
        });
    }
    get addedWords(){
        return this.words.filter(w => (!w.isSkipped));  
    }
    get skippedWords(){
        return this.words.filter(w => (w.isSkipped));
    }
    get horizontalWords(){
        return this.words.filter(w => (w.direction == Word.DIRECTIONS.HORIZONTAL));
    }
    get verticalWords(){
        return this.words.filter(w => (w.direction == Word.DIRECTIONS.VERTICAL));
    }
}