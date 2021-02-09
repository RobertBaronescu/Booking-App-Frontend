import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
})
export class UserAccountComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  redirectToPersonalInfo() {
    this.router.navigate(['/user/personal-info']);
  }

  redirectToLogin() {
    this.router.navigate(['/user/login-security']);
  }
}
