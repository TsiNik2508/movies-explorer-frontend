import { Routes, Route, useNavigate } from "react-router-dom";
import React, { Fragment, useState } from "react";

import "./App.css";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import Popup from "../Popup/Popup";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  function handleClosePopup() {
    setIsOpen(false);
  }

  function handleLogout() {
    setIsLoggedIn(false);
    navigate("/");
  }

  return (
    <div className="app">
      <Routes>
        <Route path="/*" element={<NotFound />} />
        <Route
          path="/"
          element={
            <Fragment>
              <Header isLoggedIn={isLoggedIn} />
              <Main />
              <Footer />
            </Fragment>
          }
        />
        <Route
          path="/movies"
          element={
            <Fragment>
              <Header isLoggedIn={isLoggedIn} />
              <Movies />
              <Footer />
            </Fragment>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <Fragment>
              <Header isLoggedIn={isLoggedIn} />
              <SavedMovies />
              <Footer />
            </Fragment>
          }
        />
        <Route
          path="/profile"
          element={
            <Fragment>
              <Header isLoggedIn={isLoggedIn} />
              <Profile onSignout={handleLogout} />
              <Popup
                isOpen={isOpen}
                onClose={handleClosePopup}
                errorMessage={"Ошибка соединения с сервером"}
                overlayClickClose={handleClosePopup}
              />
            </Fragment>
          }
        />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;