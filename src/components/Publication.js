import { useNavigate } from "react-router-dom";
import '../styles/Publication.css'

function Publication(){
  const navigate = useNavigate();
  function GoBack(){
    navigate(-1);
  }
  return(
    <>
      <main style={{alignItems: "center", height: "80vh"}}>
        <button style={{position: "absolute", top: "50px", left: "10px", transform: "translateY(50%)"}} onClick={GoBack}>Отмена</button>
        <div id="crosswordInfo">
          <div id="words">
            <p>
              <b>Слова по вертикали:</b>
            </p>
            <p>
              <b>Слова по горизонтали:</b>
            </p>
          </div>
          <div id="crosswordTable">
            crossword table
          </div>
          <div id="definitions">
            <p><b>По вертикали:</b></p>
            <ol>
              <li>
                бла бла бла
              </li>
              <li>
                бла бла бла
              </li>
            </ol>
            <p><b>По горизонтали:</b></p>
            <ol>
              <li>
                бла бла бла
              </li>
              <li>
                бла бла бла
              </li>
            </ol>
            <button>
              Составить заново
            </button>
          </div>
        </div>
        <button>Опубликовать</button>
      </main>
    </>
  );
}

export { Publication };