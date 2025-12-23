
import { useState } from 'react';
import './App.css';
import {validateWords} from './utils/wordValidation'
import { CreateCrossword } from './utils/crosswordGenerator'
import {CreateCrosswordTable} from './utils/crosswordVisualizer'
import { wordsErrorHandler } from './utils/errorHandler';
import infoIcon from './images/info.png';

// document.onreset

function App(){
  const [inputValue, setInputValue] = useState("");
  const [crosswordTable, setCrosswordTable] = useState(<></>);
  const [error, setError] = useState("");
  const [showHint, setHint] = useState(false);

  function HandleClick(){
    setCrosswordTable(<></>);
    setError("");
    
    if(inputValue !== ""){
      var words = inputValue.trim().split(" ");
      words = validateWords(words);
      console.log(words);

      const wordsError = wordsErrorHandler(words);
      if(wordsError !== null){
        setError(wordsError);
        return;
      } 

      const crossword = CreateCrossword(words);
      
      const crosswordError = wordsErrorHandler(words, crossword);
      if(crosswordError !== null){
        setError(crosswordError);
        return
      } 
  
      setCrosswordTable(CreateCrosswordTable(crossword));
    }
    else{
      console.error("Список слов")
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
          <textarea autoFocus onChange={(e) => {setInputValue(e.target.value)}} type='text' name='wordInput' className='wordInput'></textarea>
          <button style={{position: "relative"}} className='infoBtn' onMouseEnter={() => setHint(true)} onMouseLeave={() => setHint(false)}><img src={infoIcon} alt='info'></img></button>
          {showHint && <span className='hint'>
            Правила ввода слов:
            <ul style={{margin: '5px 0', paddingLeft: '20px'}}>
              <li>Только буквы русского/английского алфавита</li>
              <li>Цифры и спецсимволы запрещены</li>
              <li>Минимум 2 слова для создания кроссворда</li>
              <li>Разделяйте слова пробелами или знаками препинания с пробелами</li>  
            </ul>
          </span>}
        </div>
        <button className='createBtn' onClick={HandleClick}>Создать</button>      
        {error && <p id='error'>{error}</p>}
        <div className='crosswordContainer'>
          {crosswordTable}
        </div>
      </main>
    </>
  );
}

export default App;