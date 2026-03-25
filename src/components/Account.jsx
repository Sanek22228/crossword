import styles from "../styles/Account.module.css"
import avatarIcon from "../images/avatar.webp";
import Rating from '@mui/material/Rating';
import { useState } from "react";
function Account(){
  console.log('account page');
  const [value, setValue] = useState(2);
  return(
    <main>
      <div className={styles.accountContainer}>
        <div className={styles.accountInfo}>
          <img src={avatarIcon} alt="account picture" />
          <h2>
              {"Username"}
          </h2>
          <p>
            {25} кроссворд{"ов"} решено
          </p>
          <p>
            {2} кроссворд{"а"} создано
          </p>
          <p>
            Рейтинг: {4.8}⭐
          </p>
          <button className={styles.editBtn}>
            Редактировать профиль
          </button>
        </div>
        <div className={styles.crosswordInfo}>
          <div className={styles.crosswordTable}>
            <table>

            </table>
            <p>
              Название:
            </p>
            <p>
              Дата создания: 05/05/2026
            </p>
            <div style={{display: "flex",alignItems: "center", gap: ".5vw"}}>
              <span>
                Сложность: 
              </span>
              <Rating name="read-only" value={value} readOnly />
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}

export {Account};