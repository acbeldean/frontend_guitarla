import Layout from '../components/Layout'
import Listing from '../components/Listing'
import Course from '../components/Course'
import BlogList from '../components/BlogList'

export default function Home({ guitars, course, posts }) {
    return (
        <Layout
            page={'Home'}
            guitar={guitars[8]}
        >
            <main className='contenedor'>
                <h1 className='heading'>Our Collection</h1>
                <Listing
                    guitars={guitars}
                />
            </main>
            <Course
                course={course}
            />
            <section className='contenedor'>
                <BlogList
                    posts={posts}
                />
            </section>
        </Layout>
    )
}

export async function getServerSideProps() {
    const urlGuitars = `${process.env.API_URL}/guitars?_sort=createdAt:desc`
    const urlCourses = `${process.env.API_URL}/courses`
    const urlBlog = `${process.env.API_URL}/blogs?_limit=3&_sort=createdAt:desc`

    const [responseGuitars, responseCourses, responseBlog] = await Promise.all([
        fetch(urlGuitars),
        fetch(urlCourses),
        fetch(urlBlog)
    ])

    const [guitars, course, posts] = await Promise.all([
        responseGuitars.json(),
        responseCourses.json(),
        responseBlog.json()
    ])

    return {
        props: {
            guitars,
            course,
            posts
        }
    }
}