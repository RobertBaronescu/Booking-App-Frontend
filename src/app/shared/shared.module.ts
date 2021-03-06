import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntlModule } from '@progress/kendo-angular-intl';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { RoomCardComponent } from './components/room-card/room-card.component';
import { StarsComponent } from './stars/stars.component';

@NgModule({
  declarations: [RoomCardComponent, StarsComponent],
  imports: [
    CommonModule,
    IntlModule,
    DateInputsModule,
    LabelModule,
    DropDownsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    RoomCardComponent,
    IntlModule,
    DateInputsModule,
    LabelModule,
    DropDownsModule,
    StarsComponent,
  ],
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
    };
  }
}
