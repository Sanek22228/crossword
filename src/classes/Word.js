class Word{
    static DIRECTIONS = {
        HORIZONTAL : "horizontal",
        VERTICAL : "vertical"
    }

    constructor(word, dir, coordinates){
        this.word = word;
        // if this.DIRECTIONS[dir]
        this.direction = dir;                           // ИСПРАВИТЬ
        this.wordCoordinates = coordinates;
    }
}