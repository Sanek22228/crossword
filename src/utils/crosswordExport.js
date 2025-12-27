import * as XLSX from 'xlsx';
import html2pdf from 'html2pdf.js';

export function ExportCrossword(type){
    const exportContainer = CreateExportElement();
    const filename = "crossword." + type;
    if(type === "xls"){    
        const wb = XLSX.utils.table_to_book(exportContainer);
        XLSX.writeFile(wb, filename)
    }
    else if (type === "pdf") {
    const pdfWidthPt = 595 - 40 * 2; // A4 - margins
    const htmlWidthPx = exportContainer.scrollWidth;

    const scale = pdfWidthPt / htmlWidthPx;

    html2pdf().set({
        margin: 40,
        filename: "crossword.pdf",
        html2canvas: {
            scale: Math.min(scale, 2),
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

function CreateExportElement(){
    var container = document.createElement("div");
    container.className = "crossword";
    var info = document.getElementsByClassName("infoContainer")[0].cloneNode(true);
    var filledTable = document.getElementById("filledTable").cloneNode(true);
    // var info = document.getElementsByClassName("infoContainer")[0];
    // var filledTable = document.getElementById("filledTable");

    var pageBreak = document.createElement("div");
    pageBreak.style.pageBreakBefore = "always";

    var emptyTable = document.getElementById("emptyTable").cloneNode(true);
    emptyTable.hidden = false;
    // var emptyTable = document.getElementById("emptyTable");

    container.appendChild(info);
    container.appendChild(filledTable);
    container.appendChild(pageBreak);
    container.appendChild(emptyTable);

    return container;
}