import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CommentProvider } from './context/CommentContext';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import CommentPage from './pages/CommentPage';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div className='flex flex-col '>
      <AuthProvider>
        <CommentProvider>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/comments/:id" component={CommentPage} />
            </Switch>
        </CommentProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
