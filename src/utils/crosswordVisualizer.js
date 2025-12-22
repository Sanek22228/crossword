import { Crossword } from '../classes/Crossword';
import "../styles/crosswordTable.css";
import * as XLSX from 'xlsx';
import html2pdf from 'html2pdf.js';

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
            <table>
                <tbody>
                    {grid.map((row, rowIndex) => (
                        <tr key={rowIndex}>{
                            row.map((cell, colIndex) => (
                                cell === '0' 
                                    ? <th key={colIndex} className="emptyCell"></th>
                                    : <th key={colIndex} className="filledCell">{cell}</th>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='exportContainer'>
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
    const filename = "crossword." + type;
    const table = document.getElementsByClassName("crossword")[0];
    if(type === "xls"){    
        const ws =  XLSX.utils.table_to_sheet(table);
        Object.keys(ws).forEach(cell => {
            // cell[0] - value; cell[1] - type;
            if(cell[0] === '!')return;
            ws[cell].s = {
                alignment: {
                    horizontal : "center",
                    vertical : "center",
                },
                border: {
                    top: { style: "thin" },
                    bottom: { style: "thin" },
                    left: { style: "thin" },
                    right: { style: "thin" }
                },
                fill: {
                    fgColor: { rgb: "d2a533" }
                }
            }
        });

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Crossword");
        XLSX.writeFile(wb, filename, {cellStyles:true})
    }
    else if(type === "pdf"){
        html2pdf().set({
            margin: 100,
            filename: "crossword.pdf",
            html2canvas: { scale: 2 },
            jsPDF: { unit: "pt", format: "a4", orientation: "portrait" }
        })
        .from(table).save();
    }
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