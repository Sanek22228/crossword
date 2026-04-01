import { Word } from "./Word";

export class Crossword{
    constructor(words, grid){
        this.words = words;
        this.SortWords();
        console.log(this.words);
        this.wordAmount = this.addedWords.length;
        this.grid = grid;
    }
    SortWords() {
        this.words.sort((a,b) => {
            // console.log(a.coordinates.start_row - b.coordinates.start_row);
            return a.coordinates.start_row - b.coordinates.start_row || a.coordinates.start_col - b.coordinates.start_col;
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