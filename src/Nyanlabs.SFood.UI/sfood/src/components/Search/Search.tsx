import SearchFilter from "./SearchFilter/SearchFilter";
import Searchbar from "./Searchbar/Searchbar";

import styles from "./Search.module.css";

const Search: React.FC = () => {
    return (
        <div className={`${styles.search}`}>
            <Searchbar />
            <SearchFilter />
        </div>
    )
}

export default Search;