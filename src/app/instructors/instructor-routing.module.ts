import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { InstructorListComponent } from "./instructor-list.component";
import { InstructorDetailComponent } from "./instructor-detail.component";
import { InstructorGuardService } from "./instructor-guard.service";

const routes: Routes = [
  { path: 'instructors', component: InstructorListComponent },
  { path: 'instructors/:id', canActivate: [InstructorGuardService], component: InstructorDetailComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorRoutingModule {}
