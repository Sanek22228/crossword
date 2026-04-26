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
    
    let filledTable;
    let verticalDefinitions;
    let horizontalDefinitions;
    
    const questionWrapper = document.createElement("div");
    questionWrapper.style.display = "flex";
    questionWrapper.style.gap = "50pt";

    if(crossword.id){
        filledTable = document.getElementById(crossword.id).cloneNode(true);    
        questionWrapper.appendChild(CreateQuestionList("Слова по вертикали: ", crossword.verticalWords));
        console.log(crossword.verticalWords);
        questionWrapper.appendChild(CreateQuestionList("Слова по горизонтали: ", crossword.horizontalWords));
        console.log(crossword.horizontalWords);
    }
    else{
        filledTable = document.getElementsByClassName("filledTable")[0].cloneNode(true);
        verticalDefinitions = getQuestionsFromPage("vertical-definitions")
        horizontalDefinitions = getQuestionsFromPage("horizontal-definitions")
        questionWrapper.appendChild(CreateQuestionList("Слова по вертикали: ", crossword.verticalWords, verticalDefinitions));
        questionWrapper.appendChild(CreateQuestionList("Слова по горизонтали: ", crossword.horizontalWords, horizontalDefinitions));
    }
    
    container.appendChild(filledTable);

    // 4. Разрыв страницы для PDF
    const pageBreak = document.createElement("div");
    pageBreak.style.pageBreakBefore = "always";
    container.appendChild(pageBreak);
    
    // 5. Второй лист
    container.appendChild(emptyTable);
    container.appendChild(questionWrapper);

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
function CreateQuestionList(title, words, questions) {
    const column = document.createElement("div");
    column.style.flex = "1";

    const h3 = document.createElement("h3");
    h3.innerText = title;
    h3.style.borderBottom = "1px solid #ccc";
    h3.style.paddingBottom = "5pt";
    h3.style.marginBottom = "10pt";
    h3.style.marginTop = "80pt";
    h3.style.whiteSpace = "nowrap"; // Чтобы заголовок не рвался
    column.appendChild(h3);

    for (let i = 0; i < words.length; i ++){
        const p = document.createElement("p");
        p.style.display = "flex";
        p.style.gap = "5pt";
        p.style.margin = "8pt 0";
        p.style.fontSize = "11pt";
        p.style.lineHeight = "1.3";
        p.style.wordBreak = "break-word";
        const num = `<span style="font-weight: bold; min-width: 20pt; flex-shrink: 0;">${words[i].order}.</span>`;
        const text = `<span style="flex-grow: 1;">${questions && questions[i] || words[i].question || "____________________"}</span>`;
    
        p.innerHTML = num + text;
        column.appendChild(p);
        column.appendChild(p);
    };    

    return column;
}
const getQuestionsFromPage = (id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        // Достаем значения из всех инпутов внутри контейнера
        return Array.from(el.querySelectorAll('input')).map(input => input.value);
    };