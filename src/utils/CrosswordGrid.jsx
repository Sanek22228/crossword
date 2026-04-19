import { Word } from '../classes/Word';

function CrosswordGrid({crossword, showAnswers = true}){
  const grid = crossword.grid;
  return(
    <>
      <table id={crossword.id} className={showAnswers ? 'filledTable' : 'emptyTable'} >
        <tbody>
          {grid && grid.map((row, rowIndex) => (
            <tr key={rowIndex}>{
              row.map((cell, colIndex) => {
                let cellValue = Number(cell);
                if(typeof cell === 'object'){
                  return cell.direction === Word.DIRECTIONS.HORIZONTAL
                    ? <th key={colIndex} className="numberCell hotizontalNumber">{cell.value}</th>
                    : <th key={colIndex} className="numberCell verticalNumber">{cell.value}</th>
                }
                const isLetter = isNaN(cellValue);
                return <th key={colIndex} className={isLetter ? "filledCell" : "emptyCell"}>{isLetter && showAnswers ? cell : ""}</th>
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export { CrosswordGrid }