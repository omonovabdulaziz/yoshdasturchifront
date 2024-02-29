import React, { useState } from "react";
import styles from "./Ads.module.scss";
import Image from "next/image";
import { ArrowRight } from "@/assets";

const Ads = ({ isAdsShow, isRight }) => {
  const [imageWidths, setImageWidths] = useState([300, 300, 300]);

  const handleSpanClick = (index) => {
    setImageWidths((prevWidths) =>
      prevWidths.map((width, i) =>
        i === index ? (width === 300 ? 100 : 300) : width
      )
    );
  };


  return (
    <div className={styles.ads_sec}>
      {isAdsShow ? (
        <div className={isRight ? styles.ads_inner : styles.ads_inner_left}>
          {[0].map((index) => (
            <div
              key={index}
              className={styles.ads_card}
              width={imageWidths[index]}>
              <a
                blank
                href="https://www.youtube.com/watch?v=V1PyfsaPnLo"
                target="_blank"
                rel="noopener noreferrer">
                {/* <Image
                  src="https://img.youtube.com/vi/V1PyfsaPnLo/maxresdefault.jpg"
                  width={imageWidths[index]}
                  height={160}

                  alt="Video Preview"
                /> */}
              </a>
              <span
                className={isRight ? styles.right : styles.left}
                onClick={() => handleSpanClick(index)}>
                <Image alt="Video Preview" src={ArrowRight} />
              </span>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Ads;
