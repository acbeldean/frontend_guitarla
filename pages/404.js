import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/NotFound.module.css'

const NotFound = () => {
    return (
        <>
            <Head>
                <title>GuitarLA - Not Found</title>
                <meta name="description" content="Guitar web shop" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.notFound}>
                <h1>404 | Page not found</h1>
                <Link href='/'>
                    <a className={styles.link}>
                        back home
                    </a>
                </Link>
            </div>
        </>
    )
}

export default NotFound