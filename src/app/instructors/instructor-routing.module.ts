import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { InstructorListComponent } from "./instructor-list.component";
import { InstructorDetailComponent } from "./instructor-detail.component";
import { InstructorEditComponent } from "./instructor-edit.component";
// import { InstructorCreateComponent } from "./instructor-create.component";

import { InstructorGuardService } from "./instructor-guard.service";
import { RequireAuthGuard } from "../auth/guards/require-auth.guard";
import { AdminGuard } from "../auth/guards/admin.guard";

const routes: Routes = [
  { path: 'instructors', canActivate: [RequireAuthGuard], component: InstructorListComponent },
  // { path: 'instructors/new', canActivate: [RequireAuthGuard], component: InstructorCreateComponent },
  { path: 'instructors/:id', canActivate: [RequireAuthGuard], component: InstructorDetailComponent },
  { path: 'instructors/:id/edit', canActivate: [RequireAuthGuard, AdminGuard], component: InstructorEditComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorRoutingModule { }
