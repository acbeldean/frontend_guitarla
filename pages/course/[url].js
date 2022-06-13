import Image from 'next/image'
import Layout from "../../components/Layout"
import { formatDate } from '../../helpers'
import styles from '../../styles/Post.module.css'

const BlogEntry = ({ course }) => {
    const { title, image, content, published_at } = course[0]

    return (
        <Layout
            page={title}
        >
            <main className="contenedor">
                <h1 className="heading">{title}</h1>
                <article className={styles.post}>
                    <Image
                        layout='responsive'
                        width={800}
                        height={600}
                        src={image.url}
                        alt={`image post ${title} `}
                    />
                    <div className={styles.content}>
                        <p className={styles.date}>{formatDate(published_at)}</p>
                        <p className={styles.text}>{content}</p>
                    </div>
                </article>
            </main>
        </Layout>
    )
}

export async function getStaticPaths() {
    const url = `${process.env.API_URL}/courses`
    const response = await fetch(url)
    const courses = await response.json()
    const paths = courses.map(course => ({
        params: {
            url: course.url
        }
    }))
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params: { url } }) {
    const urlCourse = `${process.env.API_URL}/courses/?url=${url}`
    const response = await fetch(urlCourse)
    const course = await response.json()
    return {
        props: {
            course
        }
    }
}

// export async function getServerSideProps({ query: { id } }) {
//     const url = `${process.env.API_URL}/blogs/${id}`
//     const response = await fetch(url)
//     const post = await response.json()
//     return {
//         props: {
//             post
//         }
//     }
// }

export default BlogEntry