import { Booking } from './booking.interface';

export interface BookingGuests extends Booking {
  userName: string;
  userPicture: string;
}
