import React, { createContext, useContext, useState } from 'react'

const StateContext = createContext();
const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
}

export const ContextProvider = ({children}) => {
    const [activeMenu, setActiveMenu] = useState(false);
    const [screenSize, setScreenSize] = useState();
    return(
        <StateContext.Provider
        value={{
            activeMenu,
            setActiveMenu,
            screenSize,
            setScreenSize
        }}>
            {children}
        </StateContext.Provider>
    )
};

export const useStateContext = () => useContext(StateContext);