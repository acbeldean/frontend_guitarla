import { useState, useEffect } from "react"
import Layout from "../components/Layout"
import Image from 'next/image'
import styles from '../styles/Cart.module.css'
import useGuitar from '../hooks/useGuitar'

const Cart = () => {
    const [total, setTotal] = useState(0)

    const { cart, updateQuantity, deleteProduct } = useGuitar()

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
                        ? 'Empty cart'
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
                    <h3>Order Summary</h3>
                    {total > 0 ? (
                        <p>Total: ${total}</p>
                    ) : (
                        <p>No products</p>
                    )}
                </div>
            </main>
        </Layout>

    )
}

export default Cart