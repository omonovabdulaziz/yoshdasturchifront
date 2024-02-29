import React, { useContext, useEffect } from "react";
import styles from "./Keyboard.module.scss";
import Image from "next/image";
import {
  LeftBottomRow1,
  LeftBottomRow2,
  LeftBottomRow3,
  LeftBottomRow5,
  LeftHomeRow1,
  LeftHomeRow2,
  LeftHomeRow3,
  LeftHomeRow4,
  LeftHomeRow5,
  LeftRestingHand,
  LeftTopRow1,
  LeftTopRow2,
  LeftTopRow3,
  LeftTopRow4,
  RightBottomRow1,
  RightBottomRow2,
  RightBottomRow3,
  RightHomeRow1,
  RightHomeRow2,
  RightHomeRow3,
  RightHomeRow4,
  RightHomeRow7,
  RightRestingHand,
  RightTopRow1,
  RightTopRow2,
  RightTopRow3,
  RightTopRow4,
  RightTopRow5,
} from "@/assets";
import { DataContext } from "@/DataContext";

const Keyboard = ({ letter, setKey }) => {
  const { handSignOpen, selectedColor, hiddenInputRef } =
    useContext(DataContext);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        const dataEnter = document.querySelector(`[data-char=ENTER]`);
        dataEnter.classList.add("enterClick");
        const pressedKey = e.key.toUpperCase();
        setKey(pressedKey);

        const dataKey = document.querySelectorAll("[data-char]");
        dataKey.forEach((letter) => {
          letter.classList.remove("active");
        });

        if (dataKey.length > 0) {
          const pressedKeyElement = document.querySelector(
            `[data-char="${pressedKey}"]`
          );
          if (pressedKeyElement !== null) {
            pressedKeyElement.classList.add("inActive");
            setTimeout(() => {
              pressedKeyElement.classList.remove("inActive");
            }, 200);
          } 
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <input
        ref={hiddenInputRef}
        type="text"
        style={{ position: "absolute", top: "-9999px" }}
      />
      <div className={`${styles.keyboard} container`}>
        <div
          className={`${
            selectedColor === "grey"
              ? "grey"
              : selectedColor === "blue"
              ? "blue"
              : selectedColor === "green"
              ? "green"
              : "yellow"
          } keyboard`}>
          <div className="keyboard__row">
            <div className="key--double" data-char="`">
              <div>~</div>
              <div>`</div>
            </div>
            <div className="key--double" data-char="1">
              <div>!</div>
              <div>1</div>
            </div>
            <div className="key--double" data-char="2">
              <div>@</div>
              <div>2</div>
            </div>
            <div className="key--double" data-char="3">
              <div>#</div>
              <div>3</div>
            </div>
            <div className="key--double" data-char="4">
              <div>$</div>
              <div>4</div>
            </div>
            <div className="key--double" data-char="5">
              <div>%</div>
              <div>5</div>
            </div>
            <div className="key--double" data-char="6">
              <div>^</div>
              <div>6</div>
            </div>
            <div className="key--double" data-char="7">
              <div>&amp;</div>
              <div>7</div>
            </div>
            <div className="key--double" data-char="8">
              <div>*</div>
              <div>8</div>
            </div>
            <div className="key--double" data-char="9">
              <div>(</div>
              <div>9</div>
            </div>
            <div className="key--double" data-char="0">
              <div>)</div>
              <div>0</div>
            </div>
            <div className="key--double" data-char="-">
              <div>_</div>
              <div>-</div>
            </div>
            <div className="key--double" data-char="=">
              <div>+</div>
              <div>=</div>
            </div>
            <div
              className="key--bottom-right key--word key--w4"
              data-char="BACKSPACE">
              <span>delete</span>
            </div>
          </div>
          <div className="keyboard__row">
            <div className="key--bottom-left key--word key--w4" data-char="TAB">
              <span>tab</span>
            </div>
            <div className="key--letter" data-char="Q">
              Q
            </div>
            <div className="key--letter" data-char="W">
              W
            </div>
            <div className="key--letter" data-char="E">
              E
            </div>
            <div className="key--letter" data-char="R">
              R
            </div>
            <div className="key--letter" data-char="T">
              T
            </div>
            <div className="key--letter" data-char="Y">
              Y
            </div>
            <div className="key--letter" data-char="U">
              U
            </div>
            <div className="key--letter" data-char="I">
              I
            </div>
            <div className="key--letter" data-char="O">
              O
            </div>
            <div className="key--letter" data-char="P">
              P
            </div>
            <div className="key--double" data-char="[">
              <div>{"{"}</div>
              <div>[</div>
            </div>
            <div className="key--double" data-char="]">
              <div>{"}"}</div>
              <div>]</div>
            </div>
            <div className="key--double" data-char="\">
              <div>|</div>
              <div>\</div>
            </div>
          </div>
          <div className="keyboard__row">
            <div
              className="key--bottom-left key--word key--w5"
              data-char="CAPSLOCK">
              <span>caps lock</span>
            </div>
            <div className="key--letter" data-char="A">
              A
            </div>
            <div className="key--letter" data-char="S">
              S
            </div>
            <div className="key--letter" data-char="D">
              D
            </div>
            <div className="key--letter" data-char="F">
              F
            </div>
            <div className="key--letter" data-char="G">
              G
            </div>
            <div className="key--letter" data-char="H">
              H
            </div>
            <div className="key--letter" data-char="J">
              J
            </div>
            <div className="key--letter" data-char="K">
              K
            </div>
            <div className="key--letter" data-char="L">
              L
            </div>
            <div className="key--double" data-char=";">
              <div>:</div>
              <div>;</div>
            </div>
            <div className="key--double" data-char="'">
              <div>{`"`}</div>
              <div>{`'`}</div>
            </div>
            <div
              className="key--bottom-right key--word key--w5"
              data-char="ENTER">
              <span>Enter</span>
            </div>
          </div>
          <div className="keyboard__row">
            <div
              className="key--bottom-left key--word key--w6"
              data-char="SHIFT">
              <span>Shift</span>
            </div>
            <div className="key--letter" data-char="Z">
              Z
            </div>
            <div className="key--letter" data-char="X">
              X
            </div>
            <div className="key--letter" data-char="C">
              C
            </div>
            <div className="key--letter" data-char="V">
              V
            </div>
            <div className="key--letter" data-char="B">
              B
            </div>
            <div className="key--letter" data-char="N">
              N
            </div>
            <div className="key--letter" data-char="M">
              M
            </div>
            <div className="key--double" data-char=",">
              <div>&lt;</div>
              <div>,</div>
            </div>
            <div className="key--double" data-char=".">
              <div>&gt;</div>
              <div>.</div>
            </div>
            <div className="key--double" data-char="/">
              <div data-char="?">?</div>
              <div>/</div>
            </div>
            <div
              className="key--bottom-right key--word key--w6"
              data-char="SHIFT">
              <span>Shift</span>
            </div>
          </div>
          <div className="keyboard__row keyboard__row--h3">
            <div
              className="key--bottom-left control key--word key--w1"
              data-char="CONTROL">
              <span>ctrl</span>
            </div>
            <div className="key--bottom-left key--word key--w1" data-char="ALT">
              <span>alt</span>
            </div>
            <div
              className="key--bottom-right key--word key--w1"
              data-char="META">
              <span>cmd</span>
            </div>
            <div className="key--double key--right key--space" data-char=" ">
              &nbsp;
            </div>
            <div
              className="key--bottom-left key--word key--w3"
              data-char="META">
              <span>cmd</span>
            </div>
            <div className="key--bottom-left key--word key--w1" data-char="ALT">
              <span>alt</span>
            </div>
            <div
              className="key--bottom-left control-right key--word key--w2"
              data-char="CONTROL">
              <span>ctrl</span>
            </div>
          </div>
        </div>
        {handSignOpen && (
          <div className={styles.hands}>
            <Image
              className={styles.right_resting_hand}
              src={
                letter?.letter == "Y"
                  ? RightTopRow1
                  : RightRestingHand && letter?.letter == "U"
                  ? RightTopRow2
                  : RightRestingHand && letter?.letter == "I"
                  ? RightTopRow3
                  : RightRestingHand && letter?.letter == "O"
                  ? RightTopRow4
                  : RightRestingHand && letter?.letter == "P"
                  ? RightTopRow5
                  : RightRestingHand && letter?.letter == "H"
                  ? RightHomeRow1
                  : RightRestingHand && letter?.letter == "J"
                  ? RightHomeRow2
                  : RightRestingHand && letter?.letter == "K"
                  ? RightHomeRow3
                  : RightRestingHand && letter?.letter == "L"
                  ? RightHomeRow4
                  : RightRestingHand && letter?.letter == "ENTER"
                  ? RightHomeRow7
                  : RightRestingHand && letter?.letter == "N"
                  ? RightBottomRow1
                  : RightRestingHand && letter?.letter == "M"
                  ? RightBottomRow2
                  : RightRestingHand
              }
              alt="right"
            />
            <Image
              className={styles.left_resting_hand}
              src={
                letter?.letter == "T"
                  ? LeftTopRow1
                  : LeftRestingHand && letter?.letter == "A"
                  ? LeftHomeRow5
                  : LeftRestingHand && letter?.letter == "S"
                  ? LeftHomeRow4
                  : LeftRestingHand && letter?.letter == "D"
                  ? LeftHomeRow3
                  : LeftRestingHand && letter?.letter == "F"
                  ? LeftHomeRow2
                  : LeftRestingHand && letter?.letter == "G"
                  ? LeftHomeRow1
                  : LeftRestingHand && letter?.letter == "R"
                  ? LeftTopRow2
                  : LeftRestingHand && letter?.letter == "E"
                  ? LeftTopRow3
                  : LeftRestingHand && letter?.letter == "W"
                  ? LeftTopRow4
                  : LeftRestingHand && letter?.letter == "B"
                  ? LeftBottomRow1
                  : LeftRestingHand && letter?.letter == "V"
                  ? LeftBottomRow2
                  : LeftRestingHand && letter?.letter == "C"
                  ? LeftBottomRow3
                  : LeftRestingHand && letter?.letter == "Z"
                  ? LeftBottomRow5
                  : LeftRestingHand
              }
              alt="right"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Keyboard;
