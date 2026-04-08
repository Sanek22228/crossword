import styles from "../styles/Account.module.css"
import avatarIcon from "../images/avatar.webp";
import Rating from '@mui/material/Rating';
import { useEffect, useState } from "react";
import { fetchUserCrosswords } from "../services/crosswords";
import { useAuth } from "../hook/useAuth";
import { CrosswordGrid } from "../utils/CrosswordGrid";
import { useParams } from "react-router-dom";
import {fetchUserStatistics} from "../services/users"

function Account(){
  console.log('account page');
  const [value, setValue] = useState(2);
  const {user} = useAuth();
  const [crosswords, setCrosswords] = useState(null);
  const {id} = useParams();
  const [isMyProfile, setMyProfile] = useState(id == user.id);
  const [crosswordsMade, setCrosswordsMade] = useState(0);
  const [crosswordsCompleted, setCrosswordsCompleted] = useState(0);
  // добавить loader
  useEffect(()=>{
    (async () => {
      setCrosswords(await fetchUserCrosswords(user));
      console.log("crosswords: ", crosswords);
      getUserStatistics();
      }
    )()
  },[user])
  async function getUserStatistics(){
    var data = fetchUserStatistics(user);
    setCrosswordsMade(data[0]);
    setCrosswordsCompleted(data[1]);
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
            {crosswordsMade} кроссворд{"а"} создано
          </p>
          <p>
            Рейтинг: {4.8}⭐
          </p>
          <button className={styles.editBtn}>
            Редактировать профиль
          </button>
        </div>
        <div className={styles.crosswordInfo}>
          {crosswords !== null && crosswords.map((crossword,key) => (
            <div key={key} className={styles.crosswordTable}>
              <CrosswordGrid crossword={crossword}/>
              <p>
                Название: 
                {/* Название: {crossword.name} */}
              </p>
              <p>
                Дата создания:
                {/* Дата создания: {crossword.createdAt} */}
              </p>
              <div style={{display: "flex",alignItems: "center", gap: ".5vw"}}>
                <span>
                  Сложность: 
                </span>
                <Rating name="read-only" value={value} readOnly />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export {Account};