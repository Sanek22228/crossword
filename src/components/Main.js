import { useEffect, useState } from 'react';
import '../styles/App.css';
import {validateWords} from '../utils/wordValidation'
import { CreateCrossword } from '../utils/crosswordGenerator'
import { CrosswordViewer } from '../utils/crosswordViewer'
import { wordsErrorHandler } from '../utils/errorHandler';
import infoIcon from '../images/info.png';
import { useCrossword } from '../hook/useCrossword';

// document.onreset

function Main(){
  const [inputValue, setInputValue] = useState(() => {return window.localStorage.getItem("words") ?? ""});
  const [error, setError] = useState("");
  const [showHint, setHint] = useState(false);
  const [loading, setLoading] = useState(true);

  const {curCrossword} = useCrossword();
  const [crossword, setCrossword] = useState(curCrossword);
  
  useEffect(() => {
    window.localStorage.setItem("words", inputValue);
  }, [inputValue]);

  async function HandleClick(){
    setCrossword(null);
    console.log(crossword);
    setError("");
    
    if(inputValue !== ""){
      var words = inputValue;
      setLoading(true);
      words = await validateWords(words);
      setLoading(false);
      console.log(words);

      const wordsError = wordsErrorHandler(words);
      if(wordsError !== null){
        setCrossword(null);
        setError(wordsError);
        return;
      } 
      let newCrossword = CreateCrossword(words);
      const crosswordError = wordsErrorHandler(words, newCrossword);
      if(crosswordError !== null){
        setCrossword(null);
        setError(crosswordError);
        return;
      }
      console.log("crossword: ", crossword);
      setCrossword(newCrossword);
    }
  }

  return(
    <>
      <main>
        <h1>Конструктор кроссвордов</h1>
        <div>
          <h2>Введите слова:</h2>
          <br></br>
          <div style={{display: "flex", alignItems: "flex-start", flexDirection:"row", width: "100%"}}>
            <textarea value={inputValue} autoFocus onChange={(e) => setInputValue(e.target.value)} type='text' name='wordInput' className='wordInput'></textarea>
            <button className='infoBtn' onMouseEnter={() => setHint(true)} onMouseLeave={() => setHint(false)}>
                <img src={infoIcon} alt='info'></img>
            </button>
            <div>
            {showHint && <span className='hint'>
              Правила ввода слов:
              <ul style={{margin: '5px 0', paddingLeft: '20px'}}>
                <li>Только буквы русского/английского алфавита</li>
                <li>Цифры и спецсимволы запрещены</li>
                <li>Минимум 2 слова для создания кроссворда</li>
                <li>Разделяйте слова пробелами или знаками препинания</li>  
              </ul>
            </span>}
            </div>
          </div>
        </div>
        <button className='createBtn' onClick={HandleClick}>Создать</button>      
        {error && <p id='error'>{error}</p>}
        <div className='crosswordContainer'>
          {loading && <span className="loader"></span>}
          {crossword && <CrosswordViewer crossword={crossword}/>}
        </div>
      </main>
    </>
  );
}

export {Main};