import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Loader from '../components/Loader'
import styles from '../styles/Header.module.css'
import useGuitar from '../hooks/useGuitar'
import useAuth from '../hooks/useAuth'

const Header = ({ guitar }) => {

    const [active, setActive] = useState(false)

    const router = useRouter()

    const { cartCount } = useGuitar()

    const { auth, authLoading, logOut } = useAuth()
    const { name } = auth

    return (
        <header className={styles.header}>
            <div className='contenedor'>
                <div className={styles.bar}>
                    <Link href='/'>
                        <a>
                            <Image
                                priority
                                width={400}
                                height={100}
                                src={'/img/logo.svg'}
                                alt='Logo image'
                            />
                        </a>
                    </Link>
                </div>

                <nav className={styles.navBar}>
                    <Link href='/'>Home</Link>
                    <Link href='/blog'>Blog</Link>
                    <Link href='/courses'>Courses</Link>
                    <Link href='/about'>About Us</Link>
                    <Link href='/shop'>Shop</Link>
                    <Link href='/cart'>
                        <a>
                            <Image
                                layout='fixed'
                                width={20}
                                height={15}
                                src='/img/cart.png'
                                alt='Cart icon'
                            />
                            {cartCount > 0 && (<span className={styles.cartCount}>{cartCount}</span>)}
                        </a>
                    </Link>
                </nav>

                {authLoading ? (
                    <div className={styles.loader}>
                        <Loader />
                    </div>
                ) : name ?
                    (
                        <nav className={styles.dropdown}>
                            <button
                                type='button'
                                onClick={() => setActive(!active)}
                            >
                                {name}
                                <Image
                                    layout='fixed'
                                    width={20}
                                    height={22}
                                    src='/img/user.png'
                                    alt='User icon'
                                />
                            </button>
                            <ul className={`${active ? styles.active : ''}`}>
                                <li><Link href='/user/profile'>Profile</Link></li>
                                <li><Link href='/user/orders'>My Orders</Link></li>
                                <li><a onClick={() => logOut()}>Log Out</a></li>
                            </ul>
                        </nav>
                    ) : (
                        <nav className={styles.userNavBar}>
                            <Link href='/login'>Login</Link>
                            <Link href='/register'>Register</Link>
                        </nav>
                    )}

                {guitar && (
                    <div className={styles.model}>
                        <h2>{guitar.name}</h2>
                        <p>{guitar.description}</p>
                        <p className={styles.price}>${guitar.price}</p>
                        <Link href={`/guitars/${guitar.url}`}>
                            <a className={styles.link}>
                                View product
                            </a>
                        </Link>
                    </div>
                )}
            </div>

            {router.pathname === '/' && (
                <div className={styles.guitar}>
                    <Image
                        priority
                        layout='fixed'
                        width={500}
                        height={1000}
                        src="/img/header_guitar.png"
                        alt="guitar header image"
                    />
                </div>
            )}
        </header >

    )
}

export default Header
