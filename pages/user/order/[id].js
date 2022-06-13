import Layout from "../../../components/Layout"
import Image from 'next/image'
import styles from '../../../styles/Cart.module.css'
import axios from "axios"
import nookies from 'nookies'
import { formatDateLong } from "../../../helpers"

const Order = ({ order }) => {

    const total = order.total

    return (
        <Layout
            page={'Order Details'}
        >
            <h1 className="heading">Order Details</h1>
            <main className={`contenedor ${styles.content}`}>
                <div className={styles.cart}>
                    <h2>Products</h2>
                    {order.cart.length === 0
                        ? <p>Empty cart</p>
                        : (
                            order.cart.map(product => (
                                <div
                                    key={product._id}
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
                                            {product.quantity}
                                        </p>
                                        <p className={styles.price}>
                                            $<span>{product.price}</span>
                                        </p>
                                        <p className={styles.subtotal}>
                                            Subtotal: $<span>{product.price * product.quantity}</span>
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                </div>
                <div className={styles.summary}>
                    <h2>Order Summary</h2>
                    <div>
                        <p className={styles.total}>{formatDateLong(order.createdAt)}</p>
                        <p>Tracking: {order._id}</p>
                        <p>Status: {order.status}</p>
                        <p>Subtotal: ${(total - (total * 0.2)).toFixed(2)}</p>
                        <p>Tax (VAT 20%): ${(total * 0.2).toFixed(2)}</p>
                        <p>Total: <span className={styles.total}>${total}</span></p>
                    </div>
                </div>
            </main>
        </Layout>
    )
}

export async function getServerSideProps(ctx) {
    const token = nookies.get(ctx).token
    const { id } = ctx.query
    if (token === undefined) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }
    let order = {}
    try {
        const url = `${process.env.API_URL}/orders?_sort=createdAt:desc&id=${id}`
        const { data } = await axios(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        if (!data[0]) {
            return {
                redirect: {
                    destination: "/",
                    permanent: false,
                }
            }
        }
        const { owner, published_at, updatedAt, __v, ...newOrder } = data[0]
        order = newOrder
    } catch (error) {
        nookies.destroy(ctx, 'token', {
            path: '/'
        })
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }

    return {
        props: {
            order
        }
    }
}

export default Order