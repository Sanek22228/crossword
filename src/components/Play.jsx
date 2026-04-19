import { useParams } from "react-router-dom";

function Play() {
    const {id} = useParams();
    console.log(id);
    return (
        <>
            <main>
                {/* <CrosswordGrid crossword={null} showAnswers={false}/> */}
            </main>
        </>
    );
}

export { Play };