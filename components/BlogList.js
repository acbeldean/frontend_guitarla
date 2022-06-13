import Post from './Post'
import styles from '../styles/Blog.module.css'

const BlogList = ({ posts }) => {
    return (
        <>
            <h2 className='heading'>Blog</h2>

            <div className={styles.blog}>
                {posts.map(post => (
                    <Post
                        key={post._id}
                        post={post}
                    />
                ))}
            </div>
        </>
    )
}

export default BlogList