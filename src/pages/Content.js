import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './Album';
import Favorites from './Favorites';
import Login from './Login';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';
import Search from './Search';
import notFound from './NotFound';

export default class Content extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/Search" component={ Search } />
          <Route path="/Album/:id" component={ Album } />
          <Route path="/Profile" component={ Profile } />
          <Route path="/Profile/edit" component={ ProfileEdit } />
          <Route path="/Favorites" component={ Favorites } />
          <Route path="*" component={ notFound } />
        </Switch>
      </div>
    );
  }
}
