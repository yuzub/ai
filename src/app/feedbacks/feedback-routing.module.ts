import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { FeedbackListComponent } from "./feedback-list.component";
// import { FeedbackDetailComponent } from "./feedback-detail.component";
import { FeedbackEditComponent } from "./feedback-edit.component";
// import { FeedbackCreateComponent } from "./feedback-create.component";

// import { FeedbackGuardService } from "./feedback-guard.service";

const routes: Routes = [
  { path: 'feedbacks', component: FeedbackListComponent },
  // { path: 'feedbacks/new', component: FeedbackCreateComponent },
  // { path: 'feedbacks/:id', canActivate: [FeedbackGuardService], component: FeedbackDetailComponent },
  { path: 'feedbacks/:id/edit', component: FeedbackEditComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule {}
