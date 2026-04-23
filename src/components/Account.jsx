import styles from "../styles/Account.module.css"
import avatarIcon from "../images/avatar.webp";
// import Rating from '@mui/material/Rating';
import { useEffect, useState } from "react";
import { useAuth } from "../hook/useAuth";
import { CrosswordGrid } from "../utils/CrosswordGrid";
import { Outlet, useParams } from "react-router-dom";
import {fetchUserStatistics} from "../services/users"
import { AccountEditModal } from "./AccountEditModal";
import { ExportButtons } from "./ExportButtons";
import { deleteCrossword } from "../services/crosswords";

function Account(){
  const {user} = useAuth();
  const [crosswords, setCrosswords] = useState(null);
  const [loading, setLoading] = useState(false);
  const {id} = useParams();
  // const [isMyProfile, setMyProfile] = useState(id == user.id);
  const [crosswordsCompleted, setCrosswordsCompleted] = useState(0);
  
  const updateCrosswords = async () => {
    if(!user) return;
    const data = await fetchUserStatistics(user);
    setCrosswords(data.crosswords);
    setCrosswordsCompleted(data.completed.length);
  }
  
  // добавить loader
  useEffect(()=>{
    (async () => {
      await updateCrosswords();
    })()
  },[user]) // если без user есть шанс, что вызовется когда user = null

  async function DeleteCrossword(crosswordId){
    if(loading) return;
    setLoading(true);
    let response = await deleteCrossword(crosswordId);
    await updateCrosswords();
    setLoading(false);
  }

  return(
    <main>
      <div className={styles.accountContainer}>
        <div className={styles.accountInfo}>
          <img src={avatarIcon} alt="account picture" />
          <h2>
            {user.userName}
          </h2>
          <p>
            {crosswordsCompleted} кроссворд{"ов"} решено
          </p>
          <p>
            {crosswords?.length} кроссворд{"а"} создано
          </p>
          {/* <p>
            Рейтинг: {4.8}⭐
          </p> */}
          <AccountEditModal user={user}/>
        </div>
        <div className="crosswordInfo">
          {crosswords && crosswords.length > 0 ?
          crosswords.map((item, key) => (
                <div key={item.id || key} className={styles.crosswordTable}>
                  <CrosswordGrid crossword={item} />
                  <p>Название: {/* item.name */}</p>
                  <p>
                    Дата создания: {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                  <div className={styles.crosswordOverlay}>
                    <div className={styles.btnContainer}>
                      <ExportButtons crossword={item} />
                    </div>
                    <div className={styles.btnContainer}>
                      <button onClick={async () => await DeleteCrossword(item.id)}>delete</button>
                      <button onClick={async () => await EditCrossword(item)}>edit</button>
                    </div>
                  </div>
                </div>
              ))
            : (
            <p>У вас пока нет кроссвордов</p>
          )}
        </div>
      </div>
      <Outlet/>
    </main>
  );
}

export {Account};