import Searchbar from "./Searchbar/Searchbar";

import styles from "./Search.module.css";

const Search: React.FC = () => {
    return (
        <div className={`${styles.search}`}>
            <Searchbar />
        </div>
    )
}

export default Search;