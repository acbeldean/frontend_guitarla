import { useState, useEffect } from "react"
import Layout from "../../components/Layout"
import Error from "../../components/Error"
import Loader from "../../components/Loader"
import axios from "axios"
import nookies from 'nookies'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'Yup'
import { toast } from 'react-toastify'
import useAuth from "../../hooks/useAuth"
import styles from '../../styles/Register.module.css'

const profile = ({ user }) => {

    const [loading, setLoading] = useState(false)

    const { auth, setAuth } = useAuth()

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
            .min(6, 'Password must have 6 characters or more')
            .max(40, 'Password cannot have more than 40 characters'),
        passwordConfirm: Yup.string()
            .oneOf([Yup.ref('password'), null], "Passwords don't match")
    })

    const handleSubmit = async values => {
        setLoading(true)
        try {
            const url = `${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`
            let formData = {
                name: values.name,
                email: values.email,
                username: values.email
            }
            if (values.password !== '') {
                formData = { ...formData, password: values.password }
            }
            const { data } = await axios.put(url, formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.token}`
                }
            })
            const { name, email } = data
            user.name = name
            user.email = email
            setAuth({ ...auth, name })
            setLoading(false)
            toast.success('User updated.')
        } catch (error) {
            if (typeof error.response.data.message === 'object') {
                if (error.response.data.message[0].messages[0].message === 'username.alreadyTaken.') {
                    toast.error('Email is already taken.')
                } else {
                    toast.error('There was an error with the request.')
                }
            } else {
                toast.error(error.response.data.message)
            }
            setLoading(false)
        }
    }

    return (
        <Layout
            page={'Profile'}
        >
            <h1 className="heading">Profile</h1>
            <main className='contenedor'>
                {loading ? <Loader /> : (
                    <Formik
                        initialValues={{
                            name: user.name,
                            email: user.email,
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
                                        value='save changes'
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
    if (token === undefined) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    let user = {}
    try {
        const url = `${process.env.API_URL}/users/me`
        const { data } = await axios(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        const { name, email, id } = data
        user = { name, email, id }
    } catch (error) {
        nookies.destroy(ctx, 'token', {
            path: '/'
        })
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }

    return {
        props: { user }
    }
}

export default profile