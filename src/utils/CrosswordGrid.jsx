import { CrosswordCell } from './CrosswordCell';

const MODES = {
    FULL: "full",
    VIEW: "view",
    PLAY: "play"
}

const NOP = ()=>{} // No Operation

function CrosswordGrid({crossword, mode = MODES.FULL, onChange = NOP, solvedCells = [], onFocus = NOP, playGrid ={} }){
  const grid = crossword.grid;
  return(
    <>
      <table className={mode===MODES.VIEW ? "emptyTable" : "filledTable"} id={crossword.id} onFocusCapture={(e) => onFocus(e.target.dataset)}>
        <tbody>
          {grid && grid.map((row, rowIndex) => (
            <tr key={rowIndex}>{
              row.map((cell, colIndex) => (
                <CrosswordCell
                  cell={cell} 
                  showAnswers={mode === MODES.FULL} 
                  isInteractive={mode === MODES.PLAY} 
                  key={colIndex} 
                  onCellChange={onChange}
                  coordinates={[rowIndex, colIndex]}
                  solved={solvedCells.length > 0 
                    ? solvedCells.includes(`${rowIndex}-${colIndex}`) 
                    : false}
                    value={playGrid[`${rowIndex}-${colIndex}`] ?? ""}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export { CrosswordGrid, MODES }