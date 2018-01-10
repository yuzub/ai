import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { InstructorModule } from './instructors/instructor.module';
import { FeedbackModule } from './feedbacks/feedback.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';


import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './shared/page-not-found.component';

import { AfDbService } from './shared/af-db.service';
import { AuthService } from './auth/auth.service';
// import { RequireAuthGuard } from './auth/guards/require-auth.guard';

import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  declarations: [
    AppComponent, WelcomeComponent, PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    CarouselModule.forRoot(),
    AuthModule,
    InstructorModule,
    FeedbackModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/firedatabase, only needed for database features
    AngularFireAuthModule // imports firebase/auth, only needed for auth features
  ],
  providers: [
    AfDbService,
    AuthService,
    // RequireAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
