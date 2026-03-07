import { useState, useEffect } from 'react'
import './App.module.css'
import { Movie } from '../types/movie'
// import axios from 'axios'
import SearchBar from '../SearchBar/SearchBar';

export default function App({id, title}: Movie) {
    const handleSearch = (query: string) => {
        console.log('Search query:', query);
    };

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
    </>
  )
}