import { HTMLAttributes } from 'react';

export interface RatingProps extends HTMLAttributes<HTMLDivElement> {
  appearance?: "rating-card_position";
  rating: number;
}