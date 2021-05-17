import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form';
import FormCard from './FormCard'
import { observer } from 'mobx-react-lite'
import { useState } from 'react';
import { useHistory } from "react-router-dom";

const LoginForm = observer(({ server, path, loginState, csrfToken }) => {
  const history = useHistory();

  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    loginState.login(server, path, loginName, password, csrfToken)
      .then(succ => {
        if (succ) {
          setLoginName("");
          setPassword("");
          setError("");
          history.push("/");
        } else {
          setError("you are not authorized, wrong password?");
        }
      })
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicLoginName">
          <Form.Label>Login Name </Form.Label>
          <Form.Control type="text" placeholder="Login name" value={loginName} onChange={(e) => { setLoginName(e.target.value); setError("") }} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value); setError("") }} />
        </Form.Group>
        {(error === "") ? null :
          <Alert variant='danger'>Error: {error}</Alert>
        }
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
});

const Login = ({ server, path, loginState, csrfToken }) => {
  return (
    <>
      <div className="mt-5">
        <FormCard title='Login' className='shadow'>
          <LoginForm server={server} path={path} loginState={loginState} csrfToken={csrfToken} />
        </FormCard>
      </div>
    </>
  );
};

export default Login;
