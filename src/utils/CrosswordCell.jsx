import { Word } from "../classes/Word";

const NOP = ()=>{} // No Operation

function CrosswordCell({cell, showAnswers, isInteractive, onCellChange = NOP, coordinates = [], solved = false, value}){
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
                    data-row={coordinates[0]}
                    data-col={coordinates[1]}
                    type="text"
                    maxLength={1} 
                    readOnly={solved}
                    tabIndex={solved ? -1 : 1}
                    onChange={(e) => {
                        // e.target.value = e.target.value.toUpperCase(); 
                        onCellChange(coordinates[0], coordinates[1], e.target.value)
                    }}
                    value={value}
                /> 
                : showAnswers ? cell : ""
            : ""
            }
    </th>
}

export { CrosswordCell }