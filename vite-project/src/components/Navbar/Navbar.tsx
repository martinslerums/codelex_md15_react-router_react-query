import styles from "./Navbar.module.css"
import { Link } from "react-router-dom"

const Navbar = () => {
    return ( 
        <nav className={styles.navbar}>
            <div className={styles.links}>
                <Link to="/">Home </Link>
                <Link to="/movies">Movies</Link>
                <Link to="/about">About</Link>
            </div>
        </nav> 
    );
}
 
export default Navbar
