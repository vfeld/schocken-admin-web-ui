import './App.css';
import Login from './components/Login';
import LoginState from './model/login';
import { createCsrfToken , CsrfToken } from './model/csrf';
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
import { onSnapshot ,applySnapshot, getSnapshot} from "mobx-state-tree";

const authServer = 'https://localhost:8443'
const csrfToken  = createCsrfToken(authServer);

if (localStorage.getItem("csrfToken")) {
  const json = JSON.parse(localStorage.getItem("csrfToken"));
  if(CsrfToken.is(json)) 
    applySnapshot(csrfToken,json);
}

onSnapshot(csrfToken, snapshot => {
  console.log("onSnapshot",snapshot)
  localStorage.setItem("csrfToken",JSON.stringify(snapshot))
});

setInterval(() => {
  console.log("App::setInterval",csrfToken.isExpired(), csrfToken.isLogin(), getSnapshot(csrfToken))
  if (csrfToken.isExpired()) {
    csrfToken.updateToken()
  }
},60000)

const loginState = LoginState.create();



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
