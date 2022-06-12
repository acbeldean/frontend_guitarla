import Link from 'next/link'
import Layout from "../../components/Layout"
import nookies from 'nookies'
import axios from "axios"
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import styles from '../../styles/Orders.module.css'
import { formatDateLong } from '../../helpers'

const orders = ({ orders }) => {

    console.log(orders)


    return (
        <Layout
            page={'Orders'}
        >
            <main className='contenedor'>
                <h1 className='heading'>Order History</h1>

                <Table className={styles.table}>
                    <Thead className={styles.thead}>
                        <Tr>
                            <Th>ORDER</Th>
                            <Th>DATE</Th>
                            <Th>STATUS</Th>
                            <Th>TOTAL</Th>
                        </Tr>
                    </Thead>
                    <Tbody className={styles.tbody}>
                        {orders.map(o => (
                            <Tr key={o.id}>
                                <Td>{o.id}</Td>
                                <Td>{formatDateLong(o.createdAt)}</Td>
                                <Td>{o.status}</Td>
                                <Td>{o.total}</Td>
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
        orders = data
    } catch (error) {
        nookies.destroy(ctx, 'token')
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

export default orders