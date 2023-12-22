import { useContext } from "react";
import { GlobalContext } from "./context/globalContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

import { MainLayout, SecondaryLayout, AddBlogLayout } from "./layouts";
import { Home, Blog, AddBlog } from "./pages";

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

        <Route element={<ProtectedRoute />}>
          <Route element={<AddBlogLayout />}>
            <Route path="/add-blog" element={<AddBlog />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
