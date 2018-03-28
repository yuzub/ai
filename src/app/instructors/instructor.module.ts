import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { SharedModule } from "../shared/shared.module";
import { InstructorRoutingModule } from "./instructor-routing.module";

import { InstructorListComponent } from "./instructor-list.component";
import { InstructorDetailComponent } from "./instructor-detail.component";
import { InstructorEditComponent } from "./instructor-edit.component";
import { InstructorCreateComponent } from "./instructor-create.component";

import { InstructorGuardService } from "./instructor-guard.service";

import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@NgModule({
  imports: [
    ButtonsModule.forRoot(),
    TimepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    SharedModule,
    InstructorRoutingModule
  ],
  declarations: [
    InstructorListComponent,
    InstructorDetailComponent,
    InstructorEditComponent,
    InstructorCreateComponent
  ],
  providers: [InstructorGuardService]
})
export class InstructorModule { }
