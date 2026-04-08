export class Word{
    static DIRECTIONS = {
        HORIZONTAL : "horizontal",
        VERTICAL : "vertical"
    }
    // not skipped
    constructor(word, dir, coordinates){
        this.word = word;
        if(dir && coordinates){
            if(!Object.values(Word.DIRECTIONS).includes(dir)){
                throw new Error(`invalid direction: '${dir}'`)
            }
            this.coordinates = coordinates;
            this.direction = dir;
            this.order = 0;
            this.isSkipped = false;
        }
        else{
            this.coordinates = [];
            this.direction = null;
            this.isSkipped = true;
        }
        
        // this.intersections = intersections;
    }

    GetOppositeDirection(){
        return this.direction === Word.DIRECTIONS.HORIZONTAL ? Word.DIRECTIONS.VERTICAL : Word.DIRECTIONS.HORIZONTAL;
    }
}