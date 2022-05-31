import { GuitarProvider } from "../context/GuitarProvider"
import '../styles/normalize.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
    return (
        <GuitarProvider>
            <Component {...pageProps} />
        </GuitarProvider>
    )
}

export default MyApp