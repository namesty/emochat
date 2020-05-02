import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import { PrivateRoute } from './core/components/PrivateRoute';
import { AuthService } from './features/auth/domain/auth-service';
import { UserList } from './features/user/ui/userList';
import { ConversationScreen } from './features/conversation/ui/conversationScreen';
import { Login } from './features/auth/ui/login';

function App() {

  //TODO: maybe make this static since it is not being injected
  const authServ = new AuthService()

  return (
    <Router>
      <Route path="/home" exact>
        <ConversationScreen authService={authServ}/>
      </Route>
      <Route path="/login" exact component={Login} />
      <Route path="/users" exact component={UserList} />
    </Router>
  );
}

export default App;
