import { useEffect, useState } from "react";
import { fetchCrosswords } from "../services/feed";
import { MODES, CrosswordGrid } from "../utils/CrosswordGrid";
import styles from "../styles/Feed.module.css"
import { NavLink } from "react-router-dom";
import Play from "../images/play.png"
import { useAuth } from "../hook/useAuth";
import { ExportButtons } from "./ExportButtons";
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
        {crosswords && crosswords.length > 0 ?
          crosswords.map((item, key) => (
                <div key={item.id || key} className="crosswordTable" style={{width: "30vw"}}>
                  <p >{item.name}</p>
                  <CrosswordGrid crossword={item} mode="view"/>
                  <div className="controls">
                      <p>
                        Дата создания: {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                      <ExportButtons crossword={item} />
                      <NavLink to={`/play/${item.id}`}><img src={Play} alt="play crossword" style={{width:"1.5vw", marginLeft: "1vw"}}/></NavLink>
                  </div>
                </div>
              ))
            : (
            <p>У вас пока нет кроссвордов</p>
        )}
      </div>
    </main>
  );
}

export { Feed };