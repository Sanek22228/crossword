export class Word{
    static DIRECTIONS = {
        HORIZONTAL : "horizontal",
        VERTICAL : "vertical"
    }

    constructor(word, dir, coordinates){
        if(!Object.values(Word.DIRECTIONS).includes(dir)){
            throw new Error(`invalid direction: '${dir}'`)
        }
        this.coordinates = coordinates;
        this.word = word;
        this.direction = dir;
        this.id = 0;
        // this.intersections = intersections;
    }

    GetOppositeDirection(){
        return this.direction === Word.DIRECTIONS.HORIZONTAL ? Word.DIRECTIONS.VERTICAL : Word.DIRECTIONS.HORIZONTAL;
    }
}