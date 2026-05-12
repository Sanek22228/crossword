import avatarIcon from "../images/avatar.webp";

import { useEffect, useState } from "react";
import { fetchCrosswords } from "../services/feed";
import { MODES, CrosswordGrid } from "../utils/CrosswordGrid";
import styles from "../styles/Feed.module.css"
import { NavLink } from "react-router-dom";
import Play from "../images/play.png"
import { useAuth } from "../hook/useAuth";
import { ExportButtons } from "./ExportButtons";

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
                      <NavLink to={`/profile/${item.userId}`} style={{display: "flex", gap: ".4vw", alignItems: "center", textDecoration: "none"}}>
                        <img style={{width: "2vw"}} src={avatarIcon} alt="account picture" />
                        <p style={{color: "black"}}>автор</p>
                      </NavLink>
                      <p style={{textAlign: "center"}}>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                      {/* <ExportButtons crossword={item} /> */}
                      {/* <NavLink to={`/play/${item.id}`}><img src={Play} alt="play crossword" style={{width:"1.5vw", marginLeft: "1vw"}}/></NavLink> */}
                      <NavLink to={`/play/${item.id}`} style={{backgroundColor: "var(--violet-8)", padding: "2% 5%", color: "white", borderRadius: "5px", textDecoration: "none"}}>
                        <p>Играть</p>
                      </NavLink>
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