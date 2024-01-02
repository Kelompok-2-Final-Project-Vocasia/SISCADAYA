import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns'; // Importing a utility for date formatting
import { getCommentById } from '../../utils/comment'; // Importing a function to fetch comments
import './index.css';

const CommentItem = () => {
  const [comments, setComments] = useState([]); // State for storing comments
  const [error, setError] = useState(null); // State for storing any errors
  const cagarbudayaId = localStorage.getItem("cagarbudayaId"); // Fetching an ID from localStorage

  // useEffect hook to fetch comments when the component mounts or cagarbudayaId changes
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getCommentById(cagarbudayaId); // Fetching comments
        setComments(response); // Setting the fetched comments to state
      } catch (err) {
        setError(err.message); // Handling errors
      }
    };

    fetchComments();
  }, [cagarbudayaId]); // Dependency array containing cagarbudayaId

  // Rendering an error message if there is an error
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Rendering the list of comments
  return (
    <ul>
      {comments.length > 0 ? ( // Checking if there are comments
        comments.map(comment => { // Mapping each comment to a JSX element
          const initial = comment.body ? comment.body[0].toUpperCase() : ''; // Getting the first initial of the comment body

          return (
            <li key={comment.id} className="comment-item"> // List item for each comment
              <div className="comment-container">
                <div className="initial-container">
                  <p className="initial">{initial}</p> // Displaying the initial
                </div>
                <div>
                  <div className="username-time-container">
                  <p className="username">{comment.user.username}</p> // Displaying the username
                  </div>
                  <p className="comment">{comment.body}</p> // Displaying the comment body
                </div>
              </div>
              <hr className="comment-line" /> // Horizontal line for separating comments
            </li>
          );
        })
      ) : (
        <div>No comments to display</div> // Message displayed when there are no comments
      )}
    </ul>
  );
}

export default CommentItem;
