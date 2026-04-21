export class Word{
    static DIRECTIONS = {
        0: "vertical",
        1: "horizontal",
        VERTICAL: "vertical",
        HORIZONTAL: "horizontal"
    };
    constructor(word, dir, coordinates){
        this.wordText = word;
        this.order = 0;
        this.isSkipped = false;

        if(dir && coordinates){
            this.direction = dir;
            if(!Object.values(Word.DIRECTIONS).includes(dir)){
                throw new Error(`invalid direction: '${dir}'`)
            }
            this.coordinates = coordinates;
            if(this.coordinates.cells.length === 0){
                if(this.direction === Word.DIRECTIONS.HORIZONTAL){
                    for (let i = 0; i < word.length; i++){
                        this.coordinates.cells.push([this.coordinates.startRow, this.coordinates.startCol+i]);
                    }
                }
                else{
                    for (let i = 0; i < word.length; i++){
                        this.coordinates.cells.push([this.coordinates.startRow+i, this.coordinates.startCol]);
                    }
                }
            }
        }
        else{
            this.coordinates = null;
            this.direction = null;
            this.isSkipped = true;
        }
        
        // this.intersections = intersections;
    }

    GetOppositeDirection(){
        return this.direction === Word.DIRECTIONS.HORIZONTAL ? Word.DIRECTIONS.VERTICAL : Word.DIRECTIONS.HORIZONTAL;
    }
}