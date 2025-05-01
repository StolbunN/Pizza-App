import { SearchProps } from "./Search.props";
import styles from "./Search.module.css"
import cn from "classnames";
import { forwardRef } from "react";

const Search = forwardRef<HTMLInputElement, SearchProps>(function Search({className, ...props}, ref) {
  return (
    <div className={styles["search-wrapper"]}>
      <img src="./search.svg" alt="Иконка поиска" />
      <input {...props} ref={ref} className={cn(styles['search'], className)}/>
    </div>
  )
})

export default Search;