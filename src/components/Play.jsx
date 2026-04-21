import { useParams } from "react-router-dom";
import { CrosswordGrid, MODES } from "../utils/CrosswordGrid";
import { useEffect, useState } from "react";
import { getCrosswordById } from "../services/crosswords";

function Play() {
    const {id} = useParams();
    const [crossword, setCrossword] = useState(null);
    const [playGrid, setPlayGrid] = useState({});
    const [solvedCells, setSolvedCells] = useState([]);
    useEffect(()=>{(async()=>{
        setCrossword(await getCrosswordById(id))
    })()
    },[id]);
    
    function OnCellChange(row, col, value){
        setPlayGrid(prev =>({
            ...prev, 
            [`${row}-${col}`]:value
        }));
        if(crossword.grid[row][col] === value){
            // console.log("crossword.grid[row][col]: " + crossword.grid[row][col]);
            // console.log("value: " + value);
            crossword.words.forEach(word => {
                // console.log("word: " + word.wordText);
                if(word.coordinates.cells.some(coord => coord[0] === row && coord[1]===col)){
                    // console.log(`found in cells`);
                    let correct = true;
                    for(let i = 0; i < word.coordinates.cells.length; i++){
                        const [cellRow, cellCol] = word.coordinates.cells[i];
                        let currentLetter = word.coordinates.cells[i][0] === row && word.coordinates.cells[i][1] === col 
                            ? value
                            : playGrid[`${cellRow}-${cellCol}`]
                        if(currentLetter !== word.wordText[i]){
                            console.log("incorrect");
                            correct = false;
                            break;
                        }
                    }
                    if(correct){
                        for(let i = 0; i < word.coordinates.cells.length; i++)
                        {
                            setSolvedCells(prev => (
                                [
                                    ...prev,
                                    [word.coordinates.cells[i][0], word.coordinates.cells[i][1]]
                                ]
                            ))
                        }
                    }
                }
            });
        }
    }

    return (
        <>
            <main style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", alignContent: "center"}}>
                {crossword && 
                    <>
                        <div className="questions">
                            <p><b>Слова по вертикали:</b></p>
                            {crossword.verticalWords.map((word, i) => (
                                <div key={i}>
                                    <label>{word.order}.</label>
                                    <span>
                                        {word.question}
                                    </span>
                                </div>
                            ))}
                            <p><b>Слова по горизонтали:</b></p>
                            {crossword.horizontalWords.map((word, i) => (
                                <div key={i}>
                                    <label>{word.order}.</label>
                                    <span>
                                        {word.question}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <CrosswordGrid crossword={crossword} mode={MODES.PLAY} onChange={OnCellChange} solvedCells={solvedCells}/>
                    </>}
            </main>
        </>
    );
}

export { Play };