import { Word } from "./Word";

export class Crossword{
    constructor(words, grid){
        this.words = words;
        this.wordAmount = this.addedWords.length;
        this.grid = grid;
    }
    // SortWords() {
    //     this.addedWords.sort((a,b) => {return a.id - b.id});
    // }
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