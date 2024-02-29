import React from "react";
import styles from "./ListCard.module.css";

const ListCard = ({ data, idx }) => {
  // console.log(data?.user?.name);
  const getDate = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return dateTime.toLocaleDateString("en-US", options);
  };

  const getTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const options = { hour: "numeric", minute: "numeric" };
    return dateTime.toLocaleTimeString("en-US", options);
  };
  return (
    <>
      <div className={styles.reyting__table}>
        <div
          key={idx}
          className={`${styles.reyting__userreyt} ${
            idx % 2 === 0 ? styles.active : ""
          }`}>
          <div className={styles.reyting__content1}>
            <span className={styles.reyting__number}>{idx + 1}</span>
            <p className={styles.reyting__profile}>
              <img className={styles.reyting__profileimage} />
              {data.user.name}
            </p>
          </div>
          <div className={styles.reyting__content3}>
            <p className={styles.reyting__rightuser}>{data.trueLetterCount}</p>
            <p className={styles.reyting__wronguser}>{data.falseLetterCount}</p>
          </div>
          <div className={styles.reyting__content2}>
            <p className={styles.reyting__dateuser}>
              {getDate(data.startAt)}
              <span>{getTime(data.startAt)}</span>
            </p>
            <p className={styles.reyting__viloyatuser}>{data.user.region}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListCard;
