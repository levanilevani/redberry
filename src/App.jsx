import { useContext } from "react";
import { GlobalContext } from "./context/globalContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout, SecondaryLayout } from "./layouts";
import { Home, Blog } from "./pages";

import "./assets/styles/global.scss";

function App() {
  const { isLoggedIn } = useContext(GlobalContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={isLoggedIn ? <SecondaryLayout /> : <MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<Blog />} />
        </Route>

        <Route element={<SecondaryLayout />}>
          <Route path="/secondary" element={<di>test secondary layout</di>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
