import { createContext, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export const GlobalContext = createContext({
  openLoginModal: false,
  setOpenLoginModal: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const GlobalProvider = ({ children }) => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);
  return (
    <GlobalContext.Provider
      value={{ openLoginModal, setOpenLoginModal, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
