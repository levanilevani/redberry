import { createContext, useState, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

export const GlobalContext = createContext({
  openLoginModal: false,
  setOpenLoginModal: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  pending: true,
});

export const GlobalProvider = ({ children }) => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      setPending(false);
    } else {
      setPending(false);
    }
  }, [isLoggedIn]);

  return (
    <GlobalContext.Provider
      value={{
        openLoginModal,
        setOpenLoginModal,
        isLoggedIn,
        setIsLoggedIn,
        pending,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
