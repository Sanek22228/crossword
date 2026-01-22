import { Crossword } from '../classes/Crossword';
import "../styles/crosswordTable.css";
import { ExportCrossword } from './crosswordExport'
import { useNavigate } from 'react-router-dom';
import { useCrossword } from '../hook/useCrossword';
import { CrosswordGrid } from './CrosswordGrid';


// {crossword} деструктуризация, так как при создании <CrosswordTable crossword={crossword}/> передается объект props (properties), в котором crossword: crossword
const CrosswordViewer = ({crossword}) => {    
    const navigate = useNavigate();
    const {updateCrossword} = useCrossword();

    if(!(crossword instanceof Crossword)){
        console.error(`Expected Crossword instance`);
        return;
    }

    function ToPublication(crossword){
        let skippedWords = ValidateWordsWithDict(crossword.addedWords);
        if(skippedWords === null){
            updateCrossword(crossword, () => navigate('/publication'))
        }
        else{
            return `Слов ${skippedWords} не существет`
        }
    }

    return (
        <div className='crossword'>
            <div className='infoContainer'>
                <div><b>Слова по горизонтали:</b> {FormatWordArray(crossword.horizontalWords)};</div>
                <div><b>Слова по вертикали:</b> {FormatWordArray(crossword.verticalWords)};</div>
                {FormatWordArray(crossword.skippedWords, "string") && <div><b>Пропущенные слова:</b> {FormatWordArray(crossword.skippedWords, "string")};</div>}
            </div>
            <CrosswordGrid crossword={crossword}/>
            <div className='exportBtnContainer'>
                <button onClick={() => handleDownload("xls")} className='downloadBtn'>
                    Скачать в XLS
                </button>
                <button onClick={() => handleDownload("pdf")} className='downloadBtn'>
                    Скачать в PDF
                </button>
                <button id='publishBtn' onClick={() => ToPublication(crossword)}>Опубликовать</button>
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

function ValidateWordsWithDict(words){
    //async function, needs to be connected to web api
    return null;
}

export { CrosswordViewer }