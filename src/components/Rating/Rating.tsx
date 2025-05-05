import styles from "./Rating.module.css";
import cn from 'classnames';
import { RatingProps } from "./Rating.props";

function Rating({className, appearance, rating, ...props}: RatingProps) {
  return (
    <div {...props} className={cn(styles.rating, className, {
      [styles["position"]]: appearance === "rating-card_position"
    })}>
        <span>{rating}</span>
        <img className={styles["rating__img"]} src="./rating.svg" alt="" />
    </div>
  )
}

export default Rating;