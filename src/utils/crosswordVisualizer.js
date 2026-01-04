import { Crossword } from '../classes/Crossword';
import "../styles/crosswordTable.css";
import { ExportCrossword } from './crosswordExport'
import { Word } from '../classes/Word';

export function CreateCrosswordTable(crossword){
    if(!(crossword instanceof Crossword)){
        console.error(`Expected Crossword instance`);
        return;
    }

    const grid = crossword.grid;
    
    return (
        <div className='crossword'>
            <div className='infoContainer'>
                <div><b>Слова по горизонтали:</b> {FormatWordArray(crossword.horizontalWords)};</div>
                <div><b>Слова по вертикали:</b> {FormatWordArray(crossword.verticalWords)};</div>
                {FormatWordArray(crossword.skippedWords, "string") && <div><b>Пропущенные слова:</b> {FormatWordArray(crossword.skippedWords, "string")};</div>}
            </div>
            <table id='filledTable'>
                <tbody>
                    {grid.map((row, rowIndex) => (
                       <tr key={rowIndex}>{
                            row.map((cell, colIndex) => {
                                let cellValue = Number(cell);
                                if(typeof cell === 'object'){
                                    return cell.direction === Word.DIRECTIONS.HORIZONTAL
                                        ? <th key={colIndex} className="numberCell hotizontalNumber">{cell.value}</th>
                                        : <th key={colIndex} className="numberCell verticalNumber">{cell.value}</th>; 
                                }
                                return isNaN(cellValue) 
                                    ? <th key={colIndex} className="filledCell">{cell}</th>
                                    : <th key={colIndex} className="emptyCell"></th>;
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
            <table id='emptyTable' hidden>
                <tbody>
                    {grid.map((row, rowIndex) => (
                        <tr key={rowIndex}>{
                            row.map((cell, colIndex) => {
                                let cellValue = Number(cell);
                                if(typeof cell === 'object'){
                                    return cell.direction === Word.DIRECTIONS.HORIZONTAL
                                        ? <th key={colIndex} className="numberCell hotizontalNumber">{cell.value}</th>
                                        : <th key={colIndex} className="numberCell verticalNumber">{cell.value}</th>; 
                                }
                                return isNaN(cellValue) 
                                    ? <th key={colIndex} className="filledCell"></th>
                                    : <th key={colIndex} className="emptyCell"></th>;
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='exportBtnContainer'>
                <button onClick={() => handleDownload("xls")} className='downloadBtn'>
                    Скачать в XLS
                </button>
                <button onClick={() => handleDownload("pdf")} className='downloadBtn'>
                    Скачать в PDF
                </button>
                <button id='publishBtn' onClick={() => ToPublishPage(crossword)}>Опубликовать</button>
            </div>
        </div>
    );
}

function handleDownload(type){
    ExportCrossword(type);
}

function FormatWordArray(wordArray, objectType){
    let resString = "";
    
    if(objectType === "string"){
        for(let i = 0; i < wordArray.length; i++){
            resString += wordArray[i];
            if(i !== wordArray.length-1)
                resString += ", ";
        }
    }
    else{
        for(let i = 0; i < wordArray.length; i++){
        resString += wordArray[i].word;
        if(i !== wordArray.length-1)
            resString += ", ";
        }
    }
    return resString;
}

function ToPublishPage(crossword){
    let skippedWords = ValidateWordsWithDict(crossword.addedWords);
    if(skippedWords !== null){
        window.location.href = "index2.html";
        window.localStorage.setItem("crossword", JSON.stringify(crossword));
    }
}

function ValidateWordsWithDict(words){
    return "words";
}