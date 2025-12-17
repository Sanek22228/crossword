export class Word{
    static DIRECTIONS = {
        HORIZONTAL : "horizontal",
        VERTICAL : "vertical"
    }

    constructor(word, dir, coordinates){
        if(!Object.values(Word.DIRECTIONS).includes(dir)){
            throw new Error(`invalid direction: '${dir}'`)
        }
        this.wordCoordinates = coordinates;
        this.word = word;
        this.direction = dir;                           // ИСПРАВЛЕНО
    }

    GetOppositeDirection(){
        return this.direction === Word.DIRECTIONS.HORIZONTAL ? Word.DIRECTIONS.VERTICAL : Word.DIRECTIONS.HORIZONTAL;
    }
}