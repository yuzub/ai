import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { InstructorModule } from './instructors/instructor.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';


import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { FeedbackListComponent } from './feedbacks/feedback-list.component';

import { PageNotFoundComponent } from './shared/page-not-found.component';

import { AfDbService } from './shared/af-db.service';

@NgModule({
  declarations: [
    AppComponent, WelcomeComponent,
    FeedbackListComponent, PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    InstructorModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/firedatabase, only needed for database features
    AngularFireAuthModule // imports firebase/auth, only needed for auth features
  ],
  providers: [
    AfDbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
