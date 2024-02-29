import React, { createContext, useEffect, useRef, useState } from 'react';
import { LIGHT } from './constants';
import { Statistic } from 'antd';
const { Countdown } = Statistic;

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [time, setStartTime] = useState(false);
    const [result, setResult] = useState([]);
    const [isHandSignChecked, setIsHandSignChecked] = useState(true);
    const [handSignOpen, setHandSignOpen] = useState(true);
    const [selectedColor, setSelectedColor] = useState("grey");
    const [selectedTheme, setSelectedTheme] = useState(LIGHT);
    const [isKeyboardFalseChecked, setisKeyboardFalseChecked] = useState(true);
    const [isKeyboardTrueChecked, setisKeyboardTrueChecked] = useState(true);
    const hiddenInputRef = useRef(null);


    useEffect(() => {
        const theme = localStorage.getItem("selectedTheme");
        if (theme) {
            setSelectedTheme(theme);
        }
    }, []);

const onChange =()=>{

}
    const WriteTime = ()=>{
        // const handleKeyDown = (e) =
        // return  <Countdown value={Date.now() + 60 * 1000} format="ss" onChange={onChange} />
      }
    
    return (
        <DataContext.Provider value={{ hiddenInputRef, setisKeyboardFalseChecked, isKeyboardFalseChecked, isKeyboardTrueChecked, setisKeyboardTrueChecked, selectedTheme, setSelectedTheme, selectedColor, setSelectedColor, handSignOpen, setHandSignOpen, setIsHandSignChecked, isHandSignChecked, time,setStartTime, result, setResult, WriteTime }}>
            {children}
        </DataContext.Provider>
    );
};
