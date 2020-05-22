import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import { AuthService } from './features/auth/domain/auth-service';
import { UserList } from './features/user/ui/userList';
import { Login } from './features/auth/ui/login';
import { ConversationScreen } from './features/conversation/ui/conversationScreen';
import { Signup } from './features/auth/ui/signup';
import Modal from 'react-modal'

Modal.setAppElement('#root');

function App() {

  //TODO: maybe make this static since it is not being injected
  const authServ = new AuthService()

  return (
    <Router>
      <Route path="/home" exact>
        <ConversationScreen authService={authServ}/>
      </Route>
      <Route path="/" exact>
        <ConversationScreen authService={authServ}/>
      </Route>
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/users" exact component={UserList} />
    </Router>
  );
}

export default App;
