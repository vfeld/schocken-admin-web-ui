import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite'
import { useHistory } from "react-router-dom";

const AppNav = observer(({ server, path, loginState, csrfToken }) => {
  const history = useHistory();

  const logout = (e) => {
    e.preventDefault();
    console.log('logout',loginState.isLogin);
    if (loginState.isLogin === false) return;

    loginState.clearError();
    const api = server + path;
    fetch(api, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Csrf-Token': csrfToken.value,
      },
      credentials: 'include',
    })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          loginState.setLoginStatus(false);
          history.push("/");
        } else {
          loginState.setError("unable to logout, retry");
        }
      });
  };

  return (
    <>
      <style type="text/css">
        {`
      .navbar {
        border-bottom:3px solid white !important;
        background-image: linear-gradient(to right, rgba(0,123,255,1), rgba(0,123,255,0), rgba(0,123,255,1)) !important;
      }
    `}
      </style>
      <Navbar expand="lg" className="border-bottom">
        <Navbar.Brand as={Link} to="/">Schocken</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Button variant="primary" onClick={logout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
})

export default AppNav;
