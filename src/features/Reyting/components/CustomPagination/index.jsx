import React, { useState, useEffect, useContext } from 'react'
import { DataContext } from "@/DataContext";
import styles from './CustomPagination.module.scss'
import { Prev, PrevDark, Next, NextDark } from '@/assets'
import Image from 'next/image'

const CustomPagination = ({ activeIndex, onClick, swiper }) => {
    const [numSlides, setNumSlides] = useState(0);
    const { selectedTheme } = useContext(DataContext);
  
    useEffect(() => {
      if (swiper && swiper.slides) {
        setNumSlides(swiper.slides.length);
      }
    }, [swiper, swiper?.slides]); 
    
  
    const handleNextClick = () => {
      if (swiper) {
        swiper.slideNext();
      }
    };
  
    const handlePrevClick = () => {
      if (swiper) {
        swiper.slidePrev();
      }
    };
    return (
      <div className={styles.customPagination}>
          <button onClick={handlePrevClick}>
            {selectedTheme === "dark" ? (
              <Image src={PrevDark} alt="img" />
            ) : (
              <Image src={Prev} alt="img" />
            )}
          </button>
          <div className={styles.customPagination__inner}>
            {Array.from({ length: numSlides }, (_, index) => (
            <span
              key={index}
              className={`${styles.customPagination__bullet} ${activeIndex === index ? styles.active : ''}`}
              onClick={() => onClick(index)}
            >
              {index + 1}
            </span>
            ))}
          </div>
        <button onClick={handleNextClick}>
            {selectedTheme === "dark" ? (
              <Image src={NextDark} alt="img" />
            ) : (
              <Image src={Next} alt="img" />
            )}
        </button>
      </div>
    );
};

export default CustomPagination