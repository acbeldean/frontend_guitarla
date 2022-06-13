import styles from '../styles/Course.module.css'

const Course = ({ course, index }) => {
    const { title, image, content, url } = course

    return (
        <section>
            <div className={`contenedor ${styles.grid}`}>
                <div className={`${index === 0 || (index / 2) === 1 ? styles.contentEven : styles.content}`}>
                    <h2 className='heading'>{title}</h2>
                    <p className={styles.text}>{content}</p>
                    
                    <Link
                        href={`/course/${url}`}
                    >
                        <a className={styles.link}>
                            More info
                        </a>
                    </Link>
                </div>
            </div>

            <style jsx>{`
                section {
                    padding: 0 0 5rem 0 ;
                    border-top: 1px solid var(--primary);
                    background-image: linear-gradient(to right, rgb(0 0 0 / .65), rgb(0 0 0 / .7)), url(${image.url});
                    background-size: cover;
                    background-position: center;
                }  
            `}</style>
        </section>
    )
}

export default Course