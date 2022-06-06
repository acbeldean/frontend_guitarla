import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Guitar.module.css'

const Guitar = ({ guitar }) => {
    const { name, description, image, price, url } = guitar

    return (
        <div className={styles.guitar}>
            <Image
                priority
                layout='responsive'
                width={200}
                height={350}
                src={image.url}
                alt={`${name} image`}
            />
            <div className={styles.content}>
                <h3>{name}</h3>
                <p className={styles.description}>{description}</p>
                <p className={styles.price}>${price}</p>
                <Link href={`/guitars/${url}`}>
                    <a className={styles.link}>
                        View Product
                    </a>
                </Link>

            </div>
        </div>
    )
}

export default Guitar