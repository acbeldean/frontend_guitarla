import { createContext, useState, useEffect } from "react"
import { parseCookies, destroyCookie } from 'nookies'
import { useRouter } from "next/router"
import axios from "axios"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({})
    const [authLoading, setAuthLoading] = useState(true)

    const router = useRouter()

    useEffect(() => {
        const getAuth = async () => {
            const { token } = parseCookies()
            if (token) {
                setAuthLoading(true)
                const url = `${process.env.NEXT_PUBLIC_API_URL}/users/me`
                await axios(url, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }).then(function (response) {
                    const { username } = response.data
                    setAuth({
                        username,
                        token
                    })
                    setAuthLoading(false)
                }).catch(function (error) {
                    destroyCookie(null, 'token')
                    setAuthLoading(false)
                })
            } else {
                setTimeout(() => {
                    setAuthLoading(false)
                }, 300);
            }
        }
        getAuth()
    }, [])

    const logOut = () => {
        destroyCookie(null, 'token')
        setAuth({})
        router.push('/')
    }

    return (
        <AuthContext.Provider
            value={{
                auth, setAuth,
                authLoading,
                logOut
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext