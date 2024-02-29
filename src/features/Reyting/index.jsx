import React, { useState, useRef, useEffect, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { Pagination } from "antd";
import styles from "./Reyting.module.scss";
// import SwiperCore, { Pagination } from "swiper/core";
import "swiper/css/pagination";
import CustomPagination from "./components/CustomPagination";
import api, { BASE_URL } from "@/utils/api";
import axios from "axios";
import Loader from "@/Components/Loader/Loader";
import ListCard from "@/Components/ListCard";

// SwiperCore.use([Pagination]);

const Reyting = ({users}) => {
  
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cards, setCards] = useState(users.usersData);
  const [loader, setLoader] = useState(true);
  // const [users
  console.log(users);

  const [token, setToken] = useState("");

  const getCookie = (key) => {
    const cookieValue = document.cookie.match(
      `(^|;)\\s*${key}\\s*=\\s*([^;]+)`
    );
    return cookieValue ? cookieValue.pop() : null;
  };

  const handlePaginationClick = (index) => {
    if (swiper) {
      swiper.slideTo(index);
    }
  };

  // useEffect(() => {
  //   if (swiper) {
  //     updateSlidesHeight();
  //   }
  // }, [swiper]);

  // useEffect(() => {
  //   const token = getCookie("token");
  //   const lastContest = JSON.parse(sessionStorage.getItem("lastContest")) || [];
  //   if (token != null) {
  //     const fetchRating = async () => {
  //       try {
  //         setLoader(true);
  //         const response = await api.get(
  //           lastContest.status === "JARAYONDA"
  //             ? "/attemptContest/rate/1?page=0&size=100"
  //             : "/regular/getRate?limitSecond=60&page=0&size=100"
  //         );
  //         if (
  //           Array.isArray(
  //             lastContest.status === "JARAYONDA"
  //               ? response.data.attemptRateDTOS.content
  //               : response.data.regularDTOPage.content
  //           )
  //         ) {
  //           setCards(
  //             lastContest.status === "JARAYONDA"
  //               ? response.data.attemptRateDTOS.content
  //               : response.data.regularDTOPage.content
  //           );
  //         }
  //         setLoader(false);
  //       } catch (error) {
  //         if (error.response?.status == 401) {
  //           handleLogout();
  //         }
  //       }
  //     };
  //     fetchRating();
  //   } else {
  //     const fetchRating = async () => {
  //       try {
  //         setLoader(true);
  //         const response = await axios.get(
  //           lastContest.status === "JARAYONDA"
  //             ? "https://api.yoshdasturchi.uz/api/v1/attemptContest/rate/notUser/1?page=0&size=100"
  //             : "https://api.yoshdasturchi.uz/api/v1/regular/getRateNotUser?limitSecond=60&page=0&size=100"
  //         );
  //         if (
  //           Array.isArray(
  //             lastContest.status === "JARAYONDA"
  //               ? response.data.attemptRateDTOS.content
  //               : response.data.regularDTOPage.content
  //           )
  //         ) {
  //           setCards(
  //             lastContest.status === "JARAYONDA"
  //               ? response.data.attemptRateDTOS.content
  //               : response.data.regularDTOPage.content
  //           );
  //         }
  //         setLoader(false);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     fetchRating();
  //   }
  // }, []);
  // function updateSlidesHeight() {
  //   const swiperWrapper = document.querySelector('.swiper-wrapper');
  //   let maxHeight = 0;

  //   swiperWrapper.childNodes.forEach(node => {
  //     if (node.offsetHeight > maxHeight) {
  //       maxHeight = node.offsetHeight;
  //     }
  //   });

  //   swiperWrapper.style.height = maxHeight + 'px';
  // }



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
  const onPaginationsChange =async (page, pageSize)=>{
    const status =getCookie("status")
    if(token){
      if(status === "JARAYONDA") {
        let users1 = await axios
        .get(`${BASE_URL}attemptContest/rate/1?page=0&size=10`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
         } )
         .then((res) => res.data);
        setCards(users1.attemptRateDTOS.content)
      }
      else {
        let users1 = await axios
        .get(`${BASE_URL}regular/getRate?limitSecond=60&page=0&size=10`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
         })
         .then((res) => res.data);
        setCards(users1.regularDTOPage.content)
      }  
    }else {
      if(status === "JARAYONDA") {
        let users1 = await axios
        .get(`${BASE_URL}attemptContest/rate/notUser/1?page=${page}&size=10`)
        .then((res) => res.data);
        setCards(users1.attemptRateDTOS.content)
      }
      else {
        let users1 = await axios
        .get(`${BASE_URL}regular/getRateNotUser?limitSecond=60&page=${page}&size=10`)
        .then((res) => res.data);
        setCards(users1.regularDTOPage.content)
      }  
    }
  }

  if(typeof window === undefined) return null
  // console.log(cards,)

  return (
    <>
      <div className={styles.reyting}>
        <div className="container">
          <div className={styles.reyting__inner}>
            <div className={styles.reyting__top}>
              <h2 className={styles.reyting__title}>Reyting</h2>
              <p className={styles.reyting__timeupdate}>
                Next update in : 6:50
              </p>
            </div>
            {/* {loader && <Loader />} */}
            <Swiper
              pagination={{
                el: ".swiper-pagination",
                clickable: true,
                renderBullet: function (index, className) {
                  return (
                    '<span class="' + className + '">' + (index + 1) + "</span>"
                  );
                },
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              className={styles.swiper}
              onSwiper={(swiper) => setSwiper(swiper)}
              spaceBetween={50}>
                <div className={styles.reyting__table_top}>
                        <div className={styles.reyting__content1}>
                          <span className={styles.reyting__number}>#</span>
                          <p className={styles.reyting__name}>Ism</p>
                        </div>
                        <div className={styles.reyting__content3}>
                          <p className={styles.reyting__right}>To’g’ri</p>
                          <p className={styles.reyting__wrong}>Xato</p>
                        </div>
                        <div className={styles.reyting__content2}>
                          <p className={styles.reyting__date}>Sana</p>
                          <p className={styles.reyting__viloyat}>Viloyat</p>
                        </div>
                </div>
            {cards?.map((el, idx)=>(
             <ListCard data={el} idx={idx}/>
            ))}
            </Swiper>
            {/* <CustomPagination
              activeIndex={activeIndex}
              onClick={handlePaginationClick}
              swiper={swiper}
            /> */}
            <Pagination onChange={onPaginationsChange} defaultCurrent={1} total={13} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Reyting;
