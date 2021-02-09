import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Room } from 'src/app/core/interfaces/room.interface';
import { RoomService } from 'src/app/core/services/room.service';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss'],
})
export class RoomCardComponent implements OnInit {
  @Input() room!: Room;

  constructor(
    private router: Router,
    private roomService: RoomService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  navigateToRoom() {
    const locationId = this.route.snapshot.paramMap.get('id');
    this.router.navigate([`location/${locationId}/rooms/${this.room._id}`]);
    
    // this.roomService.getRoom(this.room.id).subscribe((room) => {
    //   console.log(room);
    // });
  }
}
