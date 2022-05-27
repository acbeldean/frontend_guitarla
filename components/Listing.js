import Guitar from "./Guitar"
import styles from '../styles/Listing.module.css'

const Listing = ({ guitars }) => {
    return (
        <div className={styles.listing}>
            {guitars.map(guitar => (
                <Guitar
                    key={guitar.url}
                    guitar={guitar}
                />
            ))}
        </div>
    )
}

export default Listing