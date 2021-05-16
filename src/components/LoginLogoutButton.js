import Button from 'react-bootstrap/Button';
import { observer } from 'mobx-react-lite'
import { useHistory } from "react-router-dom";

const LoginLogoutButton = observer(({ server, path, loginState, csrfToken }) => {
    const history = useHistory();

    const toggle = (e) => {
        e.preventDefault();
        if (csrfToken.isLogin()) {
            loginState.logout(server, path, csrfToken);
            //TODO: handle logout error
            history.push("/");
        } else {
            history.push("/login");
        }
    }
    return (
        <>
            <Button onClick={toggle} >
                {csrfToken.isLogin() ? 'Logout' : 'Login'} 
            </Button>
        </>
    );
});

export default LoginLogoutButton;
