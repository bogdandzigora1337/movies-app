import React, { createContext, useContext, useState, useEffect } from "react";
import TmdbАpiService from "../../services/swapi-server";

const MovieGenresContext = createContext();

export const MovieGenresProvider = ({ children }) => {
  const [movieGenres, setMovieGenres] = useState([]);
  const tmdbАpiService = new TmdbАpiService();

  const getMovieGenres = async () => {
    try {
      const moviesGenres = await tmdbАpiService.getMovieGenres();
      setMovieGenres(moviesGenres);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovieGenres();
  }, []);

  return (
    <MovieGenresContext.Provider value={movieGenres}>
      {children}
    </MovieGenresContext.Provider>
  );
};

export const useMovieGenres = () => {
  return useContext(MovieGenresContext);
};
