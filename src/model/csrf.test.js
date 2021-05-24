import createCsrfToken from './csrf';
import {getSnapshot} from 'mobx-state-tree';


describe('testing csrf token', () => {
    beforeEach(() => {
        fetch.resetMocks()
    })

    it('does sucessfull initialize', () => {
        fetch.mockResponseOnce()
        const authServer = 'https://localhost:8443'
        const csrfToken = createCsrfToken(authServer);
        expect(csrfToken.value).toEqual('')
        expect(csrfToken.iframeKey).toEqual(0)
        expect(csrfToken.updatePending).toEqual(true)
        expect(csrfToken.isLogin()).toEqual(false)
        expect(csrfToken.willExpireIn()).toEqual(true)
    })

    it('does sucessfull set value', async () => {
        fetch.mockResponseOnce()
        const authServer = 'https://localhost:8443'
        const csrfToken = createCsrfToken(authServer);
        const unix = Math.floor(Date.now() / 1000) + 60
        const token = "csrftoken_" + unix + "_" + unix
        csrfToken.setValue(token)
        console.log("token", getSnapshot(csrfToken))
        expect(csrfToken.value).toEqual(token)
        expect(csrfToken.iframeKey).toEqual(0)
        expect(csrfToken.updatePending).toEqual(false)
        expect(csrfToken.isLogin()).toEqual(true)
        expect(csrfToken.willExpireIn()).toEqual(false)
    })

})