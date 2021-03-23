import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  registerForm!: FormGroup;


  defaultImageSrc: string =
    'https://cdn3.iconfinder.com/data/icons/random-icon-set/512/user-512.png';

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    public router: Router,
    public authService: AuthService
  ) {}

  formSubmit() {
    if (this.registerForm.valid) {
      const newUser: User = {
        name: this.registerForm.controls.name.value as string,
        email: this.registerForm.controls.email.value as string,
        password: this.registerForm.controls.password.value as string,
        picture: this.defaultImageSrc as string,
      };

  

      this.authService.signUp(newUser).subscribe((response) => {
        const user = response._doc;
        this.userService.currentUser$.next(user);
      });
      this.router.navigate(['/home']);
    }
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        picture: [this.defaultImageSrc],
        checkbox: [false, Validators.requiredTrue],
      },
      {
        validator: this.MustMatch('password', 'confirmPassword'),
      }
    );

    localStorage.clear();
    this.userService.currentUser$.next(null);
    this.authService.showHeaderAndFooter.next(false);
  }
}
