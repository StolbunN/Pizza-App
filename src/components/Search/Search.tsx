import { SearchProps } from "./Search.props";
import styles from "./Search.module.css";
import cn from "classnames";
import { forwardRef } from "react";
import searchIcon from "../../assets/search-icon.svg";

const Search = forwardRef<HTMLInputElement, SearchProps>(function Search({ className, ...props }, ref) {
  return (
    <div className={styles["search-wrapper"]}>
      <img src={searchIcon} alt="Иконка поиска" />
      <input {...props} ref={ref} className={cn(styles["search"], className)} />
    </div>
  );
});

export default Search;