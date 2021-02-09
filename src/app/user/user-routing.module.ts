import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { AuthGuard } from '../shared/auth.guard';
import { AddRoomFirstPageComponent } from './components/add-room-first-page/add-room-first-page.component';
import { AddRoomSecondPageComponent } from './components/add-room-second-page/add-room-second-page.component';
import { RoomAddedComponent } from './components/room-added/room-added.component';
import { UserBookingsComponent } from './components/user-bookings/user-bookings.component';
import { LoginSecurityComponent } from './components/login-security/login-security.component';

const routes: Routes = [
  { path: '', component: UserProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'account',
    component: UserAccountComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'personal-info',
    component: PersonalInfoComponent,
    canActivate: [AuthGuard],
  },
  { path: 'add-room-first-step', component: AddRoomFirstPageComponent },
  { path: 'add-room-second-step', component: AddRoomSecondPageComponent },
  { path: 'add-room-final-step', component: RoomAddedComponent },
  { path: 'user-bookings', component: UserBookingsComponent },
  { path: 'login-security', component: LoginSecurityComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
