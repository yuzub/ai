import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';
import { InstructorListComponent } from './instructors/instructor-list.component';
import { FeedbackListComponent } from './feedbacks/feedback-list.component';

const routes: Routes = [
  {path: 'instructors', component: InstructorListComponent},
  {path: 'instructors/:id', component: InstructorListComponent},
  {path: 'feedbacks', component: FeedbackListComponent},
  {path: '', component: WelcomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
