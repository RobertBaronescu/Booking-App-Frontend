export interface Booking {
  _id: string;
  startDate: Date;
  endDate: Date;
  numberOfDays: number;
  price: number;
  guests: string;
  userId: string;
  roomId: string;
  hostId: string;
}
