
import { useState } from 'react';
import './App.css';
import {validateWords} from './utils/wordValidation'
import {CreateCrossword} from './utils/crosswordGenerator'
import {CreateCrosswordTable} from './utils/crosswordVisualizer'

// document.onreset

function App(){
  const [inputValue, setInputValue] = useState("");
  const [crosswordTable, setCrosswordTable] = useState(<></>);

  function HandleClick(){
    setCrosswordTable(<></>);
    
    if(inputValue !== ""){
      var words = inputValue.trim().split(" ");
      words = validateWords(words);
      console.log(words);
      const crossword = CreateCrossword(words);
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
        </div>
        <button className='createBtn' onClick={HandleClick}>Создать</button>      
        <div className='crosswordContainer'>
          {crosswordTable}
        </div>
      </main>
    </>
  );
}

export default App;