export default class TmdbАpiService {
  _apiBase =
    "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US";

  _apiKey = "9262b2c3635d9e93e8e308ba6fb1ccbd";

  async getResource(movieTitle, page) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjYyYjJjMzYzNWQ5ZTkzZThlMzA4YmE2ZmIxY2NiZCIsInN1YiI6IjY0ZTlkMzAwMDZmOTg0MDBhZTQ5NTdjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FcXo5oh7cDq9dBVJJ1Nr19RZMR4o9Ov4eYSvH1lsZ6I`,
      },
    };

    const res = await fetch(
      `${this._apiBase}&query=${movieTitle}&page=${page}`,
      options
    );

    if (!res.ok) {
      throw new Error(`Ошибка при выполнении запроса: ${res.status}`);
    }

    const body = await res.json();
    return body;
  }

  async createGuestSession() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${this._apiKey}`,
        options
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getMovieGenres() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${this._apiKey}`,
        options
      );
      const data = await response.json();
      return data.genres;
    } catch (error) {
      throw new Error(error);
    }
  }

  async rateMovie(movieId, guestSessionId, rating) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/rating`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        value: rating,
      }),
    };

    try {
      const response = await fetch(
        `${url}?api_key=${this._apiKey}&guest_session_id=${guestSessionId}`,
        options
      );

      if (!response.ok) {
        throw new Error(`Ошибка при выполнении запроса: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getRatedMovies(guestSessionId, page) {
    const url = `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    try {
      const response = await fetch(
        `${url}?api_key=${this._apiKey}&language=en-US&page=${page}&sort_by=created_at.asc`,
        options
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}
