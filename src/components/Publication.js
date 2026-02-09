import { useNavigate } from "react-router-dom";
import '../styles/Publication.css'
import { CrosswordGrid } from '../utils/CrosswordGrid'
import { useEffect, useState } from "react";
import { useCrossword } from "../hook/useCrossword";
// import editIcon from "../images/edit.svg";

function Publication(){
  const navigate = useNavigate();
  const {curCrossword} = useCrossword();

  const [errorMessage, setErrorMessage] = useState("");

  function GoBack(){
    navigate(-1);
  }
  const [crossword, SetCrossword] = useState(curCrossword);
  useEffect(() => {
    SetCrossword(curCrossword)
  }, [curCrossword]);

  function PublicateCrossword(){
    if(DefinitionsFulfilled()){
      setErrorMessage("");
      navigate('/account');
    }
    else{
      setErrorMessage("Все поля объяснений должны быть заполнены");
    }
  }

  function DefinitionsFulfilled(){
    var inputs = document.getElementsByTagName("input");
    var isNull = false;
    inputs.forEach(input => {
      if(input.value === ""){  
        isNull = true;
      }
    });
    return isNull ? false : true;
  }

  return(
    <>
      <main style={{alignItems: "center"}}>
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
            <div style={{display: "flex", flexDirection: "column"}} id="vertical-definitions">
              {curCrossword.verticalWords.map((word, wordIndex) => 
                <div key={wordIndex}>
                  <label>{word.id}.</label>
                  <input type="text"/>
                </div>
              )}
            </div>
            <p><b>По горизонтали:</b></p>
            <div style={{display: "flex", flexDirection: "column"}} id="horizontal-definitions">
              {curCrossword.horizontalWords.map((word, wordIndex) => 
                <div key={wordIndex}>
                  <label>{word.id}.</label>
                  <input type="text"/>
                </div>
              )}
            </div>
            <button>
              Составить заново
            </button>
          </div>
        </div>
        <button style={{fontWeight: "bold"}} onClick={PublicateCrossword}>Опубликовать</button>
        <div style={{color:"red", marginBottom: 0}} id="error-container">{errorMessage}</div>
      </main>
    </>
  );
}

export { Publication };