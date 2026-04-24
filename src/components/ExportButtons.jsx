import { useEffect, useState } from 'react';
import { ExportCrossword } from '../utils/crosswordExport'
import { MODES, CrosswordGrid } from '../utils/CrosswordGrid';

function ExportButtons({crossword}){
    const [isExporting, setIsExporting] = useState(false);
    const [type, setType] = useState("");
    useEffect(()=>{
        if(!isExporting) return;
        setTimeout(() => {  
            ExportCrossword(type, crossword);
            setIsExporting(false);
        }, 100);
    },[isExporting])

    function handleDownload(type){
        setType(type);
        setIsExporting(true);
    }
    return(
        <>
            <button onClick={() => handleDownload("xls")} className='downloadBtn'>
                Скачать в XLS
            </button>
            <button onClick={() => handleDownload("pdf")} className='downloadBtn'>
                Скачать в PDF
            </button>
            {isExporting && <CrosswordGrid crossword={crossword} mode={MODES.VIEW}></CrosswordGrid>}
        </>
    )
}

export {ExportButtons}