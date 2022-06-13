import Layout from '../components/Layout'
import CourseList from '../components/CourseList'

const Courses = ({ courses }) => {

    return (
        <Layout
            page={'Courses'}
        >
            <main className='contenedor'>
                <CourseList
                    courses={courses}
                />
            </main>
        </Layout>
    )
}

export async function getStaticProps() {
    const url = `${process.env.API_URL}/courses?_sort=createdAt:desc`
    const response = await fetch(url)
    const courses = await response.json()

    return {
        props: {
            courses
        }
    }
}

export default Courses