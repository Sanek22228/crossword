import * as XLSX from 'xlsx';
import html2pdf from 'html2pdf.js';
import { FormatWordArray } from './crosswordViewer';

export function ExportCrossword(type, crossword){

    const exportContainer = CreateExportElement(crossword);
    if(!exportContainer) {
        console.error("failed to export");
        return;
    }
    const filename = "crossword." + type;
    if(type === "xls"){
        const wb = XLSX.utils.table_to_book();
        XLSX.writeFile(wb, filename)
    }
    else if (type === "pdf") {

    html2pdf().set({
        margin: 40,
        filename: "crossword.pdf",
        html2canvas: {
            scale: 3,
            useCORS: true
        },
        jsPDF: {
            unit: "pt",
            format: "a4",
            orientation: "portrait"
        }
    })
    .from(exportContainer)
    .save();
}
    exportContainer.remove();
}

function CreateExportElement(crossword) {
    if (!crossword) return null;
    
    const container = CreateContainer();

    // 1. Заголовок (можно добавить название кроссворда, если оно есть)
    const title = document.createElement("h1");
    title.innerText = "Кроссворд";
    title.style.textAlign = "center";
    title.style.marginBottom = "1vw";
    container.appendChild(title);

    // 2. Блок с вопросами (информация)
    const info = CreateInfoContainer(crossword);
    container.appendChild(info);

    // 3. Сетка кроссворда (Берем существующую или отрисовываем заново)
    console.log(document.getElementsByClassName("emptyTable"));
    const emptyTable = document.getElementsByClassName("emptyTable")[0].cloneNode(true);
    // emptyTable.hidden = false;
    var filledTable = document.getElementById(crossword.id).cloneNode(true);
    container.appendChild(filledTable);

    // 4. Разрыв страницы для PDF
    const pageBreak = document.createElement("div");
    pageBreak.style.pageBreakBefore = "always";
    container.appendChild(pageBreak);
    
    // 5. Второй лист (например, пустая сетка или ответы)
    container.appendChild(emptyTable);

    return container;
}

function CreateContainer(){
    const container = document.createElement("div");
    container.className = "crossword";
    container.style.backgroundColor = "white";
    return container;
}
function CreateInfoContainer(crossword){
    const info = document.createElement("div");
    info.className = "infoContainer";
    info.style.marginBottom = "30px";
    info.innerHTML = `
        <div style="margin-bottom: 10px;"><b>Слова по горизонтали:</b> ${FormatWordArray(crossword.horizontalWords)}</div>
        <div style="margin-bottom: 10px;"><b>Слова по вертикали:</b> ${FormatWordArray(crossword.verticalWords)}</div>
        ${crossword.skippedWords?.length > 0 ? `<div><b>Пропущенные слова:</b> ${FormatWordArray(crossword.skippedWords)}</div>` : ""}
    `;
    return info;
}