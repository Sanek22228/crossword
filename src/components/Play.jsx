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
        const [playGrid, setPlayGrid] = useState({});
        const [solvedCells, setSolvedCells] = useState([]);
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
                    if(word.coordinates.cells.some(coord => coord[0] == row && coord[1]==col)){
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
            if(!selectedCell || solvedCells.includes(`${selectedCell.row}-${selectedCell.col}`)) {return}
            switch (type){
                case SHOW_TYPES.LETTER:
                    ShowLetter(selectedCell);
                    break;
                case SHOW_TYPES.RAND_LETTER:
                    break;
                case SHOW_TYPES.WORD:
                    break;
            }
            setHints(prev => ({...prev, [type]: prev[type]+1}));
        }
        function ShowLetter(coords){
            let letter = crossword.grid[coords.row][coords.col];
            setSolvedCells(prev => (
                                    [
                                        ... new Set([...prev, `${coords.row}-${coords.col}`])
                                    ]
                            ))
            OnCellChange(coords.row, coords.col, letter);
        }
        return (
            <>
                <main>
                    <div className="mainContainer">
                        {crossword && 
                            <>
                                <div className="questions">
                                    <p><b>Слова по вертикали:</b></p>
                                    {crossword.verticalWords.map((word, i) => (
                                        <div key={i}>
                                            <label>{word.order}. </label>
                                            <span>
                                                {word.question}
                                            </span>
                                        </div>
                                    ))}
                                    <p style={{marginTop: "3vh"}}><b>Слова по горизонтали:</b></p>
                                    {crossword.horizontalWords.map((word, i) => (
                                        <div key={i}>
                                            <label>{word.order}. </label>
                                            <span>
                                                {word.question}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div>
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