import React, { createContext, useContext, useState, useEffect } from 'react'

import TmdbАpiService from '../../services/swapi-server'

const MovieGenresContext = createContext()

export const MovieGenresProvider = ({ children, showErrorNotification }) => {
  const [movieGenres, setMovieGenres] = useState([])
  const tmdbАpiService = new TmdbАpiService()

  const getMovieGenres = async () => {
    try {
      const moviesGenres = await tmdbАpiService.getMovieGenres()
      setMovieGenres(moviesGenres)
    } catch (error) {
      showErrorNotification('Не удалось получить жанры фильмов', error)
    }
  }

  useEffect(() => {
    getMovieGenres()
  }, [])

  return <MovieGenresContext.Provider value={movieGenres}>{children}</MovieGenresContext.Provider>
}

export const useMovieGenres = () => {
  return useContext(MovieGenresContext)
}
