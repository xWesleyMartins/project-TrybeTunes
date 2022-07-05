import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Content from './pages/Content';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Content />
      </BrowserRouter>
    );
  }
}

export default App;
