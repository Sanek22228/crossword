import { Crossword } from '../classes/Crossword';
import "../styles/crosswordTable.css";
import { useNavigate } from 'react-router-dom';
import { useCrossword } from '../hook/useCrossword';
import { CrosswordGrid } from './CrosswordGrid';
import { ExportButtons } from '../components/ExportButtons';


// {crossword} деструктуризация, так как при создании <CrosswordTable crossword={crossword}/> передается объект props (properties), в котором crossword: crossword
const CrosswordViewer = ({crossword}) => {    
    const navigate = useNavigate();
    const {updateCrossword} = useCrossword();

    if(!(crossword instanceof Crossword)){
        console.error(`Expected Crossword instance`);
        return;
    }

    function ToPublication(crossword){
        updateCrossword(crossword, () => navigate('/publication'));
    }

    return (
        <div className='crossword'>
            <div className='infoContainer'>
                <div><b>Слова по горизонтали:</b> {FormatWordArray(crossword.horizontalWords)};</div>
                <div><b>Слова по вертикали:</b> {FormatWordArray(crossword.verticalWords)};</div>
                {FormatWordArray(crossword.skippedWords) && <div><b>Пропущенные слова:</b> {FormatWordArray(crossword.skippedWords)};</div>}
            </div>
            <CrosswordGrid crossword={crossword}/>
            <div className='exportBtnContainer'>
                <ExportButtons crossword={crossword}/>
                <button id='publishBtn' className='Button violet' onClick={() => ToPublication(crossword)}>Опубликовать</button>
            </div>
        </div>
    );
}


export function FormatWordArray(wordArray){
    let resString = "";
    for(let i = 0; i < wordArray.length; i++){
    resString += wordArray[i].wordText;
    if(i !== wordArray.length-1)
        resString += ", ";
    }
    return resString;
}

export { CrosswordViewer }