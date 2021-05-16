import { types } from "mobx-state-tree";

export const CsrfToken = types
    .model("CsrfToken",{
        value: types.optional(types.string, ""),
        //oldValue: types.optional(types.string, ""),
        iframeKey: types.optional(types.integer, 0),
        updatePending: types.optional(types.boolean,true),
        //token_expiry: types.optional(types.integer, 0),
        //session_expiry: types.optional(types.integer, 0),
    })
    .views(self => ({
        isExpired() {
            if (self.value === '') return true;
            // CSRF token has a unix epoch expiration value appended
            const token_expiry = parseInt(self.value.split('_')[1]);
            // is token expired?
            return ((token_expiry * 1000) < Date.now())
        },
        isLogin() {
            // is session expired?
            if (self.value === '') return false;
            // CSRF token has a unix epoch session expiration value appended
            const session_expiry = parseInt(self.value.split('_')[2]);
            // is session expired?
            return ((session_expiry * 1000) >= Date.now())
        },
    }))
    .actions(self => ({
        setValue(value) {
            if (value === null ) {
                self.value = ''
            } else {
                self.value = value
                //check whether the token comming in is something old
                const token_expiry = parseInt(value.split('_')[1]);
                if ((token_expiry * 1000) >= Date.now()) {
                    self.updatePending = false;
                }
            }
            //if (value === '') return;
            //if (value !== self.oldValue) {
                //self.oldValue = self.value;
                //self.value = value
                // CSRF token has a unix epoch expiration value appended
                //self.token_expiry = parseInt(self.value.split('_')[1]);
                // CSRF token has a unix epoch session expiration value appended
                //self.session_expiry = parseInt(self.value.split('_')[2]);
            //}
        },
        updateToken() {
            //if (self.updatePending === true) return;
            self.iframeKey += 1;
            self.updatePending = true;
            //self.value = '';
        },
    }));

export const createCsrfToken = (authServer) => {
    const csrfToken = CsrfToken.create();
    const handler = event => {
        if (event.origin !== authServer)
            return;
        csrfToken.setValue(event.data);
    }
    window.addEventListener("message", handler);
    return csrfToken;
}

export default createCsrfToken;