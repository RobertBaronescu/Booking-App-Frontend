import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  users!: User[];
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  notRegistered: boolean = false;

  formSubmit() {
    if (this.loginForm.valid) {
      const user = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };

      this.authService
        .signIn(user)
        .pipe(
          tap(() => {
            this.router.navigate(['home']);
          })
        )
        .subscribe((loggedUser) => {
          this.userService.currentUser$.next(loggedUser);
        });
    }
  }

  constructor(
    private userService: UserService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    localStorage.clear();
    this.userService.currentUser$.next(null);
    this.authService.showHeaderAndFooter.next(false);
  }
}
