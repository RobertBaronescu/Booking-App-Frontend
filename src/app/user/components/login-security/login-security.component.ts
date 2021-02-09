import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/core/interfaces/user.interface';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login-security',
  templateUrl: './login-security.component.html',
  styleUrls: ['./login-security.component.scss'],
})
export class LoginSecurityComponent implements OnInit {
  passwordForm!: FormGroup;
  user!: User | null;
  passwordChanged: boolean = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.userService.currentUser$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group(
      {
        oldPassword: [this.user?.password, Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmNewPassword: ['', Validators.required],
      },
      { validator: this.MustMatch('newPassword', 'confirmNewPassword') }
    );
  }

  passwordFormSubmit() {
    if (this.passwordForm.valid) {
      const user = {
        password: this.passwordForm.controls.confirmNewPassword.value,
        id: String(this.user?._id),
      };
      this.userService.changeUserPassword(user).subscribe();
      this.passwordChanged = true;
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
}
