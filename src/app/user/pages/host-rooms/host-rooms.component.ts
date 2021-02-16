import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'src/app/core/interfaces/room.interface';
import { LocationService } from 'src/app/core/services/location.service';
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
    private router: Router,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.roomService
      .getRoomsByHost(String(this.userService.currentUser$.getValue()?._id))
      .subscribe((rooms) => {
        this.rooms = rooms;
      });
  }

  navigateToRoom(roomId: string | undefined) {
    this.locationService
      .getLocationByRoomId(String(roomId))
      .subscribe((locationId: string) => {
        this.router.navigate([`location/${locationId}/rooms/${roomId}`]);
      });
  }

  navigateToEditing(id: string) {
    this.router.navigate([`/user/room/edit/${id}`]);
  }
}
