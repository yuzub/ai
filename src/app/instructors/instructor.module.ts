import { NgModule } from "@angular/core";
// import {CommonModule} from '@angular/common';
import { InstructorListComponent } from "./instructor-list.component";
import { InstructorDetailComponent } from "./instructor-detail.component";
// import { StarComponent } from "../shared/star.component";
// import { FormsModule } from "@angular/forms";
// import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { InstructorRoutingModule } from "./instructor-routing.module";

import { InstructorGuardService } from "./instructor-guard.service";

@NgModule({
  imports: [
    // CommonModule, FormsModule,
    // RouterModule,
    SharedModule,
    InstructorRoutingModule
  ],
  declarations: [
    InstructorListComponent,
    InstructorDetailComponent,
    // StarComponent
  ],
  providers: [InstructorGuardService]
})
export class InstructorModule {}
