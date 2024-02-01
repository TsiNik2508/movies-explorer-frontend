import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SaveMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import Popup from "../Popup/Popup";
import Api from "../utils/api/MoviesApi";
import MainApi from "../utils/api/MainApi";
import ProtectedRoute from "../ProtectedRoute";
import { CurrentUserContext } from "../context/CurrentUserContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPreloader, setIsPreloader] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [shortMovieCheck, setShortMovieCheck] = useState(false);
  const [saveShortMovie, setSaveShortMovie] = useState(false);
  const [isLockedButton, setIsLockedButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // Текущий пользователь
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    _id: "",
  });
  const [searcheMovies, setSearcheMovies] = useState([]);
  const [saveMovies, setSaveMovies] = useState([]);
  const [allSaveMovies, setAllSaveMovies] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const UNAUTHORIZED = {
    status: 401,
    errorText: "Неправильный логин или пароль",
  };
  const CONFLICT_ERROR = {
    status: 409,
    errorText: "Пользователь с такой почтой уже зарегистрирован.",
  };
  const api = new Api({
    link: "https://api.nomoreparties.co/beatfilm-movies",
    headers: {
      "Content-Type": "application/json",
    },
  });
  // Инициализация API для запросов к серверу фильмов и приложения
  const apiMain = new MainApi({
    link: "https://api.movies-project.nomoreparties.co/",
    headers: {
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    // Проверка авторизации ползователя при загрузке страницы
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      apiMain.checkToken(jwt).then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res);
        navigate(location.pathname, { replace: true });
      });
    }
    // Проверка сохраненных фильтров для короткометражек
    const savedShortMoviesCheckbox = localStorage.getItem(
      "savedShortMoviesCheckbox"
    );
    if (savedShortMoviesCheckbox === "true") {
      setSaveShortMovie(true);
    }
    const shortMoviesCheckbox = localStorage.getItem("shortMoviesCheckbox");
    if (shortMoviesCheckbox === "true") {
      setShortMovieCheck(true);
    }

    // Получение всех сохраненных фильмов
    getAllSaveMovies();
    // Обновление списк найденных фильмов
    updatePreviousMovies();
  }, []);
  // Обновление всех сохраненных фильмов при изменении
  useEffect(() => {
    updateAllSaveMovies();
    updateSaveMovies();
  }, [allSaveMovies]);
  // Обновление списка найденных фильмов при переключении
  useEffect(() => {
    if (isLoggedIn && shortMovieCheck) {
      const filteredShortMovies = JSON.parse(
        localStorage.getItem("filtered-short-movies")
      );
      filteredShortMovies !== null && updateSearchedMovies(filteredShortMovies);
    } else if (isLoggedIn && !shortMovieCheck) {
      const filteredMovies = JSON.parse(
        localStorage.getItem("filtered-movies")
      );
      filteredMovies !== null && updateSearchedMovies(filteredMovies);
    }
  }, [shortMovieCheck]);
  // Очистка фильтров при изменении маршрута
  useEffect(() => {
    if (location.pathname !== "/saved-movies") {
      localStorage.removeItem("saved-filtered-movies");
      localStorage.removeItem("saved-filtered-short-movies");
      localStorage.removeItem("savedShortMoviesCheckbox");
      setSaveShortMovie(false);
    } else {
      updateSaveMovies();
    }
  }, [location]);
  // Обновление списка сохраненных фильмов при изменении состояния
  useEffect(() => {
    if (isLoggedIn && saveShortMovie) {
      const savedFilteredShortMovies = JSON.parse(
        localStorage.getItem("saved-filtered-short-movies")
      );
      if (savedFilteredShortMovies !== null) {
        savedFilteredShortMovies.length === 0 && setNotFound(true);
        setSaveMovies(savedFilteredShortMovies);
      } else setNotFound(true);
    } else if (isLoggedIn && !saveShortMovie) {
      const savedFilteredMovies = JSON.parse(
        localStorage.getItem("saved-filtered-movies")
      );
      savedFilteredMovies !== null && setSaveMovies(savedFilteredMovies);
    }
  }, [saveShortMovie]);

  const handleClosePopup = () => {
    setIsOpen(false);
    setErrorMessage("");
  };
  // Функция для обработки регистрации
  const handleRegister = (formValues) => {
    setIsLockedButton(true);
    apiMain
      .createUser(formValues)
      .then(() => {
        handleLogin({ email: formValues.email, password: formValues.password });
      })
      .catch((err) => {
        setErrorMessage(
          err === CONFLICT_ERROR.status
            ? CONFLICT_ERROR.errorText
            : "При регистрации произошла ошибка."
        );
        setIsOpen(true);
      })
      .finally(() => setIsLockedButton(false));
  };
  // Функция для обработки вход
  const handleLogin = (formValues) => {
    setIsLockedButton(true);
    apiMain
      .login(formValues)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        apiMain
          .checkToken(res.token)
          .then((res) => {
            setCurrentUser(res);
            setIsLoggedIn(true);
            navigate("/movies");
            getAllSaveMovies();
          })
          .catch(() => {
            setErrorMessage(UNAUTHORIZED.errorText);
            setIsOpen(true);
          });
      })
      .catch(() => {
        setErrorMessage(UNAUTHORIZED.errorText);
        setIsOpen(true);
      })
      .finally(() => setIsLockedButton(false));
  };
  // Функция для обновления данных профиля
  const handleUpdateProfile = (formValues) => {
    apiMain
      .updateUser(formValues)
      .then((res) => {
        setCurrentUser(res);
        setIsOpen(true);
        setErrorMessage("Данные профиля обновлены!");
      })
      .catch(() => {
        setErrorMessage(CONFLICT_ERROR.errorText);
        setIsOpen(true);
      });
  };
  // Функция для выхода пользователя
  const handleLogout = () => {
    localStorage.clear();
    setSearcheMovies([]);
    setSaveMovies([]);
    setAllSaveMovies([]);
    setCurrentUser({});
    setIsLoggedIn(false);
    navigate("/");
  };
  // Функция для обновления списка найденных фильмов
  const updatePreviousMovies = () => {
    const previousMovies = JSON.parse(localStorage.getItem("searched-movies"));
    previousMovies !== null
      ? updateSearchedMovies(previousMovies)
      : setNotFound(true);
  };

  const updateSearchedMovies = (movies) => {
    if (movies.length) {
      setSearcheMovies(movies);
      localStorage.setItem("searched-movies", JSON.stringify(movies));
    } else {
      setSearcheMovies([]);
      setNotFound(true);
    }
  };
  // Функция для поиска фильмов
  const handleSearchMovie = (movieToSearch) => {
    if (!movieToSearch) {
      setIsOpen(true);
      setErrorMessage("Нужно ввести название.");
    } else {
      setNotFound(false);
      localStorage.removeItem("searched-movies");
      setSearcheMovies([]);
      setIsPreloader(true);
      api
        .getMoviesList()
        .then((movies) => {
          const filteredMovies = movies.filter(
            (movie) =>
              movie.nameRU
                .toLowerCase()
                .includes(movieToSearch.toLowerCase()) ||
              movie.nameEN.toLowerCase().includes(movieToSearch.toLowerCase())
          );
          localStorage.setItem(
            "filtered-movies",
            JSON.stringify(filteredMovies)
          );
          localStorage.setItem(
            "movie-to-search",
            JSON.stringify(movieToSearch)
          );
          const filteredShortMovies = filteredMovies.filter(
            (movie) => movie.duration <= 40
          );
          localStorage.setItem(
            "filtered-short-movies",
            JSON.stringify(filteredShortMovies)
          );
          if (shortMovieCheck) {
            updateSearchedMovies(filteredShortMovies);
          } else {
            updateSearchedMovies(filteredMovies);
          }
        })
        .catch(() => {
          setIsOpen(true);
          setErrorMessage(
            "Произошла ошибка. Проблема с соединением или сервер недоступен."
          );
        })
        .finally(() => {
          setIsPreloader(false);
        });
    }
  };
  // Функция для выбора короткометражек
  const handleChooseShortMovies = (movieToSearch) => {
    // Логика выбора короткометражек в зависимости от текущего нахожденич
    if (location.pathname === "/movies") {
      if (movieToSearch) {
        setShortMovieCheck(!shortMovieCheck);
        localStorage.setItem("shortMoviesCheckbox", !shortMovieCheck);
      } else {
        setIsOpen(true);
        setErrorMessage("Нужно ввести название");
      }
    }
    if (location.pathname === "/saved-movies") {
      const savedFilteredShortMovies = JSON.parse(
        localStorage.getItem("saved-filtered-short-movies")
      );
      const saveMoviesArray = JSON.parse(localStorage.getItem("allSaveMovies"));
      if (saveMoviesArray.length === 0) {
        setIsOpen(true);
        setErrorMessage("Нет сохраненных фильмов");
      } else {
        setSaveShortMovie(!saveShortMovie);
        if (saveMoviesArray.length === 0) {
          setIsOpen(true);
          setErrorMessage("Нет сохраненных фильмов");
        }
        if (!savedFilteredShortMovies) {
          localStorage.setItem("savedShortMoviesCheckbox", !saveShortMovie);
          const savedShortMoviesArray = saveMoviesArray.filter(
            (movie) => movie.duration <= 40
          );
          if (!saveShortMovie) {
            setSaveMovies(savedShortMoviesArray);
          } else {
            setSaveMovies(saveMoviesArray);
          }
        }
      }
    }
  };
  // Функция для поиска сохраненных фильмов
  const handleSearchSaveMovie = (movieToSearch) => {
    if (!movieToSearch) {
      setIsOpen(true);
      setErrorMessage("Нужно ввести название");
    } else {
      setNotFound(false);
      const localSaveMovies = JSON.parse(localStorage.getItem("allSaveMovies"));
      const savedSearchedMovies = localSaveMovies.filter(
        (movie) =>
          movie.nameRU.toLowerCase().includes(movieToSearch.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(movieToSearch.toLowerCase())
      );
      localStorage.setItem(
        "saved-filtered-movies",
        JSON.stringify(savedSearchedMovies)
      );
      const savedSearchedShortMovies = savedSearchedMovies.filter(
        (movie) => movie.duration <= 40
      );
      localStorage.setItem(
        "saved-filtered-short-movies",
        JSON.stringify(savedSearchedShortMovies)
      );
      if (saveShortMovie) {
        setSaveMovies(savedSearchedShortMovies);
        savedSearchedShortMovies.length === 0 && setNotFound(true);
      } else {
        setSaveMovies(savedSearchedMovies);
        savedSearchedMovies.length === 0 && setNotFound(true);
      }
    }
  };
  // Функция для получения всех сохраненных фильмов
  const getAllSaveMovies = () => {
    apiMain
      .getSaveMovies()
      .then((res) => {
        setSaveMovies(res);
        setAllSaveMovies(res);
        localStorage.setItem("allSaveMovies", JSON.stringify(res));
      })
      .catch((err) => console.log(err));
  };
  // Функция для обновления списка сохраненных фильмов
  const updateSaveMovies = () => {
    setSaveMovies(JSON.parse(localStorage.getItem("allSaveMovies")));
  };
  // Функция для обновления всех сохраненных фильмов
  const updateAllSaveMovies = () => {
    localStorage.setItem("allSaveMovies", JSON.stringify(allSaveMovies));
  };
  // Функция для сохранения фильма
  const handleSaveMovie = (movie) => {
    apiMain
      .saveMovie(movie)
      .then((res) => {
        setAllSaveMovies([...allSaveMovies, res]);
      })
      .catch(() => {
        setIsOpen(true);
        setErrorMessage("При сохранении фильма произошла ошибка.");
      });
  };

  const getMovieToDeleteId = (movie) => {
    const localSaveMovies = JSON.parse(localStorage.getItem("allSaveMovies"));
    if (localSaveMovies) {
      return localSaveMovies.find((movieItem) => movieItem.movieId === movie.id)
        ._id;
    }
  };
  // Функция для удаления фильма
  const handleDeleteMovie = (movie) => {
    apiMain
      .deleteMovie(movie)
      .then(() => {
        setAllSaveMovies((state) =>
          state.filter((saveMovie) => saveMovie._id !== movie)
        );
      })
      .catch(() => {
        setIsOpen(true);
        setErrorMessage("При удалении фильма произошла ошибка.");
      });
  };
  // Функция для проверки, сохранения
  const isSaved = (movie) => {
    return allSaveMovies.some((movieItem) => movieItem.movieId === movie.id);
  };
  // Функция для обновления статуса (сохранен/удален)
  const updateMovieStatus = (movie) => {
    if (!isSaved(movie)) {
      handleSaveMovie(movie);
    } else {
      handleDeleteMovie(getMovieToDeleteId(movie));
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header isLoggedIn={isLoggedIn} />

        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Movies
                  onChooseShortMovies={handleChooseShortMovies}
                  shortMovieCheck={shortMovieCheck}
                  nothingFound={notFound}
                  moviesArray={searcheMovies}
                  isPreloader={isPreloader}
                  onSearchMovie={handleSearchMovie}
                  onSaveMovie={updateMovieStatus}
                  isSaved={isSaved}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SaveMovies
                  onChooseShortMovies={handleChooseShortMovies}
                  savedShortMoviesCheck={saveShortMovie}
                  nothingFound={notFound}
                  onSearchMovie={handleSearchSaveMovie}
                  deleteMovie={handleDeleteMovie}
                  saveMoviesArray={saveMovies}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile
                  onUpdate={handleUpdateProfile}
                  onSignout={handleLogout}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <ProtectedRoute isLoggedIn={!isLoggedIn}>
                <Login isLockedButton={isLockedButton} onSignin={handleLogin} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <ProtectedRoute isLoggedIn={!isLoggedIn}>
                <Register
                  isLockedButton={isLockedButton}
                  onSignup={handleRegister}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>

        <Footer />

        <Popup
          isOpen={isOpen}
          onClose={handleClosePopup}
          errorMessage={errorMessage}
          overlayClickClose={handleClosePopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
