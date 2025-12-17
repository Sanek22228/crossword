import { Crossword } from '../classes/Crossword';
import "../styles/crosswordTable.css";

export function CreateCrosswordTable(crossword){
    if(!(crossword instanceof Crossword)){
        console.error(`Expected Crossword instance`);
        return;
    }

    const grid = crossword.grid;
    
    return (
        <table>
            <tbody>
                {grid.map((row, rowIndex) => (
                    <tr key={rowIndex}>{
                        row.map((cell, colIndex) => (
                            cell === '0' 
                                ? <th key={colIndex} className="emptyCell"></th>
                                : <th key={colIndex} className="filledCell">{cell}</th>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}