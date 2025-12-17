import { Grid } from "../classes/Grid";
import { Word } from "../classes/Word";
import { Coordinates } from '../classes/Coordinates'
import { Crossword } from '../classes/Crossword'

var addedWords;
var skippedWords;
var crosswordGrid;

export function CreateCrossword(words){

    addedWords = [];
    skippedWords = [];
    crosswordGrid = new Grid();

    addedWords.push(PlaceFirstWord(words, "horizontal"));

    for(let word of words){
        if (!TryPlaceWord(word)){
            console.warn("try place word failed skipped words push ", word)
            skippedWords.push(word);
        }
        else{
            console.warn("function try place word succeed, added words push", word);
        }
    }

    let changed = true;
    while(skippedWords.length > 0 && changed){
        changed = false;
        for(let i = skippedWords.length-1; i >= 0; i--){
            if (TryPlaceWord(skippedWords[i])){
                skippedWords.splice(i, 1);
                changed = true;
            }
        }
    }

    console.log("slipped words: ", skippedWords);
    console.log("added words: ", addedWords);

    return new Crossword(addedWords, crosswordGrid.grid);
}

function PlaceFirstWord(words, direction){

    let firstWord = words[0];
    // console.log(`first word: ${firstWord}`)

    let wordHalf = Math.ceil(firstWord.length / 2);
    let row, col;

    do{
        row = Math.ceil(crosswordGrid.height / 2);
        col = Math.ceil(crosswordGrid.width / 2);
        if(direction === "horizontal"){
            col -= wordHalf;
            if(col < 0){
                crosswordGrid.expandGrid(0, crosswordGrid.width - col)
            }
        }
        else{
            row -= wordHalf;
            if(row < 0){
                crosswordGrid.expandGrid(crosswordGrid.height - row, 0)
            }
        }
    }
    while(row < 0 || col < 0);

    let coordinates = new Coordinates(row,col,[]);

    for (let c of firstWord){
        coordinates.coordinates.push([row,col])  
        crosswordGrid.grid[row][col] = c;
        if(direction === "horizontal")
            col++;
        else
            row++;
        if(row >= crosswordGrid.height || col >= crosswordGrid.width){
            // console.warn("row or col is bigger than grid size");
            crosswordGrid.expandGrid(row, col);
        }
    }

    // console.log(coordinates.coordinates);
    words.shift();

    return new Word(firstWord, direction, coordinates);
}

function TryPlaceWord(word1){
    // console.warn(addedWords);
    for (let word2 of addedWords){
        for(let i = 0; i < word1.length; i++){
            for(let j = 0; j < word2.word.length; j++){
                if(word1[i] === word2.word[j]){
                    console.log("Intersection: ", word1[i]);
                    if(PlaceAtIntersection(i, j, word1, word2)){
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

function PlaceAtIntersection(index1, index2, word1, word2){
    let coordinates = GetCoordinates(index1, index2, word1, word2);
    if(!coordinates) return false;

    let wordObject = new Word(word1, word2.GetOppositeDirection(), coordinates);                  // ИСПРАВЛЕНО

    if(CanPlaceWord(word1, coordinates.coordinates, word2)){
        for (let i = 0; i < word1.length; i++){
            crosswordGrid.grid[coordinates.coordinates[i][0]][coordinates.coordinates[i][1]] = word1[i];
            console.log(`grid[${coordinates.coordinates[i][0]}][${coordinates.coordinates[i][1]}]: ${crosswordGrid.grid[coordinates.coordinates[i][0]][coordinates.coordinates[i][1]]}`)
        }
        addedWords.push(wordObject);
        console.log(`word ${word1} was added succefully \n added words: ${addedWords}`);
        return true;
    }
    else{
        // console.log("can't place word");
        return false;
    }
}

/* 
    returns             
        new Coordinates
*/
function GetCoordinates(index1, index2, word1, word2){
    let c_coord = word2.wordCoordinates.coordinates[index2];

    // console.log("Start coordinate: ", c_coord);

    var coordinates = new Coordinates(0,0,[]);
    
    // SET LEFT AND RIGHT PARTS ("WORD": LEFT = "WO", RIGHT = "RD")
    let left = "";
    let right = "";
    for (let i = 0; i < word1.length; i ++){
        if (i < index1){
            left += word1[i];
        }
        else if (i >= index1){
            right += word1[i];
        }
    }
    let start_row = c_coord[0];
    let start_col = c_coord[1];
    let row = start_row;
    let col = start_col;

    if(word2.direction === "horizontal"){
        coordinates.start_col = start_col;

        for (let i = left.length; i > 0; i--){
            row--;
            if (row < 0){
                return false;
                // expand
                // move all words?
            }
            coordinates.coordinates.push([row,col]);
        }
        coordinates.start_row = row;

        row = start_row;
        for (let i = 0; i < right.length; i++){
            coordinates.coordinates.push([row,col]);
            row++;
            if(row >= crosswordGrid.height){
                crosswordGrid.expandGrid(row, 0);
            }
        }
    }
    else{
        coordinates.start_row = start_row;

        for (let i = left.length; i > 0; i--){
            col--;
            if (col < 0){
                return false;
                // expand
                // move all words?
            }
            coordinates.coordinates.push([row,col]);
        }

        col = start_col;
        for (let i = 0; i < right.length; i++){
            coordinates.coordinates.push([row,col]);
            col++;
            if(col >= crosswordGrid.width){
                crosswordGrid.expandGrid(0, col);
            }
        }
    }
    // метод sort
    /*
        функция сравнения внкутри должна возвращать < 0 - если a перед b; > 0 - если b < a ; 0 - пох
        для списка вида [[1,2], [1,3], [1,4]]
        сравниваем a[0] и b[0], если не равны - вовращаем разницу
        иначе - возвращаем разницу a[1] и b[1]
    */
      
    coordinates.coordinates.sort((a,b) => {
        if(a[0] !== b[0]){
            return a[0] - b[0];
        }
        return a[1] - b[1];
    });                          // ИСПРАВЛЕНО
    console.log(coordinates.coordinates);
    
    return coordinates;
}

/*
    returns
        true / false
*/
function CanPlaceWord(word1, coordinates, word2){
    const directions = [
                [-1, 0],
        [0, -1],           [0, 1],   
                [1, 0],
    ]; 

    for (let [dr,dc] of directions){
        for (let [r,c] of coordinates){
            // [r,c] = (1,1)
            // coordinates = [(1,0), (1,1), (1,2), (1,3)]
            const getIndexInCoordinates = (row, col) => {
                return coordinates.findIndex(coord => coord[0] === row && coord[1] === col)
            };

            let indexInCoordinates = getIndexInCoordinates(r,c);
            // indexInCoordinates = 1

            // crosswordGrid.grid[r][c] = 'a'
            // word1[indexInCoordinates] = 'a'
            if(crosswordGrid.grid[r][c] !== '0' && word1[indexInCoordinates] !== crosswordGrid.grid[r][c]){
                return false;
            }
            else if(crosswordGrid.grid[r][c] !== '0' && word1[indexInCoordinates] === crosswordGrid.grid[r][c]){
                continue;
            }

            let resRow = r + dr;
            let resCol = c + dc;

            if(resRow < crosswordGrid.height && resCol < crosswordGrid.width
                && resRow >= 0 && resCol >= 0
            ){
                let gridElement = crosswordGrid.grid[resRow][resCol];

                let InCoordinates = coordinates.some((a) => (a[0] === resRow && a[1] === resCol)) ||
                    word2.wordCoordinates.coordinates.some((a) => a[0] === resRow && a[1] === resCol);

                if(gridElement !== '0' && !InCoordinates){
                    return false;
                }
            }
            else{
                return false;
            }
        }
    }
    return true;
}
