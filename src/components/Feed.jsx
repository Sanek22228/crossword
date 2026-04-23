import { useEffect, useState } from "react";
import { fetchCrosswords } from "../services/feed";
import { MODES, CrosswordGrid } from "../utils/CrosswordGrid";
import styles from "../styles/Feed.module.css"
import { NavLink } from "react-router-dom";
import Play from "../images/play.png"
// VIOLATION
function Feed(){
  // const {user} = useAuth();
  const [crosswords, setCrosswords] = useState(null);
  useEffect(()=>{
    (async () =>{
      const data = await fetchCrosswords();
      if(data)
        setCrosswords(data);
    })()
  },[]);
  return(
    <main>
      <div className="crosswordInfo">
        {crosswords && crosswords.map((item, key) => (
          <div key={key} className={styles.crosswordContainer} >
            <CrosswordGrid crossword={item} mode={MODES.VIEW}/>
            <NavLink to={`/play/${item.id}`}><img src={Play} alt="play crossword" style={{width:"1.5vw"}}/></NavLink>
          </div>
        ))}
      </div>
    </main>
  );
}

export { Feed };