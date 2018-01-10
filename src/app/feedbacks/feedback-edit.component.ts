import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

import { AfDbService } from "../shared/af-db.service";
import { AuthService } from "../auth/auth.service";

import { IFeedback } from "./feedback";
import { IInstructor } from "../instructors/instructor";

@Component({
  templateUrl: './feedback-edit.component.html'
})
export class FeedbackEditComponent implements OnInit, OnDestroy {
  subscriptioN: Subscription;
  isNewFeedback: boolean;
  pageTitle: string = 'Feedback Edit';
  // instructor: IFeedback = new Feedback();
  feedback$: Observable<IFeedback>;
  instructors$: Observable<IInstructor[]>;

  hasInstructorError: boolean = false;

  constructor(
    private afDbService: AfDbService,
    // private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let id: string = this.activatedRoute.snapshot.paramMap.get('id');
    // let id: string = this.activatedRoute.snapshot.params['id'];
    this.pageTitle += `: ${id}`;
    this.isNewFeedback = id === 'new';

    this.instructors$ = this.afDbService.getInstructors();

    if (!this.isNewFeedback) {
      this.feedback$ = this.getFeedback(id);
    } else {
      this.feedback$ = Observable.of({}) as Observable<IFeedback>;
    }

    // this.subscriptioN = this.feedback$
    //   .subscribe(
    //   i => {
    //     console.log('i-edit - feedback$.subscribe got value: ', i);
    //     // console.log(i.feedbackName);
    //     this.feedback = i;
    //   },
    //   error => {
    //     console.log('i-edit - feedback$.subscribe got error: ', error);
    //   },
    //   () => console.log('i-edit - feedback$.subscribe - completed')
    // );

  }

  ngOnDestroy() {
    // this.subscriptioN.unsubscribe();
  }

  getFeedback(key: string): Observable<IFeedback> {
    return this.afDbService.getFeedback(key);
  }

  saveFeedback2in1(feedback: IFeedback) {
    const save = this.isNewFeedback
      ? this.afDbService.createFeedback(feedback)
      : this.afDbService.updateFeedback(feedback);
    save.then(_ => {
      console.log('saveFeedback 2in1 navigate to /feedbacks');
      this.router.navigate(['/feedbacks']);
    });
  }

  deleteFeedback(feedback: IFeedback) {
    this.afDbService.deleteFeedback(feedback)
      .then(_ => {
        console.log('deleteFeedback navigate to /feedbacks');
        this.router.navigate(['/feedbacks']);
      });
  }

  onBack() {
    this.router.navigate(['/feedbacks']);
  }

  save(feedbackForm: NgForm) {
    console.log(feedbackForm.form);
    console.log('Saved: ' + JSON.stringify(feedbackForm.value));
  }

  validateInstructor(value) {
    console.log(`instructor value: ${value}`);
    this.hasInstructorError = !value;
  }
}
