<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
=======
import { Navigate, useNavigate } from "react-router-dom";
>>>>>>> backend
import '../styles/Publication.css'
import { CrosswordGrid } from '../utils/CrosswordGrid'
import { useEffect, useState } from "react";
import { useCrossword } from "../hook/useCrossword";
<<<<<<< HEAD
=======
// import editIcon from "../images/edit.svg";
>>>>>>> backend

function Publication(){
  const navigate = useNavigate();
  const {curCrossword} = useCrossword();
<<<<<<< HEAD

=======
  const [errorMessage, setErrorMessage] = useState("");
>>>>>>> backend
  function GoBack(){
    navigate(-1);
  }
  const [crossword, SetCrossword] = useState(curCrossword);
  useEffect(() => {
    SetCrossword(curCrossword)
  }, [curCrossword]);

<<<<<<< HEAD
  return(
    <>
      <main style={{alignItems: "center", height: "80vh"}}>
=======
  const [definitions, updateDefinitions] = useState({
    vertical: curCrossword.verticalWords.map(w =>""),
    horizontal: curCrossword.horizontalWords.map(w => "")
  });

  if(!crossword){
    console.log(!crossword);
    return <Navigate to="/"/>
  }

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
    return definitions.vertical.every(def => def.trim() !== "") && definitions.horizontal.every(def => def.trim() !== "");
  }

  return(
    <>
      <main style={{alignItems: "center"}}>
>>>>>>> backend
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
<<<<<<< HEAD
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
=======
            <div style={{display: "flex", flexDirection: "column"}} id="vertical-definitions">
              {curCrossword.verticalWords.map((word, i) => 
                <div key={i}>
                  <label>{word.id}.</label>
                  <input value={definitions.vertical[i]} onChange={(e) => {
                    let copy = [...definitions.vertical];
                    copy[i] = e.target.value;
                    updateDefinitions({
                      ...definitions,
                      vertical: copy
                    });
                  }} type="text"/>
                </div>
              )}
            </div>
            <p><b>По горизонтали:</b></p>
            <div style={{display: "flex", flexDirection: "column"}} id="horizontal-definitions">
              {curCrossword.horizontalWords.map((word, i) => 
                <div key={i}>
                  <label>{word.id}.</label>
                  <input value={definitions.horizontal[i]} onChange={(e) => {
                    let copy = [...definitions.horizontal];
                    copy[i] = e.target.value;
                    updateDefinitions({
                      ...definitions,
                      horizontal: copy
                    });
                  }} type="text"/>
                </div>
              )}
            </div>
            <button>
>>>>>>> backend
              Составить заново
            </button>
          </div>
        </div>
<<<<<<< HEAD
        <button style={{fontWeight: "bold"}}>Опубликовать</button>
=======
        <button style={{fontWeight: "bold"}} onClick={PublicateCrossword}>Опубликовать</button>
        <div style={{color:"red", marginBottom: 0}} id="error-container">{errorMessage}</div>
>>>>>>> backend
      </main>
    </>
  );
}

export { Publication };