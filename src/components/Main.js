
import { useEffect, useState } from 'react';
import '../styles/App.css';
import {validateWords} from '../utils/wordValidation'
import { CreateCrossword } from '../utils/crosswordGenerator'
import { CrosswordTable } from '../utils/crosswordVisualizer'
import { wordsErrorHandler } from '../utils/errorHandler';
import infoIcon from '../images/info.png';
import { useCrossword } from '../hook/useCrossword';

// document.onreset

function Main(){
  const [inputValue, setInputValue] = useState(() => {return window.localStorage.getItem("words") ?? ""});
  const [crossword, setCrossword] = useState(null);
  const [error, setError] = useState("");
  const [showHint, setHint] = useState(false);

  const {curCrossword} = useCrossword();

  useEffect(() => {
    window.localStorage.setItem("words", inputValue);
  }, [inputValue]);
  useEffect(() => {
    setCrossword(curCrossword);
  }, [curCrossword])

  function HandleClick(){
    setCrossword(null);
    console.log(crossword);
    setError("");
    
    if(inputValue !== ""){
      var words = inputValue;
      words = validateWords(words);
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
      <header></header>
      <main>
        <h1>Конструктор кроссвордов</h1>
        <div>
          <h2>Введите слова:</h2>
          <br></br>
          <textarea value={inputValue} autoFocus onChange={(e) => setInputValue(e.target.value)} type='text' name='wordInput' className='wordInput'></textarea>
          <button style={{position: "relative"}} className='infoBtn' onMouseEnter={() => setHint(true)} onMouseLeave={() => setHint(false)}>
              <img src={infoIcon} alt='info'></img>
          </button>
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
        <button className='createBtn' onClick={HandleClick}>Создать</button>      
        {error && <p id='error'>{error}</p>}
        <div className='crosswordContainer'>
          {crossword && <CrosswordTable crossword={crossword}/>}
        </div>
      </main>
    </>
  );
}

export {Main};