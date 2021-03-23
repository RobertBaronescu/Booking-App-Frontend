import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'src/app/core/interfaces/room.interface';
import { RoomService } from 'src/app/core/services/room.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-host-rooms',
  templateUrl: './host-rooms.component.html',
  styleUrls: ['./host-rooms.component.scss'],
})
export class HostRoomsComponent implements OnInit {
  rooms!: Room[];

  constructor(
    private roomService: RoomService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.roomService
      .getRoomsByHost(String(this.userService.currentUser$.getValue()?._id))
      .subscribe((rooms) => {
        this.rooms = rooms;
      });
  }

  navigateToRoom(roomId: string) {
    this.router.navigate([`/room/${roomId}`]);
  }

  navigateToEditing(id: string) {
    this.router.navigate([`/user/room/edit/${id}`]);
  }

  deleteRoom(roomId: string) {
    this.roomService.deleteRoom(roomId).subscribe(() => {
      this.rooms = this.rooms.filter((room) => {
        return room._id !== roomId;
      });
    });
  }
}
