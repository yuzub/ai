import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';


import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { InstructorListComponent } from './instructors/instructor-list.component';
import { FeedbackListComponent } from './feedbacks/feedback-list.component';

import { AfDbService } from './shared/af-db.service';
import { StarComponent } from './shared/star.component';


@NgModule({
  declarations: [
    AppComponent, WelcomeComponent, InstructorListComponent, FeedbackListComponent, StarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/firedatabase, only needed for database features
    AngularFireAuthModule // imports firebase/auth, only needed for auth features
  ],
  providers: [AfDbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
