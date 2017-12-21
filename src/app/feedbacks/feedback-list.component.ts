import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AfDbService } from '../shared/af-db.service';
import { IInstructor } from '../instructors/instructor';
import { IFeedback } from './feedback';

@Component({
  templateUrl: './feedback-list.component.html'
})
export class FeedbackListComponent implements OnInit {
  items$: any;
  feedbacks$: Observable<IFeedback[]>;
  pageTitle: string = 'Feedback List';
  instructors$: Observable<IInstructor[]>;
  constructor(private afDb: AfDbService) { }

  ngOnInit() {
    this.items$ = this.afDb.items$;
    this.feedbacks$ = <Observable<IFeedback[]>>this.items$;
    // this.feedbacks$ = this.getFeedbacks();
    this.instructors$ = this.afDb.getInstructors();
  }

  getFeedbacks() {
    return this.afDb.getFeedbacks();
  }

  filterFeedbacksBy(iKey: string|null): void {
    this.afDb.filterFeedbacksBy( (iKey === 'null' ? null : iKey) );
  }
}
