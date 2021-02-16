import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserAccountComponent } from './pages/user-account/user-account.component';
import { SharedModule } from '../shared/shared.module';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { UserBookingsComponent } from './pages/user-bookings/user-bookings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEditRoomComponent } from './components/add-edit-room/add-edit-room.component';
import { AddRoomStartComponent } from './pages/add-room-start/add-room-start.component';
import { EditRoomComponent } from './pages/edit-room/edit-room.component';
import { AddRoomComponent } from './pages/add-room/add-room.component';
import { HostRoomsComponent } from './pages/host-rooms/host-rooms.component';
import { HostGuestsComponent } from './pages/host-guests/host-guests.component';
import { UserSecurityComponent } from './pages/user-security/user-security.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { BookingsGuestsComponent } from './components/bookings-guests/bookings-guests.component';

@NgModule({
  declarations: [
    UserProfileComponent,
    UserAccountComponent,
    UserInfoComponent,
    AddRoomStartComponent,
    AddRoomComponent,
    UserBookingsComponent,
    UserSecurityComponent,
    AddEditRoomComponent,
    EditRoomComponent,
    HostRoomsComponent,
    HostGuestsComponent,
    BookingsGuestsComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDropzoneModule,

  ],
  providers: [],
})
export class UserModule {}
