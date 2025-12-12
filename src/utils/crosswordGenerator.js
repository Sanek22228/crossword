import { Grid } from "../classes/grid";
import { Word } from "../classes/word";

var addedWords = [];
var skippedWords = [];
const crosswordGrid = new Grid();
var grid = crosswordGrid.grid;

export function CreateCrossword(words){
    addedWords.push(PlaceFirstWord(words, "horizontal"));

    for(let word of words){
        TryPlaceWord(word)
    }
}

function PlaceFirstWord(words, direction){
    let firstWord = words[0];
    let row = grid.length / 2;
    let col = grid[0].length / 2;
    let wordHalf = firstWord.length / 2;

    if(direction === "horizontal"){
        col -= wordHalf;
    }
    else{
        row -= wordHalf;
    }

    let coordinates = {
        "start_row" : row,
        "start_col" : col,
        "coordinates" : []
    };

    for (let c of firstWord){
        coordinates.coordinates.push([row,col])
        grid[row][col] = c;
        if(direction === "horizontal")
            col++;
        else
            row++;
    }

    words.shift();

    return new Word(firstWord, direction, coordinates);
}

function TryPlaceWord(word1){
    for (let word2 of addedWords){

        for(let c1 of word1){
            for (let c2 of word2.word){
                if(c1 === c2){
                    let coordinates = new Coordinates(0, 0, []);
                    PlaceAtIntersection(c1, word1, coordinates, word2);
                }
            }
        }
    }
}

function PlaceAtIntersection(c, word1, coordinates, word2){
    coordinates = GetCoordinates(c, word1, word2);
    let wordObject = new Word(word1, "", coordinates);                  // ИСПРАВИТЬ

    if(CanPlaceWord(coordinates, word2)){
        for (let i = 0; i < word2.length; i++){
            grid[coordinates[i][0]][coordinates[i][1]] = word2[i];
        }
        addedWords.push(wordObject);
    }
    else{
        skippedWords.push(wordObject);
        console.log("can't place word");
    }
}

/* 
    returns             
        new Coordinates
*/
function GetCoordinates(c, word1, word2){
    let word2Value = word2.word;
    let c_coord = word2.wordCoordinates.coordinates[word2Value.indexOf(c)];
    let c_index = word1.indexOf(c)

    var coordinates = new Coordinates(0,0,[]);
    
    // SET LEFT AND RIGHT PARTS ("WORD": LEFT = "WO", RIGHT = "RD")
    let left = "";
    let right = "";
    for (let i = 0; i < word2Value.length; i ++){
        if (i < c_index){
            left += word1[i];
        }
        else if (i > c_index){
            right += word1[i];
        }
    }

    if(word2.direction == "horizontal"){
        let row = c_coord[0];
        let col = c_coord[1];
        coordinates.start_col = col;

        for (let i = left.length; i >= 0; i++){
            row--;
            coordinates.coordinates.push([row,col]);
        }
        coordinates.start_row = row;

        for (let i = 0; i < right.length; i++){
            row++;
            coordinates.coordinates.push([row,col]);
        }
    }
    else{
        let row = c_coord[0];
        let col = c_coord[1];
        coordinates.start_row = row;

        for (let i = left.length; i >= 0; i++){
            col--;
            coordinates.coordinates.push([row,col]);
            coordinates.start_col = col;
        }

        for (let i = 0; i < right.length; i++){
            col++;
            coordinates.coordinates.push([row,col]);
        }
    }
    coordinates.coordinates.sort();                         // ИСПРАВИТЬ
    return coordinates;
}

/*
    returns
        true / false
*/
function CanPlaceWord(coordinates, word2){
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],  
        [0, -1],           [0, 1],   
        [1, -1],  [1, 0],  [1, 1]
    ];  

    for (let [dr,dc] of directions){
        for (let [r,c] of coordinates){

            if (grid[r][c] != '0'){
                return false;
            }

            let resRow = r + dr;
            let resCol = c + dc;
            let gridElement = grid[resRow][resCol];
            if(!coordinates.includes([resRow,resCol]) && gridElement != '0' && !word2.wordCoordinates.coordinates.includes([resRow,resCol])){               // ПРОВЕРИТЬ
                return false;
            }
        }
    }

    return true;
}