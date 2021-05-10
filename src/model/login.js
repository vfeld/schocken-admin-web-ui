import { types } from "mobx-state-tree";

const LoginState = types
    .model("LoginState",{
        isLogin: types.optional(types.boolean,false),
        hasError: types.optional(types.boolean,false),
        error: types.optional(types.string,""),
    })
    .actions(self => ({
        setLoginStatus(value) {
            self.isLogin = value
        },
        setError(reason) {
          self.hasError = true;
          self.error = reason;
        },
        clearError() {
          self.hasError = false;
          self.error = "";
        }
    }));

export default LoginState;
