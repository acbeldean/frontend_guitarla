import { useState } from "react"
import Layout from "../components/Layout"
import axios from "axios"
import nookies from 'nookies'
import { setCookie } from 'nookies'

const login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/local`
    const handleSubmit = async e => {
        e.preventDefault()

        await axios.post(url, {
            identifier: email,
            password
        }).then(function (response) {
            setCookie(null, 'jwt', response.data.jwt, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            })
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <Layout
            page={'Login'}
        >
            <main className='contenedor'>
                <form onSubmit={handleSubmit}>
                    <input type='email' name='email' value={email} onChange={e => setEmail(e.target.value)} />
                    <input type='password' name='password' value={password} onChange={e => setPassword(e.target.value)} />
                    <button type="submit">login</button>
                </form>
            </main>
        </Layout>
    )
}

export async function getServerSideProps(ctx) {
    const jwt = nookies.get(ctx).jwt
    if (jwt !== undefined) {
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