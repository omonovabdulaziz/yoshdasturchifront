import React, { useState, useEffect } from "react";
import styles from '../Navbar/Navbar.module.scss'
import Switch from "react-switch";

const DarkMode = ({ setSelectedTheme }) => {
    const [isDarkModeChecked, setIsDarkModeChecked] = useState(false);

    const setDarkMode = () => {
        document.querySelector("body").setAttribute("data-theme", "dark");
        localStorage.setItem('selectedTheme', "dark");
        setSelectedTheme('dark')
    };

    const setLightMode = () => {
        document.querySelector("body").setAttribute("data-theme", "light")
        localStorage.setItem('selectedTheme', "light");
        setSelectedTheme('light')
    };

    useEffect(() => {
        const selectedTheme = localStorage.getItem("selectedTheme");

        if (selectedTheme === "dark") {
            setDarkMode();
            setIsDarkModeChecked(true);
        }
    });

    const toggleTheme = () => {
        if (isDarkModeChecked) setLightMode();
        else setDarkMode();
        setIsDarkModeChecked(!isDarkModeChecked);
    }
    
  return (
    <>
        <div className={styles.setting}>
            <h4>Tungi rejim</h4>
            <Switch
                checked={isDarkModeChecked}
                onChange={toggleTheme}
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
    </>
  )
}

export default DarkMode