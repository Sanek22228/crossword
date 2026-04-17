import { ExportCrossword } from '../utils/crosswordExport'

function ExportButtons({crossword}){
    function handleDownload(type, crossword){
        ExportCrossword(type, crossword);
    }
    return(
        <>
            <button onClick={() => handleDownload("xls", crossword)} className='downloadBtn'>
                Скачать в XLS
            </button>
            <button onClick={() => handleDownload("pdf", crossword)} className='downloadBtn'>
                Скачать в PDF
            </button>
        </>
    )
}

export {ExportButtons}