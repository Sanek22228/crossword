import { CrosswordCell } from './CrosswordCell';

const MODES = {
    FULL: "full",
    VIEW: "view",
    PLAY: "play"
}

function CrosswordGrid({crossword, mode = MODES.FULL}){
  const grid = crossword.grid;
  return(
    <>
      <table id={crossword.id}>
        <tbody>
          {grid && grid.map((row, rowIndex) => (
            <tr key={rowIndex}>{
              row.map((cell, colIndex) => (
                <CrosswordCell cell={cell} showAnswers={mode === MODES.FULL} isInteractive={mode === MODES.PLAY} key={colIndex} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export { CrosswordGrid, MODES }