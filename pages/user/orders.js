import Layout from "../../components/Layout"
import nookies from 'nookies'

const orders = () => {

    return (
        <Layout
            page={'Login'}
        >
            <main className='contenedor'>
                
            </main>
        </Layout>
    )
}

export async function getServerSideProps(ctx) {
    const jwt = nookies.get(ctx).jwt
    if (jwt === undefined) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }
    return {
        props: {}
    }
}

export default orders