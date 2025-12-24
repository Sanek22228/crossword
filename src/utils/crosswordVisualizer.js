import { Crossword } from '../classes/Crossword';
import "../styles/crosswordTable.css";
import { ExportCrossword } from './crosswordExport'

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
                                if(isNaN(cellValue)){
                                    return <th key={colIndex} className="filledCell">{cell}</th>;
                                }
                                else if(cellValue > 0){
                                    return <th key={colIndex} className="numberCell">{cell}</th>;
                                }
                                return <th key={colIndex} className="emptyCell"></th>;
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
                                if(isNaN(cellValue)){
                                    return <th key={colIndex} className="filledCell"></th>;
                                }
                                else if(cellValue > 0){
                                    return <th key={colIndex} className="numberCell">{cell}</th>;
                                }
                                return <th key={colIndex} className="emptyCell"></th>;
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