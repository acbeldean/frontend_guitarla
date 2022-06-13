import { createContext, useState, useEffect } from "react"
import { parseCookies, setCookie } from 'nookies'
import { toast } from 'react-toastify'

const GuitarContext = createContext()

const GuitarProvider = ({ children }) => {

    const [cart, setCart] = useState([])
    const [cartCount, setCartCount] = useState(0)

    useEffect(() => {
        const { cart: cartCookie } = parseCookies()
        if (cartCookie) {
            setCart(JSON.parse(cartCookie))
        }
    }, [])

    useEffect(() => {
        setCookie(null, 'cart', JSON.stringify(cart), {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        })

        let count = 0
        if (cart.length > 0) {
            cart.forEach(prod => count += prod.quantity)
        }
        setCartCount(count)
    }, [cart])

    const addToCart = product => {
        if (cart.some(piece => piece._id === product._id)) {
            const updatedCart = cart.map(piece => {
                if (piece._id === product._id) {
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
            if (piece._id === product._id) {
                increase ? piece.quantity++ : piece.quantity > 1 && piece.quantity--
            }
            return piece
        })
        setCart(updatedCart)
    }

    const deleteProduct = id => {
        const updatedCart = cart.filter(product => product._id !== id)
        setCart(updatedCart)
        toast.success('Item removed from cart.')
    }

    return (
        <GuitarContext.Provider
            value={{
                cart, setCart,
                cartCount,
                updateQuantity,
                addToCart,
                deleteProduct,
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