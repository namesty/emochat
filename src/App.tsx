import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import { Login } from './features/auth/ui/login';
import { ChatScreen } from './features/conversation/ui/chat/chatScreen';
import { Signup } from './features/auth/ui/signup';
import Modal from 'react-modal'
import { Statistics } from './features/conversation/ui/statistics/statistics';
import { ProtectedRoute } from './features/auth/ui/protectedRoute';

Modal.setAppElement('#root');

function App() {

  return (
    <Switch>
      <ProtectedRoute path="/" exact component={ChatScreen} />
      <ProtectedRoute path="/home" exact component={ChatScreen} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <ProtectedRoute path="/stats" exact component={Statistics} />
    </Switch>
  );
}

export default App;
