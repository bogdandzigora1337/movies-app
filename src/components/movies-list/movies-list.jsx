import React, { useEffect, useState } from "react";
import SwapiService from "../../services/swapi-server";
import Movie from "../movie/movie";
import ErrorIndicator from "../error-indicator/error-indicator";
import { Alert, Space, Spin, Pagination } from "antd";
import { ExclamationCircleTwoTone, EditTwoTone } from "@ant-design/icons";

import "./movies-list.css";

const MoviesList = ({ movies, setMovies, inputText }) => {
  const swapiService = new SwapiService();

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onMoviesLoaded = (movies) => {
    setMovies(movies);
    setLoading(false);
    setError(null);
  };

  const onError = (err) => {
    console.error(err);
    setLoading(false);
    setError(err);
  };

  const updateMovies = async (movieTitle, page = 1) => {
    if (!movieTitle) {
      setMovies(null);
      return;
    }
    setLoading(true);
    try {
      const movies = await swapiService.getResource(movieTitle, page);
      onMoviesLoaded(movies);
      setCurrentPage(page);
    } catch (err) {
      onError(err);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    updateMovies(inputText);
  }, [inputText]);

  const LoadingSpinner = () => (
    <div className="main-content--loading">
      <Spin size="large" />
      <p>Загрузка...</p>
    </div>
  );

  const MoviesResults = () => (
    <>
      <ul className="movies-list">
        {movies.results.map((movie) => (
          <Movie key={movie.id} movie={movie}></Movie>
        ))}
      </ul>
      <Pagination
        className="main-pagination"
        current={currentPage}
        total={movies.total_pages * 10}
        onChange={(page) => {
          updateMovies(inputText, page);
        }}
      />
    </>
  );

  const NoResults = () => (
    <div className="main-content--no">
      <ExclamationCircleTwoTone style={{ fontSize: "30px" }} />
      <p>Нет результатов по вашему запросу</p>
    </div>
  );

  const EnterMovieName = () => (
    <div className="main-content--no">
      <EditTwoTone style={{ fontSize: "30px" }} />
      <p>Введите название фильма</p>
    </div>
  );

  return (
    <div className="main">
      {error ? (
        <ErrorIndicator />
      ) : (
        <>
          {loading ? (
            <LoadingSpinner />
          ) : movies ? (
            movies.results.length !== 0 ? (
              <MoviesResults />
            ) : (
              <NoResults />
            )
          ) : (
            <EnterMovieName />
          )}
        </>
      )}
    </div>
  );
};

export default MoviesList;
