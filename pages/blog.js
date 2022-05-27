import Layout from '../components/Layout'
import BlogList from '../components/BlogList'

const Blog = ({ posts }) => {

    return (
        <Layout
            page={'Blog'}
        >
            <main className='contenedor'>
                <BlogList
                    posts={posts}
                />
            </main>
        </Layout>
    )
}

export async function getStaticProps() {
    const url = `${process.env.API_URL}/blogs?_sort=createdAt:desc`
    const response = await fetch(url)
    const posts = await response.json()

    return {
        props: {
            posts
        }
    }
}

export default Blog