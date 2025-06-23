import styles from "./Rating.module.css";
import cn from "classnames";
import { RatingProps } from "./Rating.props";
import ratingIcon from "../../assets/rating-icon.svg";

function Rating({ className, appearance, rating, ...props }: RatingProps) {
  return (
    <div {...props} className={cn(styles.rating, className, {
      [styles["position"]]: appearance === "rating-card_position"
    })}>
      <span>{rating}</span>
      <img className={styles["rating__img"]} src={ratingIcon} alt="" />
    </div>
  );
}

export default Rating;