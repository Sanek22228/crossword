import { useEffect, useState } from "react";
import { fetchCrosswords } from "../services/feed";
import { MODES, CrosswordGrid } from "../utils/CrosswordGrid";
import styles from "../styles/Feed.module.css"
import { NavLink } from "react-router-dom";
import Play from "../images/play.png"
import { useAuth } from "../hook/useAuth";
// VIOLATION
function Feed(){
  const {user} = useAuth();
  const [crosswords, setCrosswords] = useState(null);
  useEffect(()=>{
    (async () =>{
      const id = user ? user.id : "";
      const data = await fetchCrosswords(id);
      if(data)
        setCrosswords(data);
    })()
  },[user]);
  return(
    <main>
      <div className="crosswordInfo">
        {crosswords && crosswords.map((item, key) => (
          <div key={key} className={styles.crosswordContainer} >
            <div style={{border: "1px solid purple", borderRadius: "1vw", padding: "2%"}}>
              <CrosswordGrid crossword={item} mode={MODES.VIEW}/>
            </div>
            <div className="InfoContainer" style={{display: "flex", justifyContent: "space-between", width: "90%", alignItems: "center"}}>
              <div>
                <p>Название: {item.name}</p>
                <p>Дата создания: {new Date(item.createdAt).toLocaleDateString()}</p>
              </div>
              <NavLink to={`/play/${item.id}`}><img src={Play} alt="play crossword" style={{width:"1.5vw"}}/></NavLink>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export { Feed };