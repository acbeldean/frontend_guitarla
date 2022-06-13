import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '../helpers'
import styles from '../styles/Post.module.css'

const PostCourse = ({ course }) => {
    const { title, image, content, published_at, url } = course

    return (
        <article>
            <Image
                priority='true'
                layout='responsive'
                width={800}
                height={600}
                src={image.url}
                alt={`post image ${title}`}
            />
            <div className={styles.content}>
                <h3>{title}</h3>
                <p className={styles.date}>{formatDate(published_at)}</p>
                <p className={styles.summary}>{content}</p>
                <Link
                    href={`/course/${url}`}
                >
                    <a className={styles.link}>
                        Read Post
                    </a>
                </Link>
            </div>
        </article>
    )
}

export default PostCourse