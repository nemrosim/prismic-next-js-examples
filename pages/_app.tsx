import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function MyApp({Component, pageProps}: AppProps) {
    const {events, pathname} = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleRouteChangeComplete = () => setIsLoading(false);

        events.on("routeChangeStart", (url:string) => {
            url !== pathname ? setIsLoading(true) : setIsLoading(false);
        });
        events.on("routeChangeComplete", handleRouteChangeComplete);
        events.on("routeChangeError", handleRouteChangeComplete);
    }, [events, pathname]);

    if(isLoading){
        return <h1>Loading</h1>
    }

    return <Component {...pageProps} />
}

export default MyApp
