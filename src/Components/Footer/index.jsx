import React, { useEffect, useState, useContext } from "react";
import styles from "./Footer.module.scss";
import Instagram from "../../assets/Instagram - Negative.svg";
import Youtube from "../../assets/youtube.svg";
import Telegram from "../../assets/Telegram - Negative.svg";
import Bot from "../../assets/bot.svg";
import Image from "next/image";
import { DataContext } from "@/DataContext";
import {
  TelegramDark,
  InstagramDark,
  BotDarkMode,
  YoutubeDarkMode,
} from "@/assets";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();
  const [isFooterHas, setIsFooterHas] = useState(true);
  const [isFooterHasMargin, setIsFooterHasMargin] = useState(true);

  const { selectedTheme } = useContext(DataContext);

  useEffect(() => {
    if (
      router.pathname == "/register" ||
      router.pathname == "/login" ||
      router.pathname.includes("/admin")
    ) {
      setIsFooterHas(false);
    } else {
      setIsFooterHas(true);
    }

    if (router.pathname === "/") {
      setIsFooterHasMargin(false);
    } else {
      setIsFooterHasMargin(true);
    }
  }, [router.pathname]);
  return (
    <>
      {isFooterHas ? (
        <div
          className={
            isFooterHasMargin ? styles.footer_margin_no : styles.footer
          }>
          <div className="container">
            <div className={styles.footer__inner}>
              <div className={styles.footer__name}>
                <h2>Developed by </h2>{" "}
                <a target="_blank" href="https://t.me/alicoderuz">
                  AliCoder
                </a>
              </div>

              <div className={styles.footer__socials}>
                {selectedTheme === "dark" ? (
                  <>
                    <a
                      target="_blank"
                      href="https://www.instagram.com/yoshdasturchiuz/">
                      <Image src={InstagramDark} alt="Instagram" />
                    </a>
                    <a target="_blank" href="https://t.me/yoshdasturchi_uzb">
                      <Image src={TelegramDark} alt="Telegram" />
                    </a>
                    <a
                      target="_blank"
                      href="https://www.youtube.com/@yoshdasturchi_uz">
                      <Image src={YoutubeDarkMode} alt="Youtube" />
                    </a>
                    <a target="_blank" href="https://t.me/yoshdasturchiuz_bot">
                      <Image src={BotDarkMode} alt="Bot" />
                    </a>
                  </>
                ) : (
                  <>
                    <a
                      target="_blank"
                      href="https://www.instagram.com/yoshdasturchiuz/">
                      <Image src={Instagram} alt="Instagram" />
                    </a>
                    <a target="_blank" href="https://t.me/yoshdasturchi_uzb">
                      <Image src={Telegram} alt="Telegram" />
                    </a>
                    <a
                      target="_blank"
                      href="https://www.youtube.com/@yoshdasturchi_uz">
                      <Image src={Youtube} alt="Youtube" />
                    </a>
                    <a target="_blank" href="https://t.me/yoshdasturchiuz_bot">
                      <Image src={Bot} alt="Bot" />
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Footer;
