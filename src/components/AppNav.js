import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite'
import LoginLogoutButton from './LoginLogoutButton';

const AppNav = observer(({ server, path, loginState, csrfToken }) => {

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
            <LoginLogoutButton variant="primary" server={server} path={path} loginState={loginState} csrfToken={csrfToken}/>
          </Nav>
        </Navbar.Collapse>  
      </Navbar>
    </>
  )
})

export default AppNav;
