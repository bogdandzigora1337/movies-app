import React, { useEffect, useState } from "react";
import TmdbАpiService from "../../services/swapi-server";
import Movie from "../movie/movie";
import ErrorIndicator from "../error-indicator/error-indicator";
import { Spin, Pagination } from "antd";
import { ExclamationCircleTwoTone, EditTwoTone } from "@ant-design/icons";

import "./movies-list.css";

const MoviesList = ({
  movies,
  setMovies,
  inputText,
  rateMovie,
  guestSessionId,
  moviesRate,
  activeTab,
  setMoviesRate,
}) => {
  const tmdbАpiService = new TmdbАpiService();

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const moviesWithRatings =
    movies && movies.results
      ? movies.results.map((movie) => {
          const movieRating = Array.isArray(moviesRate.results)
            ? moviesRate.results.find((rateMovie) => rateMovie.id === movie.id)
            : null;
          return {
            ...movie,
            rating: movieRating ? movieRating.rating : 0,
          };
        })
      : [];

  const onMoviesLoaded = (movies) => {
    activeTab === "1" ? setMovies(movies) : setMoviesRate(movies);
    setLoading(false);
    setError(null);
  };

  const onError = (err) => {
    console.error(err);
    setLoading(false);
    setError(err);
  };

  const updateMovies = async (movieTitle, page = 1) => {
    if (!movieTitle && activeTab === "1") {
      setMovies(null);
      return;
    }
    setLoading(true);
    try {
      const movies =
        activeTab === "1"
          ? await tmdbАpiService.getResource(movieTitle, page)
          : await tmdbАpiService.getRatedMovies(guestSessionId, page);

      onMoviesLoaded(movies);
      setCurrentPage(page);

      window.scrollTo({ top: 0, behavior: "smooth" });
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
        {moviesWithRatings.map((movie) => (
          <Movie
            key={movie.id}
            movie={movie}
            rateMovie={rateMovie}
            guestSessionId={guestSessionId}
            movies={movies}
            setMovies={setMovies}
          ></Movie>
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
      {activeTab === "1" ? (
        <p>Нет результатов по вашему запросу</p>
      ) : (
        <p>Вы ещё не оценивали фильмы</p>
      )}
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
