/* eslint-disable react/prop-types */

import { createContext, useState } from "react";

const ThemeContext = createContext();

function ThemeWrapper ({children}){

    //Object and functions
    const [isDarkMode, setIsDarkMode] = useState(true);
    const toggleTheme = () =>{setIsDarkMode(!isDarkMode)};
    const buttonTheme = isDarkMode ? "dark-buttons" : "light-buttons";
    const cardTheme = isDarkMode ? "dark-card" : "light-card";


    //package
    const passedContext = {isDarkMode, toggleTheme, buttonTheme, cardTheme};


    //Use of the Component Context
    return (
        <ThemeContext.Provider value={passedContext}>
            {children}
        </ThemeContext.Provider>
    )   

}

export {ThemeContext, ThemeWrapper};

