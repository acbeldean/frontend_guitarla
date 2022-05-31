import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/Header.module.css'
import useGuitar from '../hooks/useGuitar'

const Header = ({ guitar }) => {
    const router = useRouter()

    const { cartCount } = useGuitar()
    
    return (
        <header className={styles.header}>
            <div className='contenedor'>
                <div className={styles.bar}>
                    <Link href='/'>
                        <a>
                            <Image
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
                    <Link href='/about'>About Us</Link>
                    <Link href='/shop'>Shop</Link>
                    <Link href='/cart'>
                        <a>
                            <Image
                                layout='fixed'
                                width={20}
                                height={15}
                                src='/img/cart.png'
                                alt='Cart image'
                            />
                            {cartCount > 0 && (<span className={styles.cartCount}>{cartCount}</span>)}
                        </a>
                    </Link>
                </nav>
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
                        layout='fixed'
                        width={500}
                        height={1000}
                        src="/img/header_guitar.png"
                        alt="guitar header image"
                    />
                </div>
            )}
        </header>
    )
}

export default Header