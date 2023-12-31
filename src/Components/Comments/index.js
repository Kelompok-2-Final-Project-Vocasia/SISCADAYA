import {Component} from 'react'
import {v4} from 'uuid'

import CommentItem from '../CommentItem'
import { onAddComment } from '../../utils/comment';

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    // state lainnya...
    komentar: '',
    user:  '',
    id:'',
    nameInput: '',
    commentInput: '',
    commentsList: []

  }

  // Handler lainnya...

  onFormSubmit = async (event) => {
    event.preventDefault();
    const { commentInput } = this.state;
    const cagarbudayaId = localStorage.getItem("cagarbudayaId");
    const user = localStorage.getItem("user");
    const token = localStorage.getItem('token');

    const commentData = {
        body: commentInput,
        cagarbudayaId: cagarbudayaId,
        userId: user
    };

    try {
        await onAddComment(commentData, token);
        // Tangani respons sesuai kebutuhan, misalnya memperbarui state commentsList
    } catch (error) {
        console.error('Error saat mengirim komentar:', error);
    }
  }
Comment = commentId => {
    const {commentsList} = this.state

    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== commentId),
    })
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }
  
 
  renderCommentsList = () => {
    const { commentsList } = this.state;
  
    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.deleteComment}
      />
    ));
  }
  onChangeCommentInput = event => {
    this.setState({
      commentInput: event.target.value,
    })
  }




  render() {
 
    const {nameInput, commentInput, commentsList} = this.state
    const user = localStorage.getItem("user");
    const id = localStorage.getItem("cagarbudayaId");
    if (!user) {
      return (
        <div className="app-container">
        <div className="comments-container">
          <h1 className="app-heading">Komentar</h1>
        
          <hr className="line" />
          <p className="heading">
           
            Comments
          </p>
          <ul className="comments-list">       {/* {this.renderCommentsList()} */}

<CommentItem/>
</ul>
        </div>
      </div>
      )
  }
    return (
      <div className="app-container">
        <div className="comments-container">
          <h1 className="app-heading">Comments</h1>
          <div className="comments-inputs">
            <form className="form" onSubmit={this.onFormSubmit}>
 <h2>{user}</h2>
      
              <textarea
                placeholder="Your Comment"
                className="comment-input"
                nama="commentInput"
                id="commentInput"
                value={commentInput}
                onChange={this.onChangeCommentInput}
                rows="6"
              />
              <button type="submit" className="add-button">
                Add Comment
              </button>
            </form>
            <img
              className="image"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
          </div>
          <hr className="line" />
          <p className="heading">
          
            Comments
          </p>
          <ul className="comments-list">
          {/* {this.renderCommentsList()} */}

          <CommentItem/>
         
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
