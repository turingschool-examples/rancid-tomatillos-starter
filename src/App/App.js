import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import MovieDetails from '../MovieDetails/MovieDetails';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect( () => {
    getMovies()
  }, [])

  function getMovies() {
    fetch('https://rancid-tomatillos-api.onrender.com/api/v1/movies')
      .then(response => response.json())
      .then(data => {
        setMovies(data)
      })
      .catch(error => console.log(error))
  }
  
  function upVote(movieId) {
    fetch(`https://rancid-tomatillos-api.onrender.com/api/v1/movies/${movieId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vote_direction: 'up' }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to upvote. No movie found with an ID of ${movieId}.`);
        }
        return response.json();
      })
      .then((updatedMovie) => {
        setMovies((prevMovies) =>
          prevMovies.map((movie) =>
            movie.id === updatedMovie.id ? { ...movie, vote_count: updatedMovie.vote_count } : movie
          )
        );
      })
      .catch((error) => console.error(error.message));
  }

  function downVote(movieId) {
    fetch(`https://rancid-tomatillos-api.onrender.com/api/v1/movies/${movieId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vote_direction: 'down' }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to downvote. No movie found with an ID of ${movieId}.`);
        }
        return response.json();
      })
      .then((updatedMovie) => {
        setMovies((prevMovies) =>
          prevMovies.map((movie) =>
            movie.id === updatedMovie.id ? { ...movie, vote_count: updatedMovie.vote_count } : movie
          )
        );
      })
      .catch((error) => console.error(error.message));
  }

  return (
    <main className="App">
      <header>
        <h1>rancid tomatillos</h1>
      </header>
        <Routes>
          <Route path='/' element={ <MoviesContainer
                                      movies={movies}
                                      onUpVote={upVote}
                                      onDownVote={downVote}
                                    />
          }
        />
          <Route path='/movies/:id' element={<MovieDetails movies={movies} />} />
          <Route
          path="*"
          element={
            <div className="not-found">
              <h2>404 - Page Not Found</h2>
              <p>Sorry, the page you're looking for does not exist.</p>
              <a href="/" className="home-link">Go back to the homepage</a>
            </div>
          }
        />
        </Routes>
    </main>
  );
}

export default App;
