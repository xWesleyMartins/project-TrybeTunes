import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Favorites from './pages/Favorites';
import notFound from './pages/NotFound';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={ Login } />
        <Route path="/Search" component={ Search } />
        <Route path="/Album/:id" component={ Album } />
        <Route path="/Profile" component={ Profile } />
        <Route path="/Profile/edit" component={ ProfileEdit } />
        <Route path="/Favorites" component={ Favorites } />
        <Route path="*" component={ notFound } />
      </BrowserRouter>
    );
  }
}

export default App;
