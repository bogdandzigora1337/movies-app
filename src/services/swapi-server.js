export default class SwapiService {
  _apiBase =
    "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US";

  async getResource(movieTitle, page) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjYyYjJjMzYzNWQ5ZTkzZThlMzA4YmE2ZmIxY2NiZCIsInN1YiI6IjY0ZTlkMzAwMDZmOTg0MDBhZTQ5NTdjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FcXo5oh7cDq9dBVJJ1Nr19RZMR4o9Ov4eYSvH1lsZ6I",
      },
    };

    const res = await fetch(
      `${this._apiBase}&query=${movieTitle}&page=${page}`,
      options
    );

    if (!res.ok) {
      throw new Error(`${res.status}`);
    }

    const body = await res.json();
    return body;
  }
}
