import { useMemo } from "react"
import Layout from "../../components/Layout"
import nookies from 'nookies'
import axios from "axios"
import { useTable } from 'react-table'

const orders = ({ orders }) => {

    console.log(orders)

    const headers = [
        {
            Header: '',
            accessor: 'image',
        },
        {
            Header: 'Product',
            accessor: 'name',
        },
        {
            Header: 'Price',
            accessor: 'price',
        },
        {
            Header: 'Quantity',
            accessor: 'quantity',
        },
        {
            Header: 'Total',
            accessor: 'total',
        },
    ]
    const columns = useMemo(() => headers, [])

    const data = useMemo(
        () => [
            {
                image: 'Hello',
                name: 'World',
                price: '',
                quantity: 23,
                total: 7263
            }
        ],
        []
    )

    const tableInstance = useTable({ columns, data })
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    return (
        <Layout
            page={'Orders'}
        >
            <main className='contenedor'>
                <h1 className='heading'>My Orders</h1>

                <table {...getTableProps()}>
                    <thead>
                        {// Loop over the header rows
                            headerGroups.map(headerGroup => (
                                // Apply the header row props
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {// Loop over the headers in each row
                                        headerGroup.headers.map(column => (
                                            // Apply the header cell props
                                            <th {...column.getHeaderProps()}>
                                                {// Render the header
                                                    column.render('Header')}
                                            </th>
                                        ))}
                                </tr>
                            ))}
                    </thead>
                    {/* Apply the table body props */}
                    <tbody {...getTableBodyProps()}>
                        {// Loop over the table rows
                            rows.map(row => {
                                // Prepare the row for display
                                prepareRow(row)
                                return (
                                    // Apply the row props
                                    <tr {...row.getRowProps()}>
                                        {// Loop over the rows cells
                                            row.cells.map(cell => {
                                                // Apply the cell props
                                                return (
                                                    <td {...cell.getCellProps()}>
                                                        {// Render the cell contents
                                                            cell.render('Cell')}
                                                    </td>
                                                )
                                            })}
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>

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