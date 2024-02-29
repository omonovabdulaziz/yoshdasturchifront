import React, { useContext } from "react";
import styles from "./Welcome.module.scss";

const Welcome = ({ handleEnterClick }) => {
  return (
    <div className={styles.welcome_sec}>
      <div className={styles.welcome_inner}>
        <div className={styles.top}>
          <h2>Xush kelibsiz</h2>
          <p>
            Boshlash tugmasini bosing hamda kerakli vaqt tanlab quyida
            chiqadigan harflarni klaviaturadan kiriting. Omad!
          </p>
        </div>
        <hr />
        <div className={styles.bottom}>
          <h3>Boshlash uchun</h3>
          <span onClick={handleEnterClick}>Boshlash</span>
          <h3>tugmasini bosing</h3>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
