import { Navigate, useNavigate } from "react-router-dom";
import '../styles/Publication.css'
import { CrosswordGrid } from '../utils/CrosswordGrid'
import { useEffect, useState } from "react";
import { useCrossword } from "../hook/useCrossword";
import { fetchCrosswordPublication } from "../services/crosswords";
import { useAuth } from "../hook/useAuth"
import { ExportButtons } from '../components/ExportButtons';

function Publication(){
  const navigate = useNavigate();
  const {curCrossword} = useCrossword();
  const [errorMessage, setErrorMessage] = useState("");
  const {user, setLoginActive, setOnSuccessAction} = useAuth();
  
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
      for (let i = 0; i < curCrossword.verticalWords.length; i++){
        curCrossword.verticalWords[i].question = definitions.vertical[i];
      }
      for (let i = 0; i < curCrossword.horizontalWords.length; i++){
        curCrossword.horizontalWords[i].question = definitions.horizontal[i];
      }
      if(user != null){
        await fetchCrosswordPublication(user, crossword);
        navigate(`/account/${user.id}`);
      }
      else{
        setLoginActive(true);
        setOnSuccessAction(() => async (loggedUser) => {console.log("crossword: " + crossword + " logged user: " + loggedUser);await fetchCrosswordPublication(loggedUser, crossword)});
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
        {/* <button id="backBtn" onClick={GoBack}>Отмена</button> */}
        <div id="crosswordInfo">
          <div id="words">
            <p style={{marginBottom: '0'}}><b>Слова по вертикали:</b></p>
            <p style={{margin: 0}} id="vertical-words">
              {crossword.verticalWords.map(w => w.wordText).join(', ')}
            </p>
            <p style={{marginBottom: '0'}}><b>Слова по горизонтали:</b></p>
            <p style={{margin: '0'}} id="horizontal-words">
              {crossword.horizontalWords.map(w => w.wordText).join(', ')}
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
                  <input className="QuestionInput" value={definitions.vertical[i]} onChange={(e) => {
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
                  <input className="QuestionInput" value={definitions.horizontal[i]} onChange={(e) => {
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
        <div style={{display: "flex", flexDirection:"column", gap: "3vh", alignItems: "center"}}>
          <p className="error">{errorMessage}</p>
          <ExportButtons crossword={crossword}/>
          <button 
            style={{fontWeight: "bold", padding: ".4vw 2vw", margin: 0}} 
            className='Button violet' 
            onClick={PublicateCrossword}>
              Опубликовать
          </button>
        </div>
      </main>
    </>
  );
}

export { Publication };