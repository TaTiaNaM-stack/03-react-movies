import type { Movie } from '../types/movie';
import axios from 'axios'

interface FetchMoviesParams {
  results: Movie[];

}

export default function fetchMovies(): Promise<Movie[]> {
  return axios
    .get<FetchMoviesParams>(
      `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_TOKEN}`
    )
    .then((response) => response.data.results);
}