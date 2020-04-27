import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import { UserProvider } from './context/user'
import { Home } from './features/home';
import { Login } from './features/login';
import { PrivateRoute } from './components/PrivateRoute';

function App() {

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
        <UserProvider>
          <PrivateRoute path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
        </UserProvider>
      </div>
    </Router>
  );
}

export default App;
