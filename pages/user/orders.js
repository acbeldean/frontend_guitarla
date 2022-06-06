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
    const user = nookies.get(ctx).user
    if (user === undefined) {
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