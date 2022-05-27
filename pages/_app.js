import { useState, useEffect } from "react"
import '../styles/normalize.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
    const [cart, setCart] = useState([])
    
    useEffect(() => {
        const cartLS = JSON.parse(localStorage.getItem('cart')) ?? []
        setCart(cartLS)
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
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
    }

    return <Component {...pageProps}
        cart={cart}
        addToCart={addToCart}
        updateQuantity={updateQuantity}
        deleteProduct={deleteProduct}
    />
}

export default MyApp
