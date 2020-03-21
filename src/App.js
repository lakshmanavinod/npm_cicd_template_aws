import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import ChatContainer from './Containers/ChatContainer'

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <ChatContainer {...this.props} />
    )
  }
}

export default App;