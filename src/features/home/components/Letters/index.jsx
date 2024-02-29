import React, { useEffect, useState } from "react";
import styles from "./Letters.module.scss";

const Letters = ({ data }) => {
  const [isLetterTrue, setIsLetterTrue] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const pressedKey = e.key.toUpperCase();
      setIsLetterTrue(pressedKey === data[3].letter);
    };

    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [data]);

  return (
    <div className={styles.letter_sec}>
      <div className={styles.letter_inner}>
        {data.map((item, idx) => (
          <div
            key={idx}
            className={idx === 3 ? styles.letterActive : styles.letter}
            style={{ paddingLeft: item.position.x + "%" }}>
            <span
              className={`${styles.trueLetter} ${
                isLetterTrue ? "" : styles.falseLetter
              }`}>
              {item.letter}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Letters;
