import React, { useState } from "react";
import MoviesList from "../movies-list/movies-list";
import Header from "../header/header";

import "./app.css";

const App = () => {
  const [movies, setMovies] = useState(null);
  const [inputText, setInputText] = useState(null);

  return (
    <div className="app">
      <>
        <Header setInputText={setInputText} />
        <MoviesList
          movies={movies}
          setMovies={setMovies}
          inputText={inputText}
          setInputText={setInputText}
        />
      </>
    </div>
  );
};

export default App;
