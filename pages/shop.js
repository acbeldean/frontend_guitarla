import Layout from '../components/Layout'
import Listing from '../components/Listing'

const Shop = ({ guitars }) => {
    return (
        <Layout
            page={'Shop'}
        >
            <main className='contenedor'>
                <h1 className='heading'>Our Collection</h1>
                <Listing
                    guitars={guitars}
                />
            </main>
        </Layout>
    )
}

export async function getStaticProps() {
    const url = `${process.env.API_URL}/guitars?_sort=createdAt:desc`
    const response = await fetch(url)
    const guitars = await response.json()
    return {
        props: {
            guitars
        }
    }
}

export default Shop