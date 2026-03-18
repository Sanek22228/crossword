import { MAX_SIZE } from "../classes/Grid";
<<<<<<< HEAD
=======
import { fetchValidation } from "../services/dictionary";
>>>>>>> backend

const MIN_WORDS_COUNT = 2;
const MIN_CHARS_COUNT = 2;

<<<<<<< HEAD
export function validateWords(input){
=======
export async function validateWords(input){
>>>>>>> backend
    input = input.trim();
    let words = '';

    if(input.split(" ").length < MIN_WORDS_COUNT){
        let maxWords = 0;
        let maxSep = ' ';
        for(let i = 0; i < separators.length; i++){
            let sep = separators[i];
            console.log(`separator: ${sep}`);
            let curLength = input.split(sep).length;
            if(maxWords < curLength && curLength >= MIN_WORDS_COUNT){
                maxSep = sep;
            }
        }
        words = input.split(maxSep);
    }
    else{
        words = input.split(" ");
    }

<<<<<<< HEAD
    var validWords = []
=======
    var validWords = [];
>>>>>>> backend
    words.forEach(word =>{
        let valid = true;
        let trimmedWord = word.trim();
        let chars = trimmedWord.split("");

        while(chars.length > 0 && (separators.includes(chars[chars.length-1]) || !isNaN(Number(chars[chars.length-1])))){
            chars.pop();
        }
        while(chars.length > 0 && (!isNaN(Number(chars[0])) || separators.includes(chars[0]))){
            chars.shift();
        }

        for (let c of chars) {
            if(!isNaN(Number(c)) || separators.includes(c)){
                valid = false;
                break;
            }
        }
        word = chars.join("");
        if(word.length < MIN_CHARS_COUNT || word.length > MAX_SIZE){
            valid = false;
        }
        if (valid){
            validWords.push(word);
        }
    })
    displayWords(validWords);
    validWords.sort((a,b) => {
        return b.length - a.length;
    });
<<<<<<< HEAD
    console.log(validWords);
    return new Set(validWords);
=======
    validWords = Array.from(new Set(validWords));
    var skippedWords = await fetchValidation(validWords);
    console.log("non valid words: ", skippedWords);
    validWords = validWords.filter(w => !skippedWords.includes(w));
    console.log("valid Words: ", validWords);
    return validWords;
    // return skippedWords == null ? validWords: validWords.filter(w => !skippedWords.includes(w));
>>>>>>> backend
}

const separators = [",", ".", "/", "#", "№", "-", "+", "=", "(", ")", "*", "!", "@", '"', "'",
    "$",";", "^", ":", "&", "?", "[", "]", "{", "}", "\\", "_", "\n",
]

function displayWords(words){
    words.forEach(w => {console.log(w)})
}