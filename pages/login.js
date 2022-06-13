import Layout from "../components/Layout"
import Error from "../components/Error"
import axios from "axios"
import nookies from 'nookies'
import { setCookie } from 'nookies'
import { useRouter } from "next/router"
import { Formik, Form, Field } from 'formik'
import * as Yup from 'Yup'
import { toast } from 'react-toastify';
import styles from '../styles/Register.module.css'
import useAuth from "../hooks/useAuth"
import { useState } from "react"
import Loader from "../components/Loader"

const Login = () => {

    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const { setAuth } = useAuth()

    const userSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email format').required('Email cannot be blank'),
        password: Yup.string().required('Password cannot be blank'),
    })

    const handleSubmit = async values => {
        setLoading(true)
        const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/local`
        await axios.post(url, {
            identifier: values.email,
            password: values.password
        }).then(function (response) {
            let auth = {
                name: response.data.user.name,
                token: response.data.jwt
            }
            setCookie(null, 'token', auth.token, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            })
            setAuth(auth)
            if (router.query.path) {
                router.push(router.query.path)
            } else {
                router.push('/')
            }

        }).catch(function (error) {
            toast.error('Incorrect credentials.')
            setLoading(false)
        })
    }

    return (
        <Layout
            page={'Login'}
        >
            <h1 className="heading">Login</h1>
            <main className='contenedor'>
                {loading ? <Loader /> : (
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
                )}
            </main>
        </Layout>
    )
}

export async function getServerSideProps(ctx) {
    const token = nookies.get(ctx).token
    if (token !== undefined) {
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

export default Login