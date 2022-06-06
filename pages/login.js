import Layout from "../components/Layout"
import Error from "../components/Error"
import axios from "axios"
import nookies from 'nookies'
import { setCookie } from 'nookies'
import { useRouter } from "next/router"
import { Formik, Form, Field } from 'formik'
import * as Yup from 'Yup'
import { toast } from 'react-toastify';
import useGuitar from "../hooks/useGuitar"
import styles from '../styles/Register.module.css'

const login = () => {
    const router = useRouter()

    const { setUser } = useGuitar()

    const userSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email format').required('Email cannot be blank'),
        password: Yup.string().required('Password cannot be blank'),
    })

    const handleSubmit = async values => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/local`
        await axios.post(url, {
            identifier: values.email,
            password: values.password
        }).then(function (response) {
            let user = {
                jtw: response.data.jwt,
                id: response.data.user.id,
                username: response.data.user.username,
                email: response.data.user.email
            }
            setCookie(null, 'user', JSON.stringify(user), {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            })
            setUser(user)
            router.push('/')
        }).catch(function (error) {
            toast.error('Incorrect credentials.')
        });
    }

    return (
        <Layout
            page={'Login'}
        >
            <h1 className="heading">Login</h1>
            <main className='contenedor'>
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    onSubmit={(values, { resetForm }) => {
                        handleSubmit(values)
                        resetForm()
                    }}
                    validationSchema={userSchema}
                >
                    {({ errors, touched }) => {
                        return (
                            <Form className={styles.form}>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <Field
                                        id='email'
                                        name='email'
                                        type='email'
                                        placeholder='myemail@example.com'
                                    />
                                    {errors.email && touched.email ? (
                                        <Error>{errors.email}</Error>
                                    ) : null}
                                </div>
                                <div>
                                    <label htmlFor="password">Password</label>
                                    <Field
                                        id='password'
                                        name='password'
                                        type='password'
                                        placeholder='**********'
                                    />
                                    {errors.password && touched.password ? (
                                        <Error>{errors.password}</Error>
                                    ) : null}
                                </div>
                                <input
                                    type='submit'
                                    value='login'
                                />
                            </Form>
                        )
                    }}
                </Formik>
            </main>
        </Layout>
    )
}

export async function getServerSideProps(ctx) {
    const user = nookies.get(ctx).user
    if (user !== undefined) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    return {
        props: {}
    }
}

export default login