    import { replace, useNavigate, useNavigation, useParams } from "react-router-dom";
    import { CrosswordGrid, MODES } from "../utils/CrosswordGrid";
    import { useEffect, useState} from "react";
    import { getCrosswordById } from "../services/crosswords";
    import "../styles/Play.css";
    import { WinModal } from "./WinModal";

    const checkWord = (word, currentGrid, change) => {
        for(let i = 0; i < word.wordText.length; i++){
            let cell = word.coordinates.cells[i];
            let currentLetter = (cell[0] === change.row && cell[1] === change.col)
                ? change.value
                : currentGrid[`${cell[0]}-${cell[1]}`];
            if (currentLetter !== word.wordText[i]) 
                return false
        }
        return true
    }

    const SHOW_TYPES = {
        LETTER : "letter",
        RAND_LETTER : "randLetter",
        WORD : "word"
    }

    function Play() {
        const {id} = useParams();
        const [crossword, setCrossword] = useState(null);
        const [playGrid, setPlayGrid] = useState({}); // contains [`${row}-${col}`]:value
        const [solvedCells, setSolvedCells] = useState([]); // contains `${row}-${col}`
        const [win, setWin] = useState(false);
        const [selectedCell, setSelectedCell] = useState("");
        const [hints, setHints] = useState({letter: 0, randLetter: 0, word: 0});
        const navigate = useNavigate();

        useEffect(()=>{(async()=>{
            const data = await getCrosswordById(id)
            if(!data)
                navigate("/feed", {replace: true});
            console.log("data  " + data);
            setCrossword(data);
        })()
        },[id]);

        function OnCellChange(row, col, value){
            console.log("on cell change");
            let currentGrid = {
                ...playGrid, 
                [`${row}-${col}`]:value
            }
            setPlayGrid(() =>({...currentGrid}));
            if(crossword.grid[row][col] === value){
                crossword.words.forEach(word => {
                    if(word.coordinates.cells.some(coord => coord[0] == row && coord[1] == col)){
                        if(checkWord(word, currentGrid, {row: row, col: col, value: value})){
                            let newlySolved = word.coordinates.cells.map(cell => `${cell[0]}-${cell[1]}`);
                            setSolvedCells(prev => (
                                    [
                                        ... new Set([...prev, ...newlySolved])
                                    ]
                            ))
                            setWin(IsWin(row, col, value, currentGrid));
                        }
                    }
                });
            }
        }
        function IsWin(row, col, value, currentGrid){
            return crossword.words.every(w => 
                checkWord(w, currentGrid, {row: row, col: col, value: value}
            ));
        }

        function Show(type){
            let cellsToOpen = [];
            switch (type){
                case SHOW_TYPES.LETTER:
                    if(!selectedCell || solvedCells.includes(`${selectedCell.row}-${selectedCell.col}`)) {return}
                    cellsToOpen.push(selectedCell)
                    break;
                case SHOW_TYPES.RAND_LETTER:
                    // список из {row: , col: }, которых нет в solvedCells
                    let notSolvedCoords = [...new Set(crossword.words
                        .flatMap(w => (
                            w.coordinates.cells
                                .map(c=>(`${c[0]}-${c[1]}`)))))]
                        .filter(c=>!solvedCells.includes(c));
                    console.log(notSolvedCoords);
                    const randNum = Math.floor(Math.random()* notSolvedCoords.length);
                    const [r,c] = notSolvedCoords[randNum].split("-").map(Number);
                    cellsToOpen.push({row: r, col: c});
                    break;
                case SHOW_TYPES.WORD:
                    if(!selectedCell || solvedCells.includes(`${selectedCell.row}-${selectedCell.col}`)) {return}
                    let selectedWords = crossword.words
                        .filter(w => (
                            w.coordinates.cells
                                .some(c => c[0] == selectedCell.row && c[1] == selectedCell.col)))
                        .map(w=>w.coordinates.cells)[0];

                        console.log(selectedWords);
                        selectedWords.forEach(cell=> {
                            console.log(`row: ${cell[0]}, col: ${cell[1]}`)
                            cellsToOpen.push({row: cell[0], col: cell[1]});
                        });
                    break;
            }
            if (cellsToOpen.length > 0) {
                const updatedGrid = playGrid;
                cellsToOpen.forEach(c => {
                    updatedGrid[`${c.row}-${c.col}`] = crossword.grid[c.row][c.col];
                });
                setPlayGrid(updatedGrid);

                const newSolvedStrings = cellsToOpen.map(c => `${c.row}-${c.col}`);
                setSolvedCells(prev => [...new Set([...prev, ...newSolvedStrings])]);
                setWin(IsWin(cellsToOpen[0].row, cellsToOpen[0].col, crossword.grid[cellsToOpen[0].row][cellsToOpen[0].col], playGrid));
            }
            setHints(prev => ({ ...prev, [type]: prev[type] + 1 }));
        }
        
        return (
            <>
                <main>
                    <div className="mainContainer">
                        {crossword && 
                            <>
                                <div className="questions">
                                    <p style={{marginBottom: "1vh"}}><b>Слова по вертикали:</b></p>
                                    {crossword.verticalWords.map((word, i) => (
                                        <div key={i} style={{borderBottom : "1px solid #ccc", marginBottom: "1vh"}}>
                                            <label><b>{word.order}. </b></label>
                                            <span style={{textAlign: "left"}}>
                                                {word.question}
                                            </span>
                                        </div>
                                    ))}
                                    <p style={{margin: "3vh 0 1vh"}}><b>Слова по горизонтали:</b></p>
                                    {crossword.horizontalWords.map((word, i) => (
                                        <div key={i} style={{borderBottom : "1px solid #ccc", marginBottom: "1vh"}}>
                                            <label><b>{word.order}. </b></label>
                                            <span style={{textAlign: "left"}}>
                                                {word.question}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <p style={{textAlign: "center", margin: "5vh"}}>Название: {crossword.name}</p>
                                    <CrosswordGrid 
                                        crossword={crossword} 
                                        mode={MODES.PLAY} 
                                        onChange={OnCellChange} 
                                        solvedCells={solvedCells}
                                        onFocus={(selected) => {setSelectedCell(selected)}}
                                        playGrid={playGrid}
                                    />
                                    {win && 
                                        <WinModal hints={hints ?? null} crossword={crossword}/>
                                    }
                                </div>
                            </>}
                            <article>
                                <div className="hintContainer">
                                    <button className="Button violet" onClick={()=>Show(SHOW_TYPES.RAND_LETTER)}>Открыть случайную букву</button><br />
                                    <button className="Button violet" onClick={()=>Show(SHOW_TYPES.LETTER)}>Открыть выбранную букву</button><br />
                                    <button className="Button violet" onClick={()=>Show(SHOW_TYPES.WORD)}>Открыть слово</button>
                                </div>
                            </article>
                        </div>
                </main>
            </>
        );
    }

    export { Play };