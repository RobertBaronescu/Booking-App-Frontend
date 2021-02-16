import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomSingleComponent } from './pages/room-single/room-single.component';

const routes: Routes = [
  {
    path: ':roomId',
    component: RoomSingleComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomsRoutingModule {}
