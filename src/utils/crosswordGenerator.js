import { Grid, MAX_SIZE } from "../classes/Grid";
import { Word } from "../classes/Word";
import { Coordinates } from '../classes/Coordinates'
import { Crossword } from '../classes/Crossword'

var addedWords;
var skippedWords;
var crosswordGrid;

export function CreateCrossword(words){
    let wordsCopy = [...words];
    addedWords = [];
    skippedWords = [];
    crosswordGrid = new Grid();

    addedWords.push(PlaceFirstWord(wordsCopy, Word.DIRECTIONS.HORIZONTAL));
    if(addedWords[0].coordinates.start_col === 0)
        NormalizeGrid(0, 1);
    else if(addedWords[0].coordinates.start_row === 0)
        NormalizeGrid(1, 0);

    for(let word of wordsCopy){
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
        // console.log("skipped words: ", skippedWords);
        changed = false;
        for(let i = skippedWords.length-1; i >= 0; i--){
            if (TryPlaceWord(skippedWords[i])){
                skippedWords.splice(i, 1);
                changed = true;
            }
        }
    }

    console.log("skipped words: ", skippedWords);
    console.log("added words: ", addedWords);

    let crossword = new Crossword(addedWords, skippedWords, crosswordGrid.grid)
    NumberCrossword(crossword);
    return crossword;
}

function PlaceFirstWord(wordsCopy, direction){

    let firstWord = wordsCopy[0];
    console.log("first word: ",firstWord);
    let wordHalf = Math.ceil(firstWord.length / 2);
    let row, col;

    do{
        row = Math.ceil(crosswordGrid.height / 2);
        col = Math.ceil(crosswordGrid.width / 2);
        if(direction === Word.DIRECTIONS.HORIZONTAL){
            col -= wordHalf;
            // console.log("col: ", col);
            if(col < 0){
                crosswordGrid.expandGrid(0, crosswordGrid.width - col)
                // error handler
            }
        }
        else{
            row -= wordHalf;
            if(row < 0){
                crosswordGrid.expandGrid(crosswordGrid.height - row, 0);
            }
        }
    }
    while(row < 0 || col < 0);

    let coordinates = new Coordinates(row,col,[]);
    for (let c of firstWord){
        coordinates.cells.push([row,col])  
        crosswordGrid.grid[row][col] = c;
        if(direction === Word.DIRECTIONS.HORIZONTAL)
            col++;
        else
            row++;
    }
    wordsCopy.shift();

    return new Word(firstWord, direction, coordinates);
}

// function SortByIntersections(words){
//     words.sort((a,b) => {
//         return  a.intersections - b.intersections;
//     })
// }

// function CountIntersections(words){
//     let counter = 0;
//     for (let i = 0; i < words.length; i++){
//         for(let word2 of words){
//             for(let j = 0; j < words[i].length; j++){
//                 for(let k = 0; k < word2.word.length; k++){
//                     if(words[i][j] === word2.word[k]){
//                         counter++;
//                     }
//                 }
//             }
//         }
//         words[i].intersections = counter;
//     }
// }

function TryPlaceWord(word1){
    for (let word2 of addedWords){
        for(let i = 0; i < word1.length; i++){
            for(let j = 0; j < word2.word.length; j++){
                if(word1[i] === word2.word[j]){
                    // console.log(`Word1: ${word1}; Word2: ${word2.word}; Intersection: ${word1[i]}`);
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
    const {minRow, minCol, coordinates} = GetCoordinates(index1, index2, word1, word2);
    if(!coordinates) {
        console.log("!coordinates");
        return false;
    }
    else if(coordinates.cells[coordinates.cells.length-1][1] > MAX_SIZE || coordinates.cells[coordinates.cells.length - 1][0] > MAX_SIZE){
        console.log("word1: ",word1);
        console.log(`[coordinates.cells.length-1][1]: ${coordinates.cells[coordinates.cells.length-1][1]}`);
        console.log(`coordinates.cells[coordinates.cells.length-1][0]: ${coordinates.cells[coordinates.cells.length-1][0]}`);
        return false;
    }
    
    let wordObject = new Word(word1, word2.GetOppositeDirection(), coordinates);                // ИСПРАВИТЬ
    if(CanPlaceWord(wordObject, word2)){
        // addedWords[addedWords.indexOf(wordObject)].word = wordObject.word;
        addedWords.push(wordObject);
        // console.log(`word ${word1} was added succefully \n added words: ${addedWords}`);

        if(minRow > 0 || minCol > 0){
            if(!NormalizeGrid(minRow, minCol)){
                addedWords.pop();
                return false;
            }
        }
        else{
            for (let i = 0; i < word1.length; i++){
                crosswordGrid.grid[coordinates.cells[i][0]][coordinates.cells[i][1]] = word1[i];
                // console.log(`grid[${coordinates.cells[i][0]}][${coordinates.cells[i][1]}]: ${crosswordGrid.grid[coordinates.cells[i][0]][coordinates.cells[i][1]]}`)
            }
        }
        return true;
    }
    else 
        return false;
}

function GetCoordinates(index1, index2, word1, word2){
    let c_coord = word2.coordinates.cells[index2];
    var coordinates = new Coordinates(0,0,[]);
    let minRow = 0; 
    let minCol = 0;
    
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

    if(word2.direction === Word.DIRECTIONS.HORIZONTAL){
        coordinates.start_col = start_col;

        for (let i = left.length; i > 0; i--){
            row--;
                if (row <= 0){
                    // console.log(`row=${row} <= 0`);
                    minRow++;
                }
            coordinates.cells.push([row,col]);
        }
        coordinates.start_row = row;

        row = start_row;
        for (let i = 0; i < right.length; i++){
            coordinates.cells.push([row,col]);
            row++;
            if(row >= crosswordGrid.height){
                crosswordGrid.expandGrid(row, 0);
                // error handler
            }
        }
    }
    else{
        coordinates.start_row = start_row;

        for (let i = left.length; i > 0; i--){
            col--;
            if (col <= 0){
                // console.log(`col=${col} <= 0`);
                minCol++;
            }
            coordinates.cells.push([row,col]);
        }
        coordinates.start_col = col;

        col = start_col;
        for (let i = 0; i < right.length; i++){
            coordinates.cells.push([row,col]);
            col++;
            if(col >= crosswordGrid.width){
                crosswordGrid.expandGrid(0, col);
                // error handler
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
      
    coordinates.cells.sort((a,b) => {
        if(a[0] !== b[0]){
            return a[0] - b[0];
        }
        return a[1] - b[1];
    });                          // ИСПРАВЛЕНО

    console.log(`coordinates: ${coordinates.cells}`);
    
    return {minRow, minCol, coordinates};
}

/*
    returns
        true / false
*/
function CanPlaceWord(word1, word2){
    const directions = [
        [-1, -1],  [-1, 0],  [-1, 1],
        [0, -1],             [0, 1],
        [1, -1],   [1, 0],   [1, 1]
    ]; 

    if(!CheckPrevCell(word1.coordinates, word1.direction) || !CheckNextCell(word1.coordinates, word1.direction)){
        // console.log("check prev cell or check next cell is false")
        return false;
    }

    const getIndexInCoordinates = (row, col) => {
        return word1.coordinates.cells.findIndex(coord => coord[0] === row && coord[1] === col)
    };
    
    for (let [r,c] of word1.coordinates.cells){
        if(r < 0 || c < 0) continue;

        let indexInCoordinates = getIndexInCoordinates(r,c);
        if(crosswordGrid.grid[r][c] !== '0' && word1.word[indexInCoordinates] !== crosswordGrid.grid[r][c]){
            // console.log(`${word1.word[indexInCoordinates]} !== ${crosswordGrid.grid[r][c]}`)
            return false;
        }
        else if(crosswordGrid.grid[r][c] !== '0' && word1.word[indexInCoordinates] === crosswordGrid.grid[r][c]){
            continue;
        }

        for (let [dr,dc] of directions){

            let resRow = r + dr;
            let resCol = c + dc;

            if(resRow < crosswordGrid.height && resCol < crosswordGrid.width
                && resRow >= 0 && resCol >= 0
            ){
                let gridElement = crosswordGrid.grid[resRow][resCol];

                let InCoordinates = word1.coordinates.cells.some((a) => (a[0] === resRow && a[1] === resCol)) ||
                    word2.coordinates.cells.some((a) => a[0] === resRow && a[1] === resCol);

                if(gridElement !== '0' && !InCoordinates){
                    // console.log(`${gridElement} !== '0' && !InCoordinates`);
                    return false;
                }
            }
        }
    }
    return true;
}

function CheckPrevCell(coordinates, direction){
    let row = coordinates.cells[0][0];
    let col = coordinates.cells[0][1];
    if (direction === Word.DIRECTIONS.HORIZONTAL){
        col--;
        if(col >= 0){
            return crosswordGrid.grid[row][col] === '0';
        }
    }
    else{
        row--;
        if(row >= 0){
            return crosswordGrid.grid[row][col] === '0';
        }
    }
    return true;
}

function CheckNextCell(coordinates, direction){
    let row = coordinates.cells[coordinates.cells.length-1][0];
    let col = coordinates.cells[coordinates.cells.length-1][1];
    if (direction === Word.DIRECTIONS.HORIZONTAL){
        col++;
        if(col < crosswordGrid.width){
            return crosswordGrid.grid[row][col] === '0';
        }
    }
    else{
        row++;
        if(row < crosswordGrid.height){
            return crosswordGrid.grid[row][col] === '0';
        }
    }
    return true;
}

function NormalizeGrid(countRow, countCol){
    if(!crosswordGrid.expandTop(countRow)) return false;
    if(!crosswordGrid.expandLeft(countCol)) return false;
    crosswordGrid.clearGrid();

    addedWords.forEach(word => {
        word.coordinates.start_row += countRow;
        word.coordinates.start_col += countCol;

        for(let i = 0; i < word.coordinates.cells.length; i++){
            word.coordinates.cells[i][0] += countRow;
            word.coordinates.cells[i][1] += countCol;
            crosswordGrid.grid[word.coordinates.cells[i][0]][word.coordinates.cells[i][1]] = word.word[i];
        }
    });

    return true;
}

// нумерация слов в кроссворде (с левого верхнего угла)
function NumberCrossword(crossword){
    let wordId = 1;
    crossword.sortedWords.forEach((w) => {
        if(w.direction === Word.DIRECTIONS.HORIZONTAL){
            if(w.coordinates.start_col - 1 >= 0) crossword.grid[w.coordinates.start_row][w.coordinates.start_col-1] = {
                value: wordId.toString(),
                direction : Word.DIRECTIONS.HORIZONTAL
            };
        }
        else{
            if(w.coordinates.start_row - 1 >= 0) crossword.grid[w.coordinates.start_row-1][w.coordinates.start_col] = {
                value: wordId.toString(),
                direction : Word.DIRECTIONS.VERTICAL
            };
        }
        wordId++;
    });
}