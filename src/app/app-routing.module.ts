import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './shared/page-not-found.component';

import { InstructorListComponent } from './instructors/instructor-list.component';
import { InstructorDetailComponent } from './instructors/instructor-detail.component';
import { InstructorGuardService } from './instructors/instructor-guard.service';

import { FeedbackListComponent } from './feedbacks/feedback-list.component';

const routes: Routes = [
  { path: 'feedbacks', component: FeedbackListComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
