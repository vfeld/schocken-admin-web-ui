import { useEffect, } from 'react';
import useInterval from '../hooks/useInterval';

export const CsrfFetcher = ({ server, path, csrfToken }) => {

    useEffect(() => {
        const handler = event => {
        if (event.origin !== server)
            return;
        csrfToken.setValue(event.data);
        }

        window.addEventListener("message", handler)
    
        // clean up
        return () => window.removeEventListener("message", handler)
    });
    
    const provideCsrfToken = () => {
        const w = document.getElementById('csrf_fetcher_frame').contentWindow;
        if (w === null) return;
        w.postMessage('GET_CSRF_TOKEN', server);
    }
    
    useInterval(
        () => {
        if (csrfToken.value === '') {
            provideCsrfToken();
        }
        },
        (csrfToken.value === '') ? 100 : null,
    )
    const api = server + path;

    return (
        <>
        <iframe title="CSRF Fetcher Frame" src={api} id='csrf_fetcher_frame' style={{position: 'absolute', width: '0', height: '0', border:'0' }} />
        </>
    );
}

export default CsrfFetcher;
