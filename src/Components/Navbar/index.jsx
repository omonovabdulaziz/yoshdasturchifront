/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useState, useEffect, useContext, useMemo } from "react";
import Image from "next/image";
import Logo from "../../assets/navbarLogo.png";
import Setting from "../../assets/setting.svg";
import User from "../../assets/user.svg";
import Exit from "../../assets/exit.svg";
import styles from "./Navbar.module.scss";
import Timer from "../Timer/index";
import Switch from "react-switch";
import DarkMode from "../DarkMode/index";
import Link from "next/link";
import {
  SeeMore,
  SeeMoreDark,
  Cup,
  CupDarkMode,
  UserImageDark,
  SettingImageDark,
  DarkKeyboard,
} from "@/assets";
import { DataContext } from "@/DataContext";
import api from "@/utils/api";
import { useRouter } from "next/router";
import axios from "axios";
import dynamic from "next/dynamic";
import Loader from "../Loader/Loader";

const Navbar = () => {
  const {
    setisKeyboardTrueChecked,
    setisKeyboardFalseChecked,
    isKeyboardFalseChecked,
    isKeyboardTrueChecked,
    isHandSignChecked,
    setIsHandSignChecked,
    setHandSignOpen,
    selectedColor,
    setSelectedColor,
    setSelectedTheme,
    selectedTheme,
    time
  } = useContext(DataContext);
  const [isOpenUser, setIsOpenUser] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isReytingOpen, setIsReytingOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [loader, setLoader] = useState(true);
  const [isNavbarHas, setIsNavbarHas] = useState(true);
  const router = useRouter();
  const [token, setToken] = useState("");

  const getCookie = (key) => {
    const cookieValue = document.cookie.match(
      `(^|;)\\s*${key}\\s*=\\s*([^;]+)`
    );
    return cookieValue ? cookieValue.pop() : null;
  };


  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/login";
  };

  useEffect(() => {
    const token = getCookie("token");

    setToken(token);
    if (
      router.pathname == "/register" ||
      router.pathname == "/login" ||
      router.pathname.includes("/admin")
    ) {
      setIsNavbarHas(false);
    } else {
      setIsNavbarHas(true);
    }
  }, [router.pathname]);

  useEffect(() => {
    const fetchContest = async () => {
      try {
        const response = await api.get("/contest/getLastContest");
        sessionStorage.setItem("lastContest", JSON.stringify(response.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchContest();
  }, []);

  useEffect(() => {
    const token = getCookie("token");
    const lastContest = JSON.parse(sessionStorage.getItem("lastContest")) || [];
    if (token != null) {
      const fetchRating = async () => {
        try {
          setLoader(true);
          const response = await api.get(
            lastContest.status === "JARAYONDA"
              ? "/attemptContest/rate/1?page=0&size=100"
              : "/regular/getRate?limitSecond=60&page=0&size=100"
          );
          if (
            Array.isArray(
              lastContest.status === "JARAYONDA"
                ? response.data.attemptRateDTOS.content
                : response.data.regularDTOPage.content
            )
          ) {
            setCards(
              lastContest.status === "JARAYONDA"
                ? response.data.attemptRateDTOS.content
                : response.data.regularDTOPage.content
            );
          }
          setLoader(false);
        } catch (error) {
          if (error.response?.status == 401) {
            handleLogout();
          }
          setLoader(false);
        }
      };
      fetchRating();
    } else {
      const fetchRating = async () => {
        try {
          setLoader(true);
          const response = await axios.get(
            lastContest.status === "JARAYONDA"
              ? "https://api.yoshdasturchi.uz/api/v1/attemptContest/rate/notUser/1?page=0&size=100"
              : "https://api.yoshdasturchi.uz/api/v1/regular/getRateNotUser?limitSecond=60&page=0&size=100"
          );
          if (
            Array.isArray(
              lastContest.status === "JARAYONDA"
                ? response.data.attemptRateDTOS.content
                : response.data.regularDTOPage.content
            )
          ) {
            setCards(
              lastContest.status === "JARAYONDA"
                ? response.data.attemptRateDTOS.content
                : response.data.regularDTOPage.content
            );
          }
          setLoader(false);
        } catch (error) {
          console.log(error);
        }
      };
      fetchRating();
    }
  }, []);

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const handleHandSignChange = () => {
    setIsHandSignChecked(!isHandSignChecked);

    if (isHandSignChecked == true) {
      setHandSignOpen(false);
    } else {
      setHandSignOpen(true);
    }
  };

  const toggleDropdownUser = () => {
    setIsSettingsOpen(false);
    setIsReytingOpen(false);
    setIsOpenUser(!isOpenUser);
  };

  const toggleDropdownReyting = () => {
    setIsSettingsOpen(false);
    setIsOpenUser(false);
    setIsReytingOpen(!isReytingOpen);
  };

  const toggleDropdownSettings = () => {
    setIsOpenUser(false);
    setIsReytingOpen(false);
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleDropdown = () => {
    setIsOpenUser(false);
    setIsSettingsOpen(false);
    setIsReytingOpen(false);
  };

  const toggleCloseDrops = () => {
    setIsSettingsOpen(false);
    setIsOpenUser(false);
    setIsReytingOpen(false);
    window.location.href = "/reyting";
  };

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

  const ContestDate = dynamic(() => import("../../Components/ContestDate"));

  const startTime = useMemo(()=> {
    return time
  },[time])

  return (
    <>
      {isNavbarHas && (
        <>
          <div className={styles.navbar}>
            <div className="container">
              <div className={styles.navbar__inner}>
                <div>
                  <a
                    href="/"
                    className={styles.navbar__logo}
                    onClick={() => (window.location.href = "/")}>
                    {selectedTheme === "dark" ? (
                      <Image src={DarkKeyboard} alt="img" />
                    ) : (
                      <Image src={Logo} alt="img" />
                    )}
                    <h2>Klaviatura trenajori</h2>
                  </a>
                </div>
                <div className={styles.navbar__settings}>
                  <div className={styles.navbar__reyting}>
                    <button onClick={toggleDropdownReyting}>
                      {selectedTheme === "dark" ? (
                        <Image src={CupDarkMode} alt="img" />
                      ) : (
                        <Image src={Cup} alt="img" />
                      )}
                      <p>Reyting</p>
                    </button>

                    <div
                      className={
                        isReytingOpen
                          ? `${styles.reytingdropdown} ${styles.open}`
                          : styles.reytingdropdown
                      }>
                      <div className={styles.reytingdropdown__top}>
                        <h2 className={styles.reytingdropdown__title}>
                          Reyting
                        </h2>
                        <p className={styles.reytingdropdown__timeupdate}>
                          Next update in : 6:50
                        </p>
                      </div>

                      <div className={styles.reytingdropdown__table}>
                        <div className={styles.reytingdropdown__table_top}>
                          <div className={styles.reytingdropdown__content2}>
                            <span className={styles.reytingdropdown__number}>
                              #
                            </span>
                            <p className={styles.reytingdropdown__name}>Ism</p>
                          </div>
                          <div className={styles.reytingdropdown__content1}>
                            <p className={styles.reytingdropdown__right}>
                              To’g’ri
                            </p>
                            <p className={styles.reytingdropdown__wrong}>
                              Xato
                            </p>
                          </div>
                          <p className={styles.reytingdropdown__date}>Sana</p>
                        </div>
                        {loader && <Loader />}
                        {cards.slice(0, 10).map((card, index) => (
                          <div
                            key={index}
                            className={styles.reytingdropdown__userreyt}>
                            <div className={styles.reytingdropdown__content2}>
                              <span className={styles.reytingdropdown__number}>
                                {index + 1}
                              </span>
                              <p className={styles.reytingdropdown__profile}>
                                <div
                                  className={
                                    styles.reytingdropdown__profileimage
                                  }></div>
                                {card.user.name}
                              </p>
                            </div>
                            <div className={styles.reytingdropdown__content1}>
                              <p className={styles.reytingdropdown__rightuser}>
                                {card.trueLetterCount}
                              </p>
                              <p className={styles.reytingdropdown__wronguser}>
                                {card.falseLetterCount}
                              </p>
                            </div>
                            <p className={styles.reytingdropdown__dateuser}>
                              {getDate(card.startAt)}
                              <span>{getTime(card.startAt)}</span>
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className={styles.reytingdropdown__bottom}>
                        <div className={styles.reytingdropdown__seemore}>
                          <Link href="/reyting" onClick={toggleCloseDrops}>
                            Ko’proq ko’rish
                          </Link>
                          {selectedTheme === "dark" ? (
                            <Image src={SeeMoreDark} alt="img" />
                          ) : (
                            <Image src={SeeMore} alt="img" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.ContestDate}>
                    <ContestDate isHaveNavbar={true} />
                  </div>
                  <Timer selectedTheme={selectedTheme} startTime={startTime}/>
                  <div className={styles.navbar__setting}>
                    <button onClick={toggleDropdownSettings}>
                      {selectedTheme === "dark" ? (
                        <Image src={SettingImageDark} alt="img" />
                      ) : (
                        <Image src={Setting} alt="img" />
                      )}
                    </button>
                    <div
                      className={
                        isSettingsOpen
                          ? `${styles.dropdownSettings} ${styles.open}`
                          : styles.dropdownSettings
                      }>
                      <h3>Sozlamalar</h3>
                      <div className={styles.settings}>
                        <DarkMode setSelectedTheme={setSelectedTheme} />
                        <div className={styles.setting}>
                          <h4>Qo’l belgisi</h4>
                          <Switch
                            checked={isHandSignChecked}
                            onChange={handleHandSignChange}
                            onColor="#86d3ff"
                            onHandleColor="#2693e6"
                            handleDiameter={30}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                            height={20}
                            width={48}
                            className="react-switch"
                            id="material-switch"
                          />
                        </div>

                        <div className={styles.setting}>
                          <h4>Klaviatura {`to\'gri`} ovozi</h4>
                          <Switch
                            checked={isKeyboardTrueChecked}
                            onChange={() =>
                              setisKeyboardTrueChecked(!isKeyboardTrueChecked)
                            }
                            onColor="#86d3ff"
                            onHandleColor="#2693e6"
                            handleDiameter={30}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                            height={20}
                            width={48}
                            className="react-switch"
                            id="material-switch"
                          />
                        </div>
                        <div className={styles.setting}>
                          <h4>Klaviatura {`noto\'gri`} ovozi</h4>
                          <Switch
                            checked={isKeyboardFalseChecked}
                            onChange={() =>
                              setisKeyboardFalseChecked(!isKeyboardFalseChecked)
                            }
                            onColor="#86d3ff"
                            onHandleColor="#2693e6"
                            handleDiameter={30}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                            height={20}
                            width={48}
                            className="react-switch"
                            id="material-switch"
                          />
                        </div>
                        <div className={styles.setting}>
                          <h4>Klaviatura rangi</h4>
                          <div className={styles.setting__colors}>
                            <div
                              className={`${styles.setting__color1} ${
                                selectedColor == "grey" ? styles.active : ""
                              }`}
                              onClick={() => handleColorClick("grey")}>
                              <div></div>
                            </div>
                            <div
                              className={`${styles.setting__color2} ${
                                selectedColor == "blue" ? styles.active : ""
                              }`}
                              onClick={() => handleColorClick("blue")}>
                              <div></div>
                            </div>
                            <div
                              className={`${styles.setting__color3} ${
                                selectedColor == "green" ? styles.active : ""
                              }`}
                              onClick={() => handleColorClick("green")}>
                              <div></div>
                            </div>
                            <div
                              className={`${styles.setting__color4} ${
                                selectedColor == "yellow" ? styles.active : ""
                              }`}
                              onClick={() => handleColorClick("yellow")}>
                              <div></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.navbar__user}>
                    <button onClick={toggleDropdownUser}>
                      {selectedTheme === "dark" ? (
                        <Image src={UserImageDark} alt="img" />
                      ) : (
                        <Image src={User} alt="img" />
                      )}
                    </button>

                    <div
                      className={
                        isOpenUser
                          ? `${styles.dropdownuser} ${styles.open}`
                          : styles.dropdownuser
                      }>
                      {token ? (
                        <>
                          <li>
                            <Link
                              href="/profileEdit"
                              onClick={() =>
                                (window.location.href = "/profileEdit")
                              }>
                              O’zgartirish
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/results"
                              onClick={() =>
                                (window.location.href = "/results")
                              }>
                              Natijalar
                            </Link>
                          </li>
                          <li onClick={handleLogout}>
                            Chiqish
                            <Image src={Exit} alt="img" />
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <Link
                              href="/login"
                              onClick={() => (window.location.href = "/login")}>
                              Kirish
                            </Link>
                          </li>
                          <li style={{ whiteSpace: "nowrap" }}>
                            <Link
                              href="/register"
                              onClick={() =>
                                (window.location.href = "/register")
                              }>{`Ro\'yxatdan o\'tish`}</Link>
                          </li>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            onClick={handleDropdown}
            className={
              isOpenUser
                ? `${styles.rectangle} ${styles.open}`
                : styles.rectangle && isSettingsOpen
                ? `${styles.rectangle} ${styles.open}`
                : styles.rectangle && isReytingOpen
                ? `${styles.rectangle} ${styles.open}`
                : styles.rectangle
            }></div>
        </>
      )}
    </>
  );
};

export default Navbar;
