import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/user.interface';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  user!: User | null;
  userForm!: FormGroup;

  nameChanged: boolean = false;
  imageSrc!: string;
  imageForm!: FormGroup;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.currentUser$.subscribe((user: any) => {
      this.user = { ...user, name: user?.name as string };
    });

    this.userForm = new FormGroup({
      name: new FormControl(this.user?.name, Validators.required),
    });

    this.imageForm = new FormGroup({
      picture: new FormControl('', Validators.required),
    });
  }

  userFormSubmit() {
    if (this.userForm.valid) {
      const currentUser = this.userService.currentUser$.value;
      const newUser = {
        ...currentUser,
        name: this.userForm.get('name')?.value,
      } as User;
      this.userService.currentUser$.next(newUser);

      const user = {
        name: this.userForm.get('name')?.value,
        id: String(this.user?._id),
      };
      this.userService.changeUserName(user).subscribe();
      this.nameChanged = true;
    }
    this.userForm.reset();
    this.router.navigate(['/home']);
  }

  onImagePicked(event: any) {
    const file = event.target.files[0];
    this.imageForm.patchValue({ picture: file });
    this.imageForm?.get('picture')?.updateValueAndValidity();
    const reader = new FileReader();

    reader.onload = () => {
      this.imageSrc = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  changePhoto() {
    if (this.imageForm.valid) {
      const user = { picture: this.imageSrc, id: String(this.user?._id) };
      this.userService.changeUserPicture(user).subscribe((user) => {
        this.userService.currentUser$.next(user as User);
        this.imageForm.reset();
      });
    }
  }
}
