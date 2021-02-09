import { Review } from './review.interface';

export interface Room {
  _id: string;
  name: string;
  address: string;
  type: string;
  smallDescription: string;
  theSpace: string;
  interactionWithGuests: string;
  ameneties?: string;
  price: string;
  image: string;
  reviews: Review[];
}
