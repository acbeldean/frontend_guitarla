import { createContext, useState, useEffect } from "react"
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { useRouter } from "next/router"
import { toast } from 'react-toastify'

const GuitarContext = createContext()

const GuitarProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [user, setUser] = useState({})

    const router = useRouter()

    useEffect(() => {
        const userCookie = parseCookies().user ? JSON.parse(parseCookies().user) : {}
        setUser(userCookie)
        const cartLS = JSON.parse(localStorage.getItem('cart')) ?? []
        setCart(cartLS)
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))

        let count = 0
        if (cart.length > 0) {
            cart.forEach(prod => count += prod.quantity)
        }
        setCartCount(count)
    }, [cart])

    const addToCart = product => {
        if (cart.some(piece => piece.id === product.id)) {
            const updatedCart = cart.map(piece => {
                if (piece.id === product.id) {
                    piece.quantity += product.quantity
                }
                return piece
            })
            setCart(updatedCart)
        } else {
            setCart([...cart, product])
        }
        toast.success('Item added to cart.')
    }

    const updateQuantity = (product, increase) => {
        const updatedCart = cart.map(piece => {
            if (piece.id === product.id) {
                increase ? piece.quantity++ : piece.quantity > 1 && piece.quantity--
            }
            return piece
        })
        setCart(updatedCart)
    }

    const deleteProduct = id => {
        const updatedCart = cart.filter(product => product.id !== id)
        setCart(updatedCart)
        toast.success('Item removed from cart.')
    }

    const logOut = () => {
        destroyCookie(null, 'user')
        setUser({})
        router.push('/')
    }

    return (
        <GuitarContext.Provider
            value={{
                cart,
                cartCount,
                user, setUser,
                updateQuantity,
                addToCart,
                deleteProduct,
                logOut
            }}
        >
            {children}
        </GuitarContext.Provider>
    )
}

export {
    GuitarProvider
}

export default GuitarContext