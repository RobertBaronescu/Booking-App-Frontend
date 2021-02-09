import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  roomCards = [1, 2, 3, 4, 5, 6];

  constructor() {}

  ngOnInit(): void {}
}
