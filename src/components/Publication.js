import { useNavigate } from "react-router-dom";
import '../styles/Publication.css'
import { CrosswordGrid } from '../utils/CrosswordGrid'
import { useEffect, useState } from "react";
import { useCrossword } from "../hook/useCrossword";

function Publication(){
  const navigate = useNavigate();
  const {curCrossword} = useCrossword();

  function GoBack(){
    navigate(-1);
  }
  const [crossword, SetCrossword] = useState(curCrossword);
  useEffect(() => {
    SetCrossword(curCrossword)
  }, [curCrossword]);

  return(
    <>
      <main style={{alignItems: "center", height: "80vh"}}>
        <button id="backBtn" onClick={GoBack}>Отмена</button>
        <div id="crosswordInfo">
          <div id="words">
            <p style={{marginBottom: '0'}}><b>Слова по вертикали:</b></p>
            <p style={{margin: 0}} id="vertical-words">
              {crossword.verticalWords.map(w => w.word).join(', ')}
            </p>
            <p style={{marginBottom: '0'}}><b>Слова по горизонтали:</b></p>
            <p style={{margin: '0'}} id="horizontal-words">
              {crossword.horizontalWords.map(w => w.word).join(', ')}
            </p>
          </div>
          <div id="crosswordTable">
            <CrosswordGrid crossword={crossword}/>
          </div>
          <div id="definitions">
            <p><b>По вертикали:</b></p>
            <ol id="vertical-definitions">
              <li>
                бла бла бла
              </li>
              <li>
                бла бла бла
              </li>
            </ol>
            <p><b>По горизонтали:</b></p>
            <ol id="horizontal-definitions">
              <li>
                бла бла бла
              </li>
              <li>
                бла бла бла
              </li>
            </ol>
            <button >
              Составить заново
            </button>
          </div>
        </div>
        <button style={{fontWeight: "bold"}}>Опубликовать</button>
      </main>
    </>
  );
}

export { Publication };