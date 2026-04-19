export class Word{
    static DIRECTIONS = {
        0: "vertical",
        1: "horizontal",
        VERTICAL: "vertical",
        HORIZONTAL: "horizontal"
    };
    constructor(word, dir, coordinates){
        this.wordText = word;
        if(dir && coordinates){
            if(!Object.values(Word.DIRECTIONS).includes(dir)){
                throw new Error(`invalid direction: '${dir}'`)
            }
            this.coordinates = coordinates;
            if(this.coordinates.cells == []){
                if(this.direction === Word.DIRECTIONS.HORIZONTAL){
                    for (i = 0; i < word.length; i++){
                        cells.push([this.coordinates.startRow+i, this.coordinates.startCol]);
                    }
                }
                else{
                    for (i = 0; i < word.length; i++){
                        cells.push([this.coordinates.startRow, coordinates.startCol+i]);
                    }
                }
            }
            this.direction = dir;
            this.order = 0;
            this.isSkipped = false;
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