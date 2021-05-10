import './App.css';
import Login from './components/Login';
import LoginState from './model/login';
import CsrfToken from './model/csrf';
import Home from './components/Home';
import Invite from './components/Invite';
import AppNav from './components/AppNav';
import CsrfFetcher from './components/CsrfFetcher';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './App.css';

const loginState = LoginState.create();
const csrfToken  = CsrfToken.create( { value: "" });
const authServer = 'https://localhost:8443'

const App = () => (
  <>
    <CsrfFetcher server={authServer} path='/api/csrf' csrfToken={csrfToken}/>
    <Router>
      <AppNav server={authServer} path='/api/auth/session' loginState={loginState} csrfToken={csrfToken}/>
      <Switch>
        <Route path='/login'>
          <Login server={authServer} path='/api/auth/session' loginState={loginState} csrfToken={csrfToken}/>
        </Route>
        <Route path='/register/day0/:token'>
          <Invite server={authServer} path='/api/register/day0' inviteType='Day-0 Registration' csrfToken={csrfToken}/>
        </Route>
        <Route path='/register/invite/:token'>
          <Invite server={authServer} path='/api/register/invite' inviteType='Register' csrfToken={csrfToken}/>
        </Route>        
        <Route path='/'>
          <Home/>
        </Route>
      </Switch>
    </Router>
  </>
);

export default App;
