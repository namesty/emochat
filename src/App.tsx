import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import { Home } from './pages/home';
import { Login } from './pages/login';
import { PrivateRoute } from './core/components/PrivateRoute';
import { AuthService } from './features/auth/domain/auth-service';
import { Contacts } from './pages/contacts';

function App() {

  //TODO: maybe make this static since it is not being injected
  const authServ = new AuthService()

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login/">Login</Link>
            </li>
          </ul>
        </nav>
        <PrivateRoute path="/" exact component={Home} authSerivce={authServ}/>
        <Route path="/login" exact component={Login} />
        <Route path="/contacts" exact component={Contacts} />
      </div>
    </Router>
  );
}

export default App;
