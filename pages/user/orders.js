import Layout from "../../components/Layout"
import nookies from 'nookies'

const orders = () => {

    return (
        <Layout
            page={'Orders'}
        >
            <main className='contenedor'>
                
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
            },
        };
    }
    return {
        props: {}
    }
}

export default orders