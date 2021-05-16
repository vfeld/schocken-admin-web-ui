import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormCard from './FormCard'
import { observer } from 'mobx-react-lite'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';


const InviteForm = observer( ({server, path, inviteToken, csrfToken}) => {

    const [loginName, setLoginName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(() => {
      csrfToken.updateToken()
// eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const cred = {
        login_name: loginName,
        password: password,
        email: email,
        first_name: firstName,
        last_name: lastName
      };

      const api = server + path + "/" + inviteToken;
  
      fetch(api, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Csrf-Token': csrfToken.value,
          },
          credentials: 'include',
          body: JSON.stringify(cred )
        })
        .then(res => console.log("Invite:",res));
    };
  
    return (
      <>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicLoginName">
            <Form.Label>Login Name </Form.Label>
            <Form.Control type="text" placeholder="Login name" value={loginName} onChange={(e) => setLoginName(e.target.value)}/>
          </Form.Group>
  
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address </Form.Label>
            <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </Form.Group>

          <Form.Group controlId="formBasicFirstName">
            <Form.Label>First Name </Form.Label>
            <Form.Control type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
          </Form.Group>

          <Form.Group controlId="formBasicLastName">
            <Form.Label>Last Name </Form.Label>
            <Form.Control type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
          </Form.Group>
 
  
          <Button variant="primary" type="submit" disabled={csrfToken.value === ''}>
            Submit
          </Button>
        </Form>
      </>
    );
  });

  const Invite = ({server, path, inviteType, csrfToken}) => {
    const { token } = useParams();
    return (
      <>
      <FormCard title={inviteType}>
        <InviteForm server={server} path={path} inviteToken={token} csrfToken={csrfToken}/>
      </FormCard>
      </>
    );
  };

export default Invite;
  