import { useParams } from "react-router-dom";
import { CrosswordGrid, MODES } from "../utils/CrosswordGrid";
import { useEffect, useState } from "react";
import { getCrosswordById } from "../services/crosswords";

function Play() {
    const {id} = useParams();
    const [crossword, setCrossword] = useState(null);
    useEffect(()=>{(async()=>{
        setCrossword(await getCrosswordById(id))
    })()
    },[id]);
    console.log(id);
    return (
        <>
            <main>
                {crossword && <CrosswordGrid crossword={crossword} mode={MODES.PLAY}/>}
            </main>
        </>
    );
}

export { Play };