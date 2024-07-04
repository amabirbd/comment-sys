// src/pages/Home.js
import React from 'react';
import CommentList from '../components/Comments/CommentList';
import { useLocation } from 'react-router-dom';
const Home = () => {
  const location = useLocation();
  return (
    <div className='pt-10 mx-36'>
      <h1 className='text-2xl'>Comments</h1>
      <CommentList key={location.key} />
    </div>
  );
};

export default Home;
