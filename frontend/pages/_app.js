// pages/_app.js
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/globals.css';
import './styles/GardensC.css';
import './styles/firasans.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        import('bootstrap/dist/js/bootstrap');
    }, []);

    return <Component {...pageProps} />;
}

export default MyApp;
