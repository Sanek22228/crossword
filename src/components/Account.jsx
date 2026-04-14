import styles from "../styles/Account.module.css"
import avatarIcon from "../images/avatar.webp";
import Rating from '@mui/material/Rating';
import { useEffect, useState } from "react";
import { useAuth } from "../hook/useAuth";
import { CrosswordGrid } from "../utils/CrosswordGrid";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import {fetchUserStatistics} from "../services/users"
import { AccountEditModal } from "./AccountEditModal";

function Account(){
  // const [value, setValue] = useState(2);
  const {user} = useAuth();
  const [crosswords, setCrosswords] = useState(null);
  const {id} = useParams();
  const [isMyProfile, setMyProfile] = useState(id == user.id);
  const [crosswordsCompleted, setCrosswordsCompleted] = useState(0);
  // добавить loader
  useEffect(()=>{
    (async () => {
      const data = await fetchUserStatistics(user);
      setCrosswords(data.crosswords);
      setCrosswordsCompleted(data.completed);
    })()
  },[user]) // если без user есть шанс, что вызовется когда user = null
  // var navigate = useNavigate();
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
          {crosswords !== null && 
          crosswords.length > 0 ?
          crosswords.map((crossword,key) => (
            <>
              <div key={key} className={styles.crosswordTable}>
                <CrosswordGrid crossword={crossword}/>
                <p>
                  Название: 
                  {/* Название: {crossword.name} */}
                </p>
                <p>
                  Дата создания: {new Date(crossword.createdAt).toLocaleDateString()}
                </p>
                {/* <div style={{display: "flex",alignItems: "center", gap: ".5vw"}}>
                  <span>
                    Сложность: 
                  </span>
                  <Rating name="read-only" value={value} readOnly />
                </div> */}
                <div className={`${styles.crosswordOverlay}`}></div>
              </div>
            </>
          )) 
          : <p>У вас пока нет кроссвордов</p>
          }
        </div>
      </div>
      <Outlet/>
    </main>
  );
}

export {Account};