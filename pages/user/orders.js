import Link from 'next/link'
import Layout from "../../components/Layout"
import { parseCookies, destroyCookie } from 'nookies'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import styles from '../../styles/Orders.module.css'
import { formatDateLong } from '../../helpers'
import { useEffect, useState } from 'react'
import Loader from '../../components/Loader'
import axios from 'axios'
import { useRouter } from 'next/router'
import useAuth from '../../hooks/useAuth'

const Orders = () => {

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    const {setAuth} = useAuth()

    const router = useRouter()

    useEffect(() => {
        const getOrders = async () => {
            const token = parseCookies().token
            try {
                const url = `${process.env.NEXT_PUBLIC_API_URL}/orders?_sort=createdAt:desc`
                const { data } = await axios(url, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                })
                const filteredData = data.map(order => {
                    const { cart, owner, published_at, updatedAt, __v, ...newOrder } = order
                    return newOrder
                })
                setOrders(filteredData)
                setLoading(false)
            } catch (error) {
                destroyCookie({}, 'token', {
                    path: '/'
                })
                setAuth({})
                router.push('/')
            }
        }
        getOrders()
    }, [])

    return (
        <Layout
            page={'Order History'}
        >
            <main className='contenedor'>
                <h1 className='heading'>Order History</h1>

                {loading ? <Loader /> : (
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
                )}
            </main>
        </Layout>
    )
}

export default Orders