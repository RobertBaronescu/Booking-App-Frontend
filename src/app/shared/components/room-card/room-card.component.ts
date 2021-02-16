import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Input() isEditable: boolean = false;

  @Output() editClick = new EventEmitter<string>();

  @Output() navigateClick = new EventEmitter<string>();

  @Output() deleteClick = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  navigateToRoom() {
    this.navigateClick.emit(this.room._id);
  }

  editEmit() {
    this.editClick.emit(this.room._id);
  }

  deleteEmit() {
    this.deleteClick.emit(this.room._id);
  }
}
