import { useState } from 'react'
import './App.module.css'
import type { Movie } from '../../types/movie'
import axios from 'axios'
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
const VITE_TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export default function App() {
  const [error, setError] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [movies, setMovies] = useState<Movie[]>([]);
 const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);
  
  const handleSearch = async (query: string) => {
    try {
      setLoader(true);
      setError(false);
      setMovies([]);
      
      const { data } = await axios.get<{results: Movie[]}>(`https://image.tmdb.org/t/p/w500${onselect}`, {
        params: {
          query: query,
          api_key: VITE_TMDB_TOKEN
        }
      });
      
      setMovies(data.results);
      if (data.results.length === 0) {
        toast('No movies found for your request.');
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError(true);
    } finally {
      setLoader(false);
    }
  };    

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Loader loader={loader} />
      {movies.length > 0 ? <MovieGrid movies={movies} onSelect={openModal} /> : <Toaster />}
      <ErrorMessage error={error} />
      {isModalOpen && <MovieModal src={''} onClose={closeModal} />}
      <Toaster />
    </>
  )
}