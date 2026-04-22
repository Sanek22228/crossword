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
                    ? solvedCells.includes(`${rowIndex}-${colIndex}`) 
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