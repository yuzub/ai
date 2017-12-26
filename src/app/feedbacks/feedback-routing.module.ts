import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { FeedbackListComponent } from "./feedback-list.component";
import { FeedbackEditComponent } from "./feedback-edit.component";
import { RequireAuthGuard } from "../auth/guards/require-auth.guard";


const routes: Routes = [
  { path: 'feedbacks', canActivate: [RequireAuthGuard], component: FeedbackListComponent },
  { path: 'feedbacks/:id/edit', canActivate: [RequireAuthGuard], component: FeedbackEditComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule {}
