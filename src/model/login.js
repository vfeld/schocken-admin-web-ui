import { types, flow } from "mobx-state-tree";

const localFetch = window.fetch;

const LoginState = types
  .model("LoginState", {
    isLogin: types.optional(types.boolean, false),
  })
  .actions(self => ({
    login: flow(function* (server,path,loginName,password,csrfToken) {
      console.log("INFO: Login in ...")
      const api = server + path;
      const cred = {
        login_name: loginName,
        password: password
      };
      const resp = yield localFetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Csrf-Token': csrfToken.value,
        },
        credentials: 'include',
        body: JSON.stringify(cred)
      }).catch(e => console.log("... unable to access backend:",e)
      );
      if (resp && resp.status === 200) {
        console.log("... login was successfull")
        self.isLogin = true;
        return true;
      } else {
        console.log("... login was not successfull")
        return self.isLogin;
      }
    }),
    logout: flow(function* (server,path,csrfToken) {
      console.log("INFO: Login out ...")
      const api = server + path;

      const resp = yield localFetch(api, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Csrf-Token': csrfToken.value,
        },
        credentials: 'include',
      }).catch(e => console.log("... unable to access backend:",e));
      if (resp && resp.status === 200) {
        console.log("... logout was successfull")
        self.isLogin = false;
        return true;
      } else if (resp && resp.status === 401) {
        console.log("... already logged out")
        self.isLogin = false;
        return true;
      } else {
        console.log("... logout was not successfull")
        return self.isLogin;
      }
    })
  }));

export default LoginState;
