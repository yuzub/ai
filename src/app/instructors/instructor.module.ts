import { NgModule } from "@angular/core";
// import {CommonModule} from '@angular/common';
import { InstructorListComponent } from "./instructor-list.component";
import { InstructorDetailComponent } from "./instructor-detail.component";
// import { StarComponent } from "../shared/star.component";
// import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    // CommonModule, FormsModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    InstructorListComponent,
    InstructorDetailComponent,
    // StarComponent
  ]
})
export class InstructorModule {}
