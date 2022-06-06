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

const register = () => {
    const router = useRouter()

    const { setUser } = useGuitar()

    const userSchema = Yup.object().shape({
        username: Yup.string()
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
        const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`
        await axios.post(url, {
            username: values.username,
            email: values.email,
            password: values.password
        }).then(function (response) {
            router.push('/login')
        }).catch(function (error) {
            toast.error('There was an error with the request !')
        });
    }

    return (
        <Layout
            page={'Register'}
        >
            <h1 className="heading">Register</h1>
            <main className='contenedor'>
                <Formik
                    initialValues={{
                        username: '',
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
                                    <label htmlFor="username">Name</label>
                                    <Field
                                        id='username'
                                        name='username'
                                        type='text'
                                        placeholder='Johnny Test'
                                    />
                                    {errors.username && touched.username ? (
                                        <Error>{errors.username}</Error>
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

export default register