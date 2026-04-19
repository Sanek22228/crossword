import { useEffect, useState } from "react";
import { fetchCrosswords } from "../services/feed";
import { CrosswordGrid } from "../utils/CrosswordGrid";
import styles from "../styles/Feed.module.css"
import { NavLink } from "react-router-dom";
import Play from "../images/play.png"

function Feed(){
  // const {user} = useAuth();
  const [crosswords, setCrosswords] = useState([]);
  useEffect(()=>{
    (async () =>{
      setCrosswords(await fetchCrosswords());
      console.log(crosswords);
    })()
  },[]);
  return(
    <main>
      <div className="crosswordInfo">
        {crosswords.map((item, key) => (
          <div key={key} className={styles.crosswordContainer} >
            <CrosswordGrid crossword={item} showAnswers={false}/>
            <NavLink to={`/play/${item.id}`}><img src={Play} alt="play crossword" style={{width:"1.5vw"}}/></NavLink>
          </div>
        ))}
      </div>
    </main>
  );
}

export { Feed };