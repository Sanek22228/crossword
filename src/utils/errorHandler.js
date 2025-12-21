export function wordsErrorHandler(words, crossword){
    if(words.length <= 1){
            console.log("word list is null");
            return "Количество слов слишком мало для составления кроссворда";
    }
    else if(crossword && crossword.addedWords.length <= 1){
        console.log("crossword added words length is less than or equal 1");
        return `Удалось разместить только ${crossword.addedWords.length} из ${words.length} слов. 
            Попробуйте изменить количество слов или их длину.`;
    }
    return null;
}