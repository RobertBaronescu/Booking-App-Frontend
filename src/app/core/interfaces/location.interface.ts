import { Room } from './room.interface';

export interface Location {
  _id: number;
  name: string;
  nickName: string;
  image: string;
  description: string;
  rooms: Room[];
}
