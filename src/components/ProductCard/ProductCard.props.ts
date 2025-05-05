import { HTMLAttributes } from 'react';

export interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  price: number;
  img: string;
  rating: number;
  productName: string;
  ingredients: string;
}