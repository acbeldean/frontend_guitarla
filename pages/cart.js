import { useState, useEffect } from "react"
import Layout from "../components/Layout"
import Loader from "../components/Loader"
import Image from 'next/image'
import Link from "next/link"
import styles from '../styles/Cart.module.css'
import useGuitar from '../hooks/useGuitar'
import useAuth from "../hooks/useAuth"
import { useRouter } from "next/router"
import axios from "axios"
import { toast } from "react-toastify"
import { destroyCookie } from "nookies"

const Cart = () => {
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)

    const { cart, setCart, updateQuantity, deleteProduct } = useGuitar()

    const { auth } = useAuth()

    const router = useRouter()

    useEffect(() => {
        const calcTotal = cart.reduce(
            (total, product) => total + (product.quantity * product.price), 0
        )
        setTotal(calcTotal)
    }, [cart])

    const placeOrder = async () => {
        try {
            setLoading(true)
            const url = `${process.env.NEXT_PUBLIC_API_URL}/orders`
            await axios.post(url, { cart, total }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.token}`
                }
            })
            destroyCookie(null, 'cart')
            setCart([])
            router.push('/user/orders')
        } catch (error) {
            setLoading(false)
            toast.error('There was an error with the request.')
        }
    }

    return (
        <Layout
            page={'Shopping Cart'}
        >
            <h1 className="heading">Shopping Cart</h1>

            {loading ? <Loader /> : (
                <main className={`contenedor ${styles.content}`}>
                    <div className={styles.cart}>
                        <h2>Products</h2>
                        {cart.length === 0
                            ? <p>Empty cart</p>
                            : (
                                cart.map(product => (
                                    <div
                                        key={product.id}
                                        className={styles.product}
                                    >
                                        <div>
                                            <Image
                                                layout="responsive"
                                                width={250}
                                                height={480}
                                                src={product.image}
                                                alt={`${product.name} image`}
                                            />
                                        </div>
                                        <div>
                                            <p className={styles.name}>{product.name}</p>
                                            <p>
                                                Quantity: {''}
                                                <button
                                                    className={styles.button}
                                                    type='button'
                                                    onClick={() => updateQuantity(product, false)}
                                                >-
                                                </button>
                                                {product.quantity}
                                                <button
                                                    className={styles.button}
                                                    type='button'
                                                    onClick={() => updateQuantity(product, true)}
                                                >+
                                                </button>
                                            </p>
                                            <p className={styles.price}>
                                                $<span>{product.price}</span>
                                            </p>
                                            <p className={styles.subtotal}>
                                                Subtotal: $<span>{product.price * product.quantity}</span>
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            className={styles.delete}
                                            onClick={e => deleteProduct(product.id)}
                                        >X</button>
                                    </div>
                                ))
                            )}
                    </div>
                    <div className={styles.summary}>
                        <h2>Order Summary</h2>
                        {total > 0 ? (
                            <div>
                                <p>Subtotal: ${(total - (total * 0.2)).toFixed(2)}</p>
                                <p>Tax (VAT 20%): ${(total * 0.2).toFixed(2)}</p>
                                <p>Total: <span className={styles.total}>${total}</span></p>
                                {auth.token
                                    ? (
                                        <button className={styles.orderButton} onClick={placeOrder}>
                                            Place order
                                        </button>
                                    )
                                    : (
                                        <>
                                            <p className={styles.error}>You must be logged in to place an order</p>
                                            <p className={styles.error}>
                                                <Link href={{
                                                    pathname: '/login',
                                                    query: { path: router.pathname }
                                                }}>Login</Link> now or <Link href={{
                                                    pathname: '/register',
                                                    query: { path: router.pathname },
                                                }}>Register</Link>
                                            </p>
                                        </>
                                    )
                                }
                            </div>
                        ) : (
                            <p>No products</p>
                        )}
                    </div>
                </main>
            )}
        </Layout>

    )
}

export default Cart