import './MoviePoster.css';
import VoteContainer from '../VoteContainer/VoteContainer';
import { Link } from 'react-router-dom'

function MoviePoster({ id, title, poster, votes, onUpVote, onDownVote }) {
  return (
    <section className='MoviePoster'>
      <Link to={ `movies/${id}` }>
        <img src={poster} alt={`${title} poster image`}  />
      </Link>
      <VoteContainer votes={votes} onUpVote={onUpVote} onDownVote={onDownVote}/>
    </section>
  );
}

export default MoviePoster;