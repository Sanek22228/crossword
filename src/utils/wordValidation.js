export function validateWords(words){
    var validWords = []
    words.forEach(word =>{
        let valid = true;
        if(word.length >= 2){
            let trimmedWord = word.trim();
            let chars = trimmedWord.split("");

            if(chars.length > 0 && separators.includes(chars[chars.length-1])){
                chars.pop();
            }

            for (let c of chars) {
                if( !isNaN(Number(c)) || separators.includes(c)){
                    valid = false
                    break;
                }
            }

            word = chars.join("");
        }
        else{
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
    return validWords;
}

const separators = [",", ".", "/", "#", "№", "-", "+", "=", "(", ")", "*", "!", "@", "\"", "'",
    "$",";", "^", ":", "&", "?", "[", "]", "{", "}", "\\", "_"
]

function displayWords(words){
    words.forEach(w => {console.log(w)})
}