import { useState, useEffect } from "react"
import Layout from "../components/Layout"
import Image from 'next/image'
import Link from "next/link"
import styles from '../styles/Cart.module.css'
import useGuitar from '../hooks/useGuitar'

const Cart = () => {
    const [total, setTotal] = useState(0)

    const { cart, updateQuantity, deleteProduct, user } = useGuitar()

    useEffect(() => {
        const calcTotal = cart.reduce(
            (total, product) => total + (product.quantity * product.price), 0
        )
        setTotal(calcTotal)
    }, [cart])

    return (
        <Layout
            page={'Shopping Cart'}
        >
            <h1 className="heading">Shopping Cart</h1>
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
                            {user.id
                                ? (
                                    <button className={styles.orderButton}>
                                        Place order
                                    </button>
                                )
                                : (
                                    <>
                                        <p className={styles.error}>You must be logged in to place an order</p>
                                        <p className={styles.error}>
                                            <Link href={`/login`}>Login</Link> now or <Link href={`/register`}>Register</Link>
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
        </Layout>

    )
}

export default Cart