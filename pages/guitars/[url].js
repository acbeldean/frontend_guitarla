import { useState } from "react"
import Image from 'next/image'
import Layout from "../../components/Layout"
import Link from 'next/link'
import styles from '../../styles/Guitar.module.css'

const Product = ({ guitar, addToCart }) => {
    const [quantity, setQuantity] = useState(1)

    const { id, name, description, image, price, url } = guitar[0]

    const handleSubmit = e => {
        e.preventDefault()

        if (quantity > 0) {
            const chosenGuitar = {
                id,
                image: image.url,
                name,
                price,
                quantity
            }
            addToCart(chosenGuitar)
        }
    }

    return (
        <Layout
            page={name.toUpperCase()}
        >
            <div className={styles.guitar}>
                <Image
                    layout='responsive'
                    width={180}
                    height={350}
                    src={image.url}
                    alt={`${name} guitar image`}
                />
                <div className={styles.content}>
                    <h3>{name}</h3>
                    <p className={styles.description}>{description}</p>
                    <p className={styles.price}>${price}</p>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <label>Quantity:</label>
                        <select
                            value={quantity}
                            onChange={e => setQuantity(parseInt(e.target.value))}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <input type="submit" value='add to cart' />
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ query: { url } }) {
    const urlGuitar = `${process.env.API_URL}/guitars?url=${url}`
    const response = await fetch(urlGuitar)
    const guitar = await response.json()

    return {
        props: {
            guitar
        }
    }
}

export default Product