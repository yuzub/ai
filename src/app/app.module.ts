import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { InstructorModule } from './instructors/instructor.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';


import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
// import { InstructorListComponent } from './instructors/instructor-list.component';
// import { InstructorDetailComponent } from './instructors/instructor-detail.component';
import { FeedbackListComponent } from './feedbacks/feedback-list.component';

// import { StarComponent } from './shared/star.component';
import { PageNotFoundComponent } from './shared/page-not-found.component';

import { AfDbService } from './shared/af-db.service';
import { InstructorGuardService } from './instructors/instructor-guard.service';


@NgModule({
  declarations: [
    AppComponent, WelcomeComponent,
    // InstructorListComponent, InstructorDetailComponent, StarComponent,
    FeedbackListComponent, PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    // FormsModule,
    InstructorModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/firedatabase, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AppRoutingModule
  ],
  providers: [AfDbService, InstructorGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
