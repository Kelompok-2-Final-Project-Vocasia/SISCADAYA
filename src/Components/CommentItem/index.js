import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { getCommentById } from '../../utils/comment';
import './index.css';

const CommentItem = () => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const cagarbudayaId = localStorage.getItem("cagarbudayaId");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getCommentById(cagarbudayaId);
        setComments(response);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchComments();
  }, [cagarbudayaId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ul>
      {comments.length > 0 ? (
        comments.map(comment => {
          const initial = comment.body ? comment.body[0].toUpperCase() : '';
          

          return (
            <li key={comment.id} className="comment-item">
              <div className="comment-container">
                <div className="initial-container">
                  <p className="initial">{initial}</p>
                </div>
                <div>
                  <div className="username-time-container">
                  <p className="username">{comment.user.username}</p>
                 
                
                  </div>
                  <p className="comment">{comment.body}</p>
                </div>
              </div>
              <hr className="comment-line" />
            </li>
          );
        })
      ) : (
        <div>No comments to display</div>
      )}
    </ul>
  );
}

export default CommentItem;
