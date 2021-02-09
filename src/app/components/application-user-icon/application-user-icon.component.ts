import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'application-user-icon',
  templateUrl: './application-user-icon.component.html',
  styleUrls: ['./application-user-icon.component.scss'],
})
export class ApplicationUserIconComponent implements OnInit {
  user!: any;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userService.currentUser$.subscribe((user) => {
      this.user = user;
    });
  
  }

  logOut() {
    this.authService.signOut();
    this.userService.currentUser$.next(null);
  }
}
