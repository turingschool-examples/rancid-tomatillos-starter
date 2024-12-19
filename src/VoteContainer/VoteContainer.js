import './VoteContainer.css';
import upvoteIcon from '../icons/upvote.png';
import downvoteIcon from '../icons/downvote.png';

function VoteContainer({ votes, onUpVote, onDownVote }) {
  return (
    <div className="VoteContainer">
      <button className="vote-button" onClick={onUpVote}>
        <img src={upvoteIcon} alt="Upvote button" />
      </button>
      <p>{votes}</p>
      <button className="vote-button" onClick={onDownVote}>
        <img src={downvoteIcon} alt="Downvote button" />
      </button>
    </div>
  );
}

export default VoteContainer;