import { GuitarProvider } from "../context/GuitarProvider"
import '../styles/normalize.css'
import '../styles/globals.css'
import { AuthProvider } from "../context/AuthProvider"

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <GuitarProvider>
                <Component {...pageProps} />
            </GuitarProvider>
        </AuthProvider>
    )
}

export default MyApp