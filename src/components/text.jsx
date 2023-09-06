import React, { useEffect, useState } from "react";
import SwapiService from "../../services/swapi-server";
import Movie from "../movie/movie";
import ErrorIndicator from "../error-indicator/error-indicator";
import { Alert, Space, Spin, Pagination } from "antd";

import "./movies-list.css";
import { clear } from "@testing-library/user-event/dist/clear";

const MoviesList = ({
  movies,
  setMovies,
  inputText,
  setInputText,
  moviesPage,
  setMoviesPage,
}) => {
  const swapiService = new SwapiService();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const onMoviesLoaded = (movies) => {
    setMovies(movies);
    setLoading(false);
    setError(false);
  };

  const onError = (err) => {
    setError(true);
    setLoading(false);
  };

  const updateMovies = async (movieTitle, page) => {
    if (!movieTitle) {
      return;
    }
    try {
      const movies = await swapiService.getResource(movieTitle, page);

      onMoviesLoaded(movies);
    } catch (err) {
      onError(err);
    }
  };

  const fn = (evt) => {
    if (evt) {
      setMoviesPage(+evt);
    } else {
      setMoviesPage(1);
    }
  };

  useEffect(() => {
    updateMovies(inputText, moviesPage);
  }, [inputText, moviesPage, fn]);

  const spin = loading ? (
    <Space direction="vertical" className="movies-loading">
      <Spin tip="Loading..." size="large">
        <Alert className="alert" type="info" />
      </Spin>
    </Space>
  ) : null;

  const errorMessage = error ? <ErrorIndicator /> : null;

  console.log(movies.results);

  const hasData = error || !loading;
  const moviesList = hasData ? (
    <>
      <ul className="movies-list">
        {movies.results.map((movie) => (
          <Movie key={movie.id} movie={movie}></Movie>
        ))}
      </ul>

      {movies.results.length != 0 ? (
        <Pagination
          defaultCurrent={1}
          total={movies.total_pages * 10}
          onChange={fn}
        />
      ) : null}
    </>
  ) : null;

  return (
    <div className="main">
      {errorMessage}
      {spin}
      {moviesList}
    </div>
  );
};

export default MoviesList;
