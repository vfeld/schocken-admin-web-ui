import './App.css';
import Login from './components/Login';
import LoginState from './model/login';
import { createCsrfToken } from './model/csrf';
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
import { onSnapshot } from "mobx-state-tree";

const authServer = 'https://localhost:8443'
const csrfToken  = createCsrfToken(authServer);
const loginState = LoginState.create();

onSnapshot(csrfToken, snapshot => {
  console.log("onSnapshot",snapshot)
  localStorage.setItem("csrfToken",JSON.stringify(snapshot))
});

const App = () => (
  <>
    <CsrfFetcher server={authServer} path='/api/auth/csrf' csrfToken={csrfToken}/>
    <Router>
      <AppNav server={authServer} path='/api/auth/session' loginState={loginState} csrfToken={csrfToken}/>
      <Switch>
        <Route path='/login'>
          <Login server={authServer} path='/api/auth/session' loginState={loginState} csrfToken={csrfToken}/>
        </Route>
        <Route path='/register/day0/:token'>
          <Invite server={authServer} path='/api/auth/register/day0' inviteType='Day-0 Registration' csrfToken={csrfToken}/>
        </Route>
        <Route path='/register/invite/:token'>
          <Invite server={authServer} path='/api/auth/register/invite' inviteType='Register' csrfToken={csrfToken}/>
        </Route>        
        <Route path='/'>
          <Home/>
        </Route>
      </Switch>
    </Router>
  </>
);

export default App;
