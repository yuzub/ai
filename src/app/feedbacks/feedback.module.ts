import { NgModule } from "@angular/core";
import {FormsModule} from "@angular/forms";

import { SharedModule } from "../shared/shared.module";
import { FeedbackRoutingModule } from "./feedback-routing.module";

import { FeedbackListComponent } from "./feedback-list.component";
// import { FeedbackDetailComponent } from "./feedback-detail.component";
import { FeedbackEditComponent } from "./feedback-edit.component";

// import { FeedbackGuardService } from "./feedback-guard.service";

@NgModule({
  imports: [
    SharedModule,
    FeedbackRoutingModule
  ],
  declarations: [
    FeedbackListComponent,
    // FeedbackDetailComponent,
    FeedbackEditComponent,
  ],
  providers: [
    // FeedbackGuardService
  ]
})
export class FeedbackModule {}
