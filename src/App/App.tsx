import { useState } from 'react'
import './App.module.css'
import type { Movie } from '../types/movie'
import axios from 'axios'
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { Toaster } from 'react-hot-toast';

export default function App() {
  const [error, setError] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [movies, setMovies] = useState<Movie[]>([]);
    const handleSearch = async (query: string) => {
      try {
        setLoader(true);
        setError(false);
        setMovies([]);
        const { data } = await axios.get<{hits: Movie[]}>(`https://image.tmdb.org/t/p/w500${VITE_TMDB_TOKEN}`, {
            params: {
              query: query
            },
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${VITE_TMDB_TOKEN}`,
            }
        })
        setMovies(data.hits);

      } catch (error) {
        console.error('Error fetching movies:', error);
        setError(true);

      } finally{
        setLoader(false);
      }
    };
    if (movies.length === 0) {
        const notify = () => toast('No movies found for your request.');
        return notify()
    } 

//     const poster_path = '/kqjL17yufvn9OVLyXYpvtyrFfak.jpg';
//   const [movies, setMovies] = useState<Movie[]>([]);
  
//   useEffect(() => {
//     axios.get<Movie[]>(`https://image.tmdb.org/t/p/w500${poster_path}`)
//       .then(({data}) => setMovies(data))
//       .catch(error => {
//         console.error('Error fetching movie data:', error);
//       });
//   }, []);

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Loader loader={loader} />
      {movies.length > 0 ? <MovieGrid movies={movies} /> : <Toaster />}
      <ErrorMessage error={error} />
    </>
  )
}