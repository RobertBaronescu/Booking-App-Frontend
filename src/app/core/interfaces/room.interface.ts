import { Amenity } from './amenity.interface';
import { Reservation } from './reservation.interface';
import { Review } from './review.interface';

export interface Room {
  _id: string;
  name: string;
  address: string;
  type: string;
  intro: string;
  description: string;
  interactionWithGuests: string;
  amenities: Amenity[];
  price: string;
  thumbnail: string;
  reviews: Review[];
  reservations: Reservation[];
  rating: number;
  hostName: string;
  hostPicture: string;
  hostId?: string;
  photos: string[];
}
