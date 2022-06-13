import Link from 'next/link'
import Layout from "../../components/Layout"
import nookies from 'nookies'
import axios from "axios"
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import styles from '../../styles/Orders.module.css'
import { formatDateLong } from '../../helpers'

const Orders = ({ orders }) => {
    return (
        <Layout
            page={'Order History'}
        >
            <main className='contenedor'>
                <h1 className='heading'>Order History</h1>

                <Table className={styles.table}>
                    <Thead>
                        <Tr>
                            <Th>ORDER</Th>
                            <Th>DATE</Th>
                            <Th>STATUS</Th>
                            <Th>TOTAL</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {orders.length === 0 ? (
                            <Tr><Td colSpan="4">No orders have been placed</Td></Tr>
                        ) :
                            orders.map(o => (
                                <Tr key={o._id}>
                                    <Td>
                                        <Link
                                            href={`/user/order/${o._id}`}
                                        >
                                            {o._id}
                                        </Link>
                                    </Td>
                                    <Td>{formatDateLong(o.createdAt)}</Td>
                                    <Td>{o.status}</Td>
                                    <Td><span className={styles.price}>${o.total}</span></Td>
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            </main>
        </Layout>
    )
}

export async function getServerSideProps(ctx) {
    const token = nookies.get(ctx).token
    if (token === undefined) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }
    let orders = []
    try {
        const url = `${process.env.API_URL}/orders?_sort=createdAt:desc`
        const { data } = await axios(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        orders = data.map(order => {
            const { cart, owner, published_at, updatedAt, __v, ...newOrder } = order
            return newOrder
        })
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
            orders
        }
    }
}

export default Orders