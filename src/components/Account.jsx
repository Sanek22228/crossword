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

function Account(){
  const {user} = useAuth();
  const [crosswords, setCrosswords] = useState(null);
  const {id} = useParams();
  // const [isMyProfile, setMyProfile] = useState(id == user.id);
  const [crosswordsCompleted, setCrosswordsCompleted] = useState(0);
  
  // добавить loader
  useEffect(()=>{
    (async () => {
      const data = await fetchUserStatistics(user);
      setCrosswords(data.crosswords);
      setCrosswordsCompleted(data.completed);
    })()
  },[user]) // если без user есть шанс, что вызовется когда user = null

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
        <div className={styles.crosswordInfo}>
          {crosswords && crosswords.length > 0 ?
          crosswords.map((item, key) => (
                <div key={item.id || key} className={styles.crosswordTable}>
                  <CrosswordGrid crossword={item} />
                  <p>Название: {/* item.name */}</p>
                  <p>
                    Дата создания: {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                  <div className={styles.crosswordOverlay}>
                    <ExportButtons crossword={item} />
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