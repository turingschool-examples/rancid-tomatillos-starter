import './MoviesContainer.css';
import MoviePoster from '../MoviePoster/MoviePoster';

function Movies({ movies, onUpVote, onDownVote }) {
  return (
      <section className='MoviesContainer'>
        {movies.map(movie => (
        <MoviePoster 
          key={movie.id} 
          id={movie.id}
          title={movie.title} 
          poster={movie.poster_path} 
          votes={movie.vote_count} 
          onUpVote={() => onUpVote(movie.id)}
          onDownVote={() => onDownVote(movie.id)}
          />
      ))}
      </section>
  );
}
  
export default Movies;