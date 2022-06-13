import { useRouter } from 'next/router'
import Course from './Course'
import PostCourse from './PostCourse'
import styles from '../styles/Blog.module.css'

const CourseList = ({ courses }) => {

    const router = useRouter()

    return (
        <>
            <h2 className='heading'>Courses</h2>

            {router.pathname === '/courses' ? (
                <div className={styles.blog}>
                    {courses.map(course => (
                        <PostCourse
                            key={course.id}
                            course={course}
                        />
                    ))}
                </div>
            ) : (
                <div>
                    {courses.map((course, index) => (
                        <Course
                            key={course.id}
                            index={index}
                            course={course}
                        />
                    ))}
                </div>
            )}
        </>
    )
}

export default CourseList