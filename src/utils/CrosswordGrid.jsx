import { CrosswordCell } from './CrosswordCell';

const MODES = {
    FULL: "full",
    VIEW: "view",
    PLAY: "play"
}

const NOP = ()=>{} // No Operation

function CrosswordGrid({crossword, mode = MODES.FULL, onChange = NOP, solvedCells = []}){
  const grid = crossword.grid;
  return(
    <>
      <table id={crossword.id}>
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
                    ? solvedCells.some(c => c[0] === rowIndex && c[1] === colIndex) 
                    : false}
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