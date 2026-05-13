import styles from "../styles/Account.module.css"
import avatarIcon from "../images/avatar.webp";
import editIcon from "../images/edit.svg";

import { useEffect, useState } from "react";
import { useAuth } from "../hook/useAuth";
import { CrosswordGrid } from "../utils/CrosswordGrid";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import {fetchUserStatistics} from "../services/users"
import { AccountEditModal } from "./AccountEditModal";
import { ExportButtons } from "./ExportButtons";
import { deleteCrossword } from "../services/crosswords";
import { useCrossword } from "../hook/useCrossword";
import { flexPropDefs } from "@radix-ui/themes/props";
import { DeleteModal } from "./DeleteModal";

const MODES = {
  FULL: "full",
  VIEW: "view"
}

function Account({mode = MODES.FULL}){
  const { user } = useAuth();
  const { id } = useParams();
  const { updateCurCrossword } = useCrossword();
  const [targetUser, setTarget] = useState(null);

  const fullMode = mode === MODES.FULL;

  useEffect(()=>{
    ( async () => {
      await updateData();
    })()
  },[user, mode, id])

  async function updateData(){
    try{  
      let curUserId = user ? user.id : id;
      const data = await fetchUserStatistics(id, curUserId);
      setTarget(data);
    }
    catch(e){
      console.error(e);
    }
  }

  async function EditCrossword(crossword){
    updateCurCrossword(crossword);
    navigate("/publication?mode=edit");
  }

  if (!targetUser) {
    return <div className={styles.loader}>Загрузка профиля...</div>;
  }
  
  return(
    <main>
      <div className={styles.accountContainer}>
        <div className={styles.accountInfo}>
          <img src={avatarIcon} alt="account picture" />
          <h2>
            {targetUser.userName }
          </h2>
          <p>
            {targetUser.completed} кроссворд{"ов"} решено
          </p>
          <p>
            {targetUser.crosswords?.length} кроссворд{"а"} создано
          </p>
          {/* <p>
            Рейтинг: {4.8}⭐
          </p> */}
          {fullMode && <AccountEditModal user={user}/>}
        </div>
        <div className="crosswordInfo">
          {targetUser.crosswords && targetUser.crosswords.length > 0 ?
          targetUser.crosswords.map((item, key) => (
                <div key={item.id || key} className="crosswordTable">
                  <div className="topInfo" style={{display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center"}}>
                    <p >{item.name}</p>
                    {item.completed && <p style={{textAlign: "center", backgroundColor: "var(--green-4)", padding: "1% 6%", borderRadius: "10vw", width: "fit-content", whiteSpace: "nowrap"}}>✓ Пройден</p>}
                  </div>
                  <CrosswordGrid crossword={item} mode={mode} />
                  <div className="controls">
                      <p>
                        Дата: {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                      {(fullMode || item.completed) && <ExportButtons crossword={item} />}
                      {fullMode && 
                      <>
                        <DeleteModal crossword={item} cb={updateData}/>
                        <button onClick={async () => await EditCrossword(item)} className="controlBtn">
                          <img src={editIcon} alt="edit icon"/>
                        </button>
                      </>}
                      {
                        !fullMode &&
                        <NavLink to={`/play/${item.id}`} style={{backgroundColor: "var(--violet-8)", padding: "2% 4%", color: "white", borderRadius: "5px", textDecoration: "none", marginLeft: "1vw", minWidth: "fit-content"}}>
                          <p>{item.completed ? "Пройти снова" : "Играть"}</p>
                        </NavLink>
                      }
                  </div>
                </div>
              ))
            : (<>
              {fullMode 
                ? <p style={{alignSelf: "flex-start"}}>Здесь будут расположены ваши кроссворды</p> 
                : <p>У пользователя еще нет кроссвордов</p>}
            </>
          )}
        </div>
      </div>
      <Outlet/>
    </main>
  );
}

export {Account};