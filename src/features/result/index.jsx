import React, { useContext, useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import styles from "./Result.module.scss";
import { DataContext } from "@/DataContext";
import { useRouter } from "next/router";
import api from "@/utils/api";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import SwiperCore from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import axios from "axios";
import Loader from "@/Components/Loader/Loader";
import { testProsses } from "@/constants";

// Initialize Swiper core components
SwiperCore.use([Navigation, Pagination, Autoplay]);

const Result = () => {
  const { result, time, setStartTime } = useContext(DataContext);
  const [data, setData] = useState(
    JSON.parse(sessionStorage.getItem("sessionData")) || []
  );
  const [data1, setData1] = useState([]);
  const [data0, setData0] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [token, setToken] = useState("");

  const sendMessageToTheBot = async (message) => {
    const token = "5809269513:AAHVkBrRpDj7VEWl2NvI46IRZA2DH75HXJI";
    const chatId = "700727696";
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    try {
      const response = await axios.post(url, {
        chat_id: chatId,
        text: message,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await api.get("/user/getSelfInformation");
        if (res.status == 200) {
          const userData = res.data;
          sendMessageToTheBot(
            `${userData.name} klaviaturada 60 sekund vaqt davomida, ${data1.length} ta to'g'ri va ${data0.length} ta xato bajardi`
          );
          setUserInfo(userData);
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (typeof window !== "undefined") {
      getUserInfo();
    }
  }, [data1, data0]);

  useEffect(() => {
    setStartTime(false)
    const getCookie = (key) => {
      const cookieValue = document.cookie.match(
        `(^|;)\\s*${key}\\s*=\\s*([^;]+)`
      );
      return cookieValue ? cookieValue.pop() : null;
    };

    const token = getCookie("token");
    setToken(token);
  }, []);

  useEffect(() => {
    const newData1 = result.filter((point) => point === 1);
    const newData0 = result.filter((point) => point === 0);
    setData1(newData1);
    setData0(newData0);
  }, [result]);

  useEffect(() => {
      const lastContest = JSON.parse(sessionStorage.getItem("lastContest"));
      const getCurrentDateTime = () => {
        const currentDateTime = new Date();
        const year = currentDateTime.getFullYear();
        const month = String(currentDateTime.getMonth() + 1).padStart(2, "0");
        const day = String(currentDateTime.getDate()).padStart(2, "0");
        const hours = String(currentDateTime.getHours()).padStart(2, "0");
        const minutes = String(currentDateTime.getMinutes()).padStart(2, "0");
        const seconds = String(currentDateTime.getSeconds()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      };

      const startAt = getCurrentDateTime();
      const endAt = new Date(new Date().getTime() + 60000);
      const formattedEndAt = `${endAt.getFullYear()}-${String(
        endAt.getMonth() + 1
      ).padStart(2, "0")}-${String(endAt.getDate()).padStart(2, "0")} ${String(
        endAt.getHours()
      ).padStart(2, "0")}:${String(endAt.getMinutes()).padStart(
        2,
        "0"
      )}:${String(endAt.getSeconds()).padStart(2, "0")}`;

      const postData = async () => {
        const requestData = {
          trueLetterCount: data1.length,
          falseLetterCount: data0.length,
          startAt: startAt,
          endAt: formattedEndAt,
        };
        console.log(requestData);

        if (
          requestData.trueLetterCount > 0 ||
          requestData.falseLetterCount > 0
        ) {
          try {
            const response = await api.post(
              lastContest.status === "JARAYONDA"
                ? "/attemptContest/add"
                : "/regular/add",
              lastContest.status === "JARAYONDA"
                ? { ...requestData, contestId: lastContest.id }
                : { ...requestData, limitSecondRegular: 60 }
            );
            console.log(lastContest);
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
        } else {
          return false;
        }
      };

      postData();
  }, [data1, data0]);

  useEffect(() => {
    const sessionData = JSON.parse(sessionStorage.getItem("sessionData")) || [];
    setData(sessionData);
    if (result.length === 0) {
      window.location.href = "/";
    } else {
      calculateStatistics();
    }
  }, [data1, data0]);

  const calculateStatistics = () => {
    const newData = {
      name: data.length + 1,
      harflar: data1.length,
    };

    const sessionData = JSON.parse(sessionStorage.getItem("sessionData")) || [];

    if (
      sessionData.some(
        (item) => item.name === newData.name && item.harflar === newData.harflar
      )
    ) {
      return;
    }

    const filteredData = sessionData.filter((item) => !(item.harflar === 0));
    const mergedData = [...filteredData, newData];
    setData(mergedData);
    sessionStorage.setItem("sessionData", JSON.stringify(mergedData));
  };

  return (
    <div className={styles.result_sec}>
      <div className="container">
        <div className={styles.result_inner}>
          <div className={styles.top}>
            <div className={styles.left_side}>
              <div className={styles.result}>
                <p>{`To'g'ri`}</p>
                <h2>{data1.length}</h2>
              </div>
              <div className={styles.result}>
                <p>Xato</p>
                <h2>{data0.length}</h2>
              </div>
            </div>
            <div className={styles.right_side}>
              <AreaChart
                width={800}
                height={400}
                data={[{ name: 1, harflar: 0 }, ...data]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 90]} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="harflar"
                  stroke="rgba(0, 71, 255, 1)"
                  fill="rgba(0, 71, 255, 1)"
                />
              </AreaChart>
            </div>
          </div>
          <div className={styles.bottom}>
            {token ? (
              ""
            ) : (
              <h4>
                Natijangizni saqlab qolish uchun{" "}
                <Link
                  href="/register"
                  onClick={() => window.location.href("/register")}>
                  RO’YXATDAN O’TING
                </Link>
              </h4>
            )}
            <Swiper
              className={styles.swiperContainer}
              spaceBetween={20}
              slidesPerView={3}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              loop={true}
              pagination={{
                el: ".swiper-pagination",
                clickable: true,
                renderBullet: function (index, className) {
                  return (
                    '<span class="' + className + '">' + (index + 1) + "</span>"
                  );
                },
              }}
              scrollbar={{ draggable: true }}
              autoplay={{ delay: 2400, disableOnInteraction: false }}
              breakpoints={{
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                100: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
              }}
              modules={[Navigation, Pagination, Autoplay]}>
              {[1, 2, 3, 4].map((item) => (
                <SwiperSlide key={item} className={styles.swiperSlide}>
                  <a
                    blank
                    href="https://www.youtube.com/watch?v=V1PyfsaPnLo"
                    target="_blank"
                    rel="noopener noreferrer">
                    <Image
                      src="https://img.youtube.com/vi/V1PyfsaPnLo/maxresdefault.jpg"
                      width={270}
                      height={160}
                      alt="Video Preview"
                    />
                  </a>
                </SwiperSlide>
              ))}
              <div className="swiper-buttons-container">
                <div className="swiper-buttons">
                  <div className="swiper-button-next"></div>
                  <div className="swiper-pagination"></div>
                  <div className="swiper-button-prev"></div>
                </div>
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
