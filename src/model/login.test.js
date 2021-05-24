import LoginState from './login';
import createCsrfToken from './csrf';


describe('testing login', () => {
    beforeEach(() => {
      fetch.resetMocks()
    })
   
    it('does sucessfull login', () => {
      fetch.mockResponseOnce()
      const authServer = 'https://localhost:8443'
      const csrfToken  = createCsrfToken(authServer);
      const loginState = LoginState.create();
      loginState.login(authServer,'/api/auth/session','ab','1234',csrfToken).then(res => {
        expect(res).toEqual(true)
        expect(loginState.isLogin).toEqual(true)
      })
   
      //assert on the times called and arguments given to fetch
      expect(fetch.mock.calls.length).toEqual(1)
      expect(fetch.mock.calls[0][0]).toEqual('https://localhost:8443/api/auth/session')
    })

    it('tries unauthorized login ', () => {
      fetch.mockResponseOnce('Unauthorized', { status: 401 })
      const authServer = 'https://localhost:8443'
      const csrfToken  = createCsrfToken(authServer);
      const loginState = LoginState.create();
      loginState.login(authServer,'/api/auth/session','ab','1234',csrfToken).then(res => {
        expect(res).toEqual(false)
        expect(loginState.isLogin).toEqual(false)
      })
   
      //assert on the times called and arguments given to fetch
      expect(fetch.mock.calls.length).toEqual(1)
      expect(fetch.mock.calls[0][0]).toEqual('https://localhost:8443/api/auth/session')
    })
    
    it('does sucessfull logout', () => {
      fetch.mockResponseOnce()
      const authServer = 'https://localhost:8443'
      const csrfToken  = createCsrfToken(authServer);
      const loginState = LoginState.create();
      loginState.logout(authServer,'/api/auth/session',csrfToken).then(res => {
        expect(res).toEqual(true)
        expect(loginState.isLogin).toEqual(false)
      })
   
      //assert on the times called and arguments given to fetch
      expect(fetch.mock.calls.length).toEqual(1)
      expect(fetch.mock.calls[0][0]).toEqual('https://localhost:8443/api/auth/session')
    })
    
  })