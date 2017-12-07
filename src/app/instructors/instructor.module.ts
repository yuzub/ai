import { NgModule } from "@angular/core";
import { InstructorListComponent } from "./instructor-list.component";
import { InstructorDetailComponent } from "./instructor-detail.component";
import { InstructorEditComponent } from "./instructor-edit.component";

import { SharedModule } from "../shared/shared.module";
import { InstructorRoutingModule } from "./instructor-routing.module";

import { InstructorGuardService } from "./instructor-guard.service";

@NgModule({
  imports: [
    SharedModule,
    InstructorRoutingModule
  ],
  declarations: [
    InstructorListComponent,
    InstructorDetailComponent,
    InstructorEditComponent
  ],
  providers: [InstructorGuardService]
})
export class InstructorModule {}
