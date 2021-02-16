import { Room } from './room.interface';

export interface Location {
  _id: string;
  name: string;
  nickName: string;
  image: string;
  description: string;
  rooms: Room[];
  roomIds: string[];
}
