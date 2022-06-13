import { useState } from "react"
import Layout from "../components/Layout"
import Error from "../components/Error"
import Loader from "../components/Loader"
import axios from "axios"
import nookies from 'nookies'
import { setCookie } from "nookies"
import { useRouter } from "next/router"
import { Formik, Form, Field } from 'formik'
import * as Yup from 'Yup'
import { toast } from 'react-toastify'
import useAuth from "../hooks/useAuth"
import styles from '../styles/Register.module.css'

const Register = () => {

    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const { setAuth } = useAuth()

    const userSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name cannot be blank')
            .min(6, 'Name must have 6 characters or more')
            .max(40, 'Name cannot have more than 40 characters')
            .matches(/^[aA-zZ\s]+$/, 'Name can only contain Latin letters'),
        email: Yup.string()
            .required('Email cannot be blank')
            .email('Invalid email format')
            .max(40, 'email cannot have more than 40 characters'),
        password: Yup.string()
            .required('Password cannot be blank')
            .min(6, 'Password must have 6 characters or more')
            .max(40, 'Password cannot have more than 40 characters'),
        passwordConfirm: Yup.string()
            .required("Passwords don't match")
            .oneOf([Yup.ref('password'), null], "Passwords don't match")
    })

    const handleSubmit = async values => {
        setLoading(true)
        const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`
        try {
            const { data } = await axios.post(url, {
                name: values.name,
                email: values.email,
                username: values.email,
                password: values.password
            })
            const { jwt: token, user } = data
            const { name } = user
            setAuth({ token, name })
            setCookie(null, 'token', token, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            })
            if (router.query.path) {
                router.push(router.query.path)
            } else {
                router.push('/')
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message[0].messages[0].message)
            } else {
                console.log(error)
            }
            setLoading(false)
        }
    }

    return (
        <Layout
            page={'Register'}
        >
            <h1 className="heading">Register</h1>
            <main className='contenedor'>
                {loading ? <Loader /> : (
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            password: '',
                            passwordConfirm: ''
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
                                        <label htmlFor="name">Name</label>
                                        <Field
                                            id='name'
                                            name='name'
                                            type='text'
                                            placeholder='Johnny Test'
                                        />
                                        {errors.name && touched.name ? (
                                            <Error>{errors.name}</Error>
                                        ) : null}
                                    </div>
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
                                    <div>
                                        <label htmlFor="passwordConfirm">Repeat Password</label>
                                        <Field
                                            id='passwordConfirm'
                                            name='passwordConfirm'
                                            type='password'
                                            placeholder='**********'
                                        />
                                        {errors.passwordConfirm && touched.passwordConfirm ? (
                                            <Error>{errors.passwordConfirm}</Error>
                                        ) : null}
                                    </div>
                                    <input
                                        type='submit'
                                        value='register'
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

export default Register