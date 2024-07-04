// src/components/Comments/CommentForm.js
import React, { useState, useContext } from 'react';
import { CommentContext } from '../../context/CommentContext';
import { useHistory } from 'react-router-dom';

const CommentForm = ({ parentId }) => {
  const { addComment } = useContext(CommentContext);
  const [text, setText] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(text, parentId);
    setText('');
    history.push('/');

  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button 
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-700"

      >Add Comment</button>
    </form>
  );
};

export default CommentForm;
