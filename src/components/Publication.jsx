import { Navigate, useNavigate } from "react-router-dom";
import '../styles/Publication.css'
import { CrosswordGrid } from '../utils/CrosswordGrid'
import { useEffect, useState } from "react";
import { useCrossword } from "../hook/useCrossword";
import { fetchCrosswordPublication } from "../services/crosswords";
import { useAuth } from "../hook/useAuth"
// import editIcon from "../images/edit.svg";

function Publication(){
  const navigate = useNavigate();
  const {curCrossword} = useCrossword();
  const [errorMessage, setErrorMessage] = useState("");
  const {user, setLoginActive} = useAuth();
  
  function GoBack(){
    navigate(-1);
  }
  const [crossword, SetCrossword] = useState(curCrossword);
  useEffect(() => {
    SetCrossword(curCrossword)
  }, [curCrossword]);

  const [definitions, updateDefinitions] = useState({
    vertical: curCrossword.verticalWords.map(w =>""),
    horizontal: curCrossword.horizontalWords.map(w => "")
  });

  if(!crossword){
    console.log(!crossword);
    return <Navigate to="/"/>
  }

  async function PublicateCrossword(){
    if(DefinitionsFulfilled()){
      setErrorMessage("");
      if(user != null){
        console.log(user.id);
        await fetchCrosswordPublication(user, crossword);
        navigate("/account");
      }
      else{
        setLoginActive(true);
      }
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
              {curCrossword.verticalWords.map((word, i) => 
                <div key={i}>
                  <label>{word.order}.</label>
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
                  <label>{word.order}.</label>
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
            {/* <button>
              Составить заново
            </button> */}
          </div>
        </div>
        <p className="error">{errorMessage}</p>
        <button style={{fontWeight: "bold", width: "10vw", margin: 0}} onClick={PublicateCrossword}>Готово</button>
      </main>
    </>
  );
}

export { Publication };