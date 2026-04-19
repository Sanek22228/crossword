import { Word } from "../classes/Word";

function CrosswordCell({cell, showAnswers, isInteracive}){
    if(typeof cell === 'object'){
        return cell.direction === Word.DIRECTIONS.HORIZONTAL
        ? <th className="numberCell hotizontalNumber">{cell.value}</th>
        : <th className="numberCell verticalNumber">{cell.value}</th>
    }
    const isLetter = isNaN(Number(cell));
    return <th className={isLetter ? "filledCell" : "emptyCell"}>
        {isLetter 
            ? isInteracive 
                ? <input type="text" maxLength={1}/> 
                : showAnswers ? cell : ""
            : ""
            }
    </th>
}

export { CrosswordCell }