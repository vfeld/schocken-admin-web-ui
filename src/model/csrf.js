import { types , applySnapshot} from "mobx-state-tree";

export const CsrfToken = types
    .model("CsrfToken",{
        value: types.optional(types.string, ""),
        iframeKey: types.optional(types.integer, 0),
        updatePending: types.optional(types.boolean,true),
    })
    .views(self => ({
        willExpireIn(seconds = 30) {
            if (self.iframeKey === null) 
                console.log("do not remove me, this forces a view update after action updateToken (iframeKey is set in this action)")
            if (self.value === '') return true;
            // CSRF token has a unix epoch expiration value appended
            const token_expiry = parseInt(self.value.split('_')[1]);
            // will token expire?
            return ((token_expiry * 1000) < (Date.now() + (seconds * 1000)))
        },
        isLogin() {
            if (self.iframeKey === null) 
                console.log("do not remove me, this forces a view update after action updateToken (iframeKey is set in this action)")
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
        },
        updateToken() {
            // trigger the reload of the CSRF fetcher iframe
            if (self.iframeKey >= 999) {
                self.iframeKey = 0
            } else {
                self.iframeKey += 1;
            }
            // updatePending helps troubleshooting, but is never used
            self.updatePending = true;
        },
    }));

export const createCsrfToken = (authServer) => {
    const csrfToken = CsrfToken.create();
    const handler = event => {
        if (event.origin !== authServer)
            return;
        csrfToken.setValue(event.data);
    }
    // Listen on csrf fetcher events
    window.addEventListener("message", handler);
    // Restore csrf token from local storage
    if (localStorage.getItem("csrfToken")) {
        const json = JSON.parse(localStorage.getItem("csrfToken"));
        if(CsrfToken.is(json)) 
          applySnapshot(csrfToken,json);
    }
    // Check whether csrf token needs a refresh
    setInterval(() => {
        //console.log("App::setInterval",csrfToken.willExpireIn(), csrfToken.isLogin(), getSnapshot(csrfToken))
        if (csrfToken.willExpireIn()) {
          csrfToken.updateToken()
        }
      },60000)
    return csrfToken;
}

export default createCsrfToken;