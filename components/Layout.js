import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from "react-scroll-to-top";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children, page, guitar }) => {
    return (
        <div>
            <Head>
                <title>GuitarLA - {page}</title>
                <meta name="description" content="Guitar web shop" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ScrollToTop
                smooth
                top='200'
                color='#e99401'
                viewBox="0 0 32 32"
                svgPath="M8 20.695l7.997-11.39L24 20.695z"
            />

            <Header
                guitar={guitar}
            />

            {children}

            <ToastContainer />

            <Footer />
        </div>
    )
}

Layout.defaultProps = {
    guitar: null
}

export default Layout