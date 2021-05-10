import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormCard from './FormCard'
import { observer } from 'mobx-react-lite'
import { useState } from 'react';
import { useHistory } from "react-router-dom";



const LoginForm = observer(({ server, path, loginState, csrfToken }) => {
  const history = useHistory();

  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const cred = {
      login_name: loginName,
      password: password
    };

    const api = server + path;

    fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Csrf-Token': csrfToken.value,
      },
      credentials: 'include',
      body: JSON.stringify(cred)
    })
      .then(res => {
        if (res.status === 200) {
          loginState.setLoginStatus(true);
          setLoginName("");
          setPassword("");
          history.push("/");
        } else {
          loginState.setError("you are unauthorized, wrong password?");
        }
      });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicLoginName">
          <Form.Label>Login Name </Form.Label>
          <Form.Control type="text" placeholder="Login name" value={loginName} onChange={(e) => setLoginName(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={csrfToken.value === ''}>
          Submit
        </Button>
      </Form>
    </>
  );
});

const Login = ({ server, path, loginState, csrfToken }) => {
  return (
    <>
      <div className="shadow mt-5">
        <FormCard title='Login'>
          <LoginForm server={server} path={path} loginState={loginState} csrfToken={csrfToken} />
        </FormCard>
      </div>
    </>
  );
};

export default Login;
