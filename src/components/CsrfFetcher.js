import { observer } from 'mobx-react-lite'


export const CsrfFetcher = observer(({ server, path, csrfToken }) => {
    const api = server + path;

    return (
        <>
            <iframe title="CSRF Fetcher Frame" key={csrfToken.iframeKey } src={api} id='csrf_fetcher_frame' style={{ position: 'absolute', width: '0', height: '0', border: '0' }} />
        </>
    );
})

export default CsrfFetcher;
