import { Review } from './review.interface';

export interface Room {
  _id: string;
  name: string;
  address: string;
  type: string;
  intro: string;
  description: string;
  interactionWithGuests: string;
  amenities?: string[];
  price: string;
  thumbnail: string;
  reviews: Review[];
  reservations: any[];
  rating: number;
  hostName: string;
  hostPicture: string;
  hostId?: string;
  photos: string[];
}
