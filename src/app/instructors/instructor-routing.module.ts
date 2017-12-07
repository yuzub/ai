import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { InstructorListComponent } from "./instructor-list.component";
import { InstructorDetailComponent } from "./instructor-detail.component";
import { InstructorEditComponent } from "./instructor-edit.component";

import { InstructorGuardService } from "./instructor-guard.service";

const routes: Routes = [
  { path: 'instructors', component: InstructorListComponent },
  { path: 'instructors/:id', canActivate: [InstructorGuardService], component: InstructorDetailComponent },
  { path: 'instructors/:id/edit', component: InstructorEditComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorRoutingModule {}
