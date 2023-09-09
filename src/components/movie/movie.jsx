import React from 'react'
import { Rate } from 'antd'
import { format } from 'date-fns'

import { useMovieGenres } from '../movie-genres-provider/genres-provider'
import myImage from '../image/no-image.jpg'
import './movie.css'

const Movie = ({ movie, rateMovie, guestSessionId, movies, setMovies }) => {
  const genresArray = useMovieGenres()

  const renderGenres = () => {
    const movieGenreNames = movie.genre_ids
      .map((genreId) => {
        const genre = genresArray.find((genre) => genre.id === genreId)
        return genre ? genre.name : null
      })
      .filter(Boolean)

    return movieGenreNames.map((elem, index) => {
      return <p key={index}>{elem}</p>
    })
  }

  const formatDate = (dateString) => {
    const data = new Date(dateString)
    return format(data, 'MMM dd, yyyy')
  }

  const shortenText = (text, maxLength) => {
    if (text.split(' ').length <= maxLength) {
      return text
    } else {
      const words = text.split(' ')
      let str = ''

      for (let i = 0; i < maxLength; i++) {
        str += ' ' + words[i]
      }

      return str.trim() + '...'
    }
  }

  const getBorderColorForRating = () => {
    const scoreFilm = movie.vote_average

    if (scoreFilm < 3) return 'score-color1'
    else if (scoreFilm >= 3 && scoreFilm < 5) return 'score-color2'
    else if (scoreFilm >= 5 && scoreFilm < 7) return 'score-color3'
    else return 'score-color4'
  }

  return (
    <li className="movie">
      <div className="movie-poster">
        <img
          src={movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : myImage}
          alt={'Постер фильма недоступен'}
        />
      </div>
      <div className="movie-info">
        <h1 className="movie-title">{shortenText(movie.title, 3)}</h1>
        <div className={`movie-score ${getBorderColorForRating()}`}>
          <p>{movie.vote_average % 1 === 0 ? movie.vote_average : movie.vote_average.toFixed(1)}</p>
        </div>

        <p className="movie-date--release">
          {movie.release_date ? formatDate(movie.release_date) : 'Release date unknown'}
        </p>
        <div className="movie-genres">{renderGenres()}</div>
        <p className="movie-description">{shortenText(movie.overview, 25)}</p>
        <Rate
          className="movie-score-stars"
          allowHalf
          defaultValue={movie.rating}
          count={10}
          onChange={(evt) => {
            rateMovie(movie.id, guestSessionId, evt)
            setMovies(movies)
          }}
        />
      </div>
    </li>
  )
}

export default Movie
