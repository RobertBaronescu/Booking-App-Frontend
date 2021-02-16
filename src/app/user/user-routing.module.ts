import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserAccountComponent } from './pages/user-account/user-account.component';
import { UserBookingsComponent } from './pages/user-bookings/user-bookings.component';
import { AddEditRoomComponent } from './components/add-edit-room/add-edit-room.component';
import { AddRoomStartComponent } from './pages/add-room-start/add-room-start.component';
import { EditRoomComponent } from './pages/edit-room/edit-room.component';
import { HostGuestsComponent } from './pages/host-guests/host-guests.component';
import { HostRoomsComponent } from './pages/host-rooms/host-rooms.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { UserSecurityComponent } from './pages/user-security/user-security.component';

const routes: Routes = [
  { path: '', component: UserProfileComponent },
  {
    path: 'account',
    component: UserAccountComponent,
  },
  {
    path: 'info',
    component: UserInfoComponent,
  },
  { path: 'security', component: UserSecurityComponent },
  { path: 'room/start', component: AddRoomStartComponent },
  { path: 'room/add', component: AddEditRoomComponent },
  { path: 'room/list', component: HostRoomsComponent },
  { path: 'room/edit/:roomId', component: EditRoomComponent },
  { path: 'bookings', component: UserBookingsComponent },
  { path: 'guests', component: HostGuestsComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
