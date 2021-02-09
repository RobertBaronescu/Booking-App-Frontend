import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { SharedModule } from '../shared/shared.module';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { AddRoomFirstPageComponent } from './components/add-room-first-page/add-room-first-page.component';
import { AddRoomSecondPageComponent } from './components/add-room-second-page/add-room-second-page.component';
import { RoomAddedComponent } from './components/room-added/room-added.component';
import { UserBookingsComponent } from './components/user-bookings/user-bookings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginSecurityComponent } from './components/login-security/login-security.component';

@NgModule({
  declarations: [
    UserProfileComponent,
    UserAccountComponent,
    PersonalInfoComponent,
    AddRoomFirstPageComponent,
    AddRoomSecondPageComponent,
    RoomAddedComponent,
    UserBookingsComponent,
    LoginSecurityComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
})
export class UserModule {}
