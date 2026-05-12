import styles from "../styles/Account.module.css"
import avatarIcon from "../images/avatar.webp";
import editIcon from "../images/edit.svg";

import { useEffect, useState } from "react";
import { useAuth } from "../hook/useAuth";
import { CrosswordGrid } from "../utils/CrosswordGrid";
import { Outlet, useNavigate, useParams } from "react-router-dom";
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
      const data = await fetchUserStatistics(id);
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
          {fullMode && <AccountEditModal user={targetUser}/>}
        </div>
        <div className="crosswordInfo">
          {targetUser.crosswords && targetUser.crosswords.length > 0 ?
          targetUser.crosswords.map((item, key) => (
                <div key={item.id || key} className="crosswordTable">
                  <p >{item.name}</p>
                  <CrosswordGrid crossword={item} />
                  <div className="controls">
                      <p>
                        Дата создания: {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                      <ExportButtons crossword={item} />
                      {fullMode && 
                      <>
                        <DeleteModal crossword={item} cb={updateData}/>
                        <button onClick={async () => await EditCrossword(item)} className="controlBtn">
                          <img src={editIcon} alt="edit icon"/>
                        </button>
                      </>}
                  </div>
                </div>
              ))
            : (<>
              {fullMode 
                ? <p>У вас пока нет кроссвордов</p> 
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