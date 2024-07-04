import React, { useState, useContext } from 'react';
import commentService from '../../services/commentService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';

const Comments = ({ comment }) => {
  // const { user } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem('user'))
  // const {userDetails} = JSON.parse(localStorageUser)
  console.log("USER: ", user);

  const [reply, setReply] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const history = useHistory();

  const handleLikeComment = async () => {
    try {
      if (!comment || !comment._id) {
        throw new Error('Comment ID is undefined or null');
      }
      await commentService.likeComment(comment._id);
      history.push('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDislikeComment = async () => {
    try {
      if (!comment || !comment._id) {
        throw new Error('Comment ID is undefined or null');
      }
      await commentService.dislikeComment(comment._id);
      history.push('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleReplyToComment = async () => {
    console.log("comment", comment);
    console.log("user", user);

    try {
      if (!comment || !comment._id || !user || !user._id) {
        throw new Error('Comment ID or User ID is undefined or null');
      }
      const replyData = { text: reply, author: user._id };
      await commentService.replyToComment(comment._id, replyData);
      setReply('');
      setReplyingTo(null);
      history.push('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!comment) {
    return null; // Handle case where comment is not defined
  }

  return (
    <div className="mb-4 p-4 border-b border-gray-200">
      <ToastContainer />
      <p className="mb-2">{comment.text}</p>
      {comment.author && (
        <p className="text-sm text-gray-600">Commented by: {comment.author.username}</p>
      )}
      <div className="flex space-x-4">
        <button
          onClick={handleLikeComment}
          className="text-blue-500 hover:text-blue-700"
        >
          Like <span>({comment.likes.length})</span>
        </button>
        <button
          onClick={handleDislikeComment}
          className="text-red-500 hover:text-red-700"
        >
          Dislike <span>({comment.dislikes.length})</span>
        </button>
        <button
          onClick={() => setReplyingTo(comment._id)}
          className="text-gray-500 hover:text-gray-700"
        >
          Reply
        </button>
      </div>
      {comment?.replies && comment?.replies.length > 0 && (
        <div className="mt-4">
          {comment?.replies.map((reply) => (
            <div key={reply?._id} className="mt-4 ml-4 pl-4 border-l border-gray-300">
              <p>{reply?.text}</p>
              {/* Uncomment below if reply.author is available */}
              {reply.author && (
                <p className="text-sm text-gray-600">Replied by: {reply.author.username}</p>
              )}
            </div>
          ))}
        </div>
      )}
      {replyingTo === comment?._id && (
        <div className="mt-4">
          <input
            type="text"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Write a reply..."
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button
            onClick={handleReplyToComment}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-700"
          >
            Reply
          </button>
        </div>
      )}
    </div>
  );
};

export default Comments;
