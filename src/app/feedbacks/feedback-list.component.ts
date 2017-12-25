import { Component, OnInit } from '@angular/core';
import { AngularFireAction } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';

import { AfDbService } from '../shared/af-db.service';
import { IInstructor } from '../instructors/instructor';
import { IFeedback } from './feedback';

@Component({
  templateUrl: './feedback-list.component.html'
})
export class FeedbackListComponent implements OnInit {
  feedbacks$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  pageTitle: string = 'Feedback List';
  instructors$: Observable<IInstructor[]>;
  constructor(private afDb: AfDbService) { }

  ngOnInit() {
    this.feedbacks$ = this.afDb.getFeedbacks();
    this.instructors$ = this.afDb.getInstructors();
  }

  getFeedbacks(): Observable<AngularFireAction<firebase.database.DataSnapshot>[]> {
    return this.afDb.getFeedbacks();
  }

  filterFeedbacksBy(iKey: string|null): void {
    this.afDb.filterFeedbacksBy( (iKey === 'null' ? null : iKey) );
  }
}
