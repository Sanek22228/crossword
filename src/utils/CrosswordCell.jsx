import { Word } from "../classes/Word";

const NOP = ()=>{} // No Operation

function CrosswordCell({cell, showAnswers, isInteractive, onCellChange = NOP, coordinates = [], solved = false}){
    if(typeof cell === 'object'){
        return cell.direction === Word.DIRECTIONS.HORIZONTAL
        ? <th className="numberCell hotizontalNumber">{cell.value}</th>
        : <th className="numberCell verticalNumber">{cell.value}</th>
    }
    const isLetter = isNaN(Number(cell));
    return <th className={isLetter ? solved ? "solvedCell" : "filledCell" : "emptyCell"}>
        {isLetter 
            ? isInteractive
                ? <input 
                    type="text"
                    maxLength={1} 
                    readOnly={solved}
                    onChange={(e) => {
                        // e.target.value = e.target.value.toUpperCase(); 
                        onCellChange(coordinates[0], coordinates[1], e.target.value)
                    }}
                /> 
                : showAnswers ? cell : ""
            : ""
            }
    </th>
}

export { CrosswordCell }