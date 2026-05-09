import { useEffect, useState } from 'react';
import { ExportCrossword } from '../utils/crosswordExport'
import { MODES, CrosswordGrid } from '../utils/CrosswordGrid';
import downloadIcon from "../images/download.svg"

function ExportButtons({crossword}){
    const [isExporting, setIsExporting] = useState(false);
    const [type, setType] = useState("");
    useEffect(()=>{
        if(!isExporting) return;
        setTimeout(() => {  
            ExportCrossword(type, crossword);
            setIsExporting(false);
        }, 10);
    },[isExporting])

    function handleDownload(type){
        setType(type);
        setIsExporting(true);
    }
    return(
        <>
            <button onClick={() => handleDownload("pdf")} className='controlBtn'>
                <img src={downloadIcon} alt="pdf download" />
            </button>
            {isExporting && <CrosswordGrid crossword={crossword} mode={MODES.VIEW}></CrosswordGrid>}
        </>
    )
}

export {ExportButtons}