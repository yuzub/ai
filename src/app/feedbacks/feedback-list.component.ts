import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AfDbService } from '../shared/af-db.service';
import { IInstructor } from '../instructors/instructor';
import { IFeedback } from './feedback';

@Component({
  templateUrl: './feedback-list.component.html'
})
export class FeedbackListComponent implements OnInit {
  feedbacks$: Observable<IFeedback[]>;
  pageTitle: string = 'Feedback List';
  instructors$: Observable<IInstructor[]>;
  constructor(private afDb: AfDbService) {}

  ngOnInit() {
    this.feedbacks$ = this.getFeedbacks();
    this.instructors$ = this.afDb.getInstructors();
  }

  getFeedbacks(instructorKey?: string) {
    return this.afDb.getFeedbacks(instructorKey);
  }
}
