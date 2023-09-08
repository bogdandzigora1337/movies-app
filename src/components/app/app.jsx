import React, { useState, useEffect } from "react";
import MoviesList from "../movies-list/movies-list";
import Header from "../header/header";
import TmdbАpiService from "../../services/swapi-server";
import { MovieGenresProvider } from "../movie-genres-provider/genres-provider";
import { Tabs } from "antd";

import "./app.css";

const App = () => {
  const [movies, setMovies] = useState(null);
  const [moviesRate, setMoviesRate] = useState([]);
  const [inputText, setInputText] = useState(null);
  const [guestSessionId, setGuestSessionId] = useState(
    localStorage.getItem("guestSessionId")
  );
  const [activeTab, setActiveTab] = useState("1");

  const tmdbАpiService = new TmdbАpiService();

  const createGuestSession = async () => {
    try {
      const sessionData = await tmdbАpiService.createGuestSession();
      const newGuestSessionId = sessionData.guest_session_id;
      setGuestSessionId(newGuestSessionId);
      localStorage.setItem("guestSessionId", newGuestSessionId);
      localStorage.setItem(
        "guestSessionCreationTime",
        new Date().toISOString()
      );
    } catch (error) {
      throw new Error(error);
    }
  };

  const checkAndUpdateGuestSession = () => {
    const storedGuestSessionId = localStorage.getItem("guestSessionId");
    if (storedGuestSessionId) {
      const creationTime = new Date(
        localStorage.getItem("guestSessionCreationTime")
      );
      const currentTime = new Date();
      const timeElapsed = (currentTime - creationTime) / (1000 * 60);
      if (timeElapsed < 59) {
        setGuestSessionId(storedGuestSessionId);
      } else {
        createGuestSession();
      }
    } else {
      createGuestSession();
    }
  };

  const getRatedMovies = async (page = 1) => {
    try {
      const result = await tmdbАpiService.getRatedMovies(guestSessionId, page);
      setMoviesRate(result);
    } catch (error) {
      throw new Error(error);
    }
  };

  const rateMovie = async (movieId, guestSessionId, rating) => {
    try {
      const result = await tmdbАpiService.rateMovie(
        movieId,
        guestSessionId,
        rating
      );
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleTabClick = (key) => {
    setActiveTab(key);
  };

  useEffect(() => {
    checkAndUpdateGuestSession();
    getRatedMovies();
  }, [movies, activeTab]);

  return (
    <MovieGenresProvider>
      <div className="app">
        <Tabs
          defaultActiveKey="1"
          centered
          onTabClick={handleTabClick}
          items={[
            {
              label: "Search",
              key: "1",
            },
            {
              label: "Rated",
              key: "2",
            },
          ]}
        />
        {activeTab === "1" && (
          <>
            <Header
              setInputText={setInputText}
              guestSessionId={guestSessionId}
            />
            <MoviesList
              movies={movies}
              setMovies={setMovies}
              inputText={inputText}
              setInputText={setInputText}
              guestSessionId={guestSessionId}
              rateMovie={rateMovie}
              moviesRate={moviesRate}
              activeTab={activeTab}
              getRatedMovies={getRatedMovies}
              setMoviesRate={setMoviesRate}
            />
          </>
        )}
        {activeTab === "2" && (
          <MoviesList
            movies={moviesRate}
            setMovies={setMovies}
            inputText={inputText}
            setInputText={setInputText}
            guestSessionId={guestSessionId}
            rateMovie={rateMovie}
            moviesRate={moviesRate}
            activeTab={activeTab}
            getRatedMovies={getRatedMovies}
            setMoviesRate={setMoviesRate}
          />
        )}
      </div>
    </MovieGenresProvider>
  );
};

export default App;
