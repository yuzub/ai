import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

import { AfDbService } from "../shared/af-db.service";
import { IInstructor, Instructor } from "./instructor";
import { NgForm } from "@angular/forms";

@Component({
  templateUrl: './instructor-edit.component.html'
})
export class InstructorEditComponent implements OnInit, OnDestroy {
  startDate: Date;
  // startDate: Date = new Date();
  // startDate: Date = new Date('Jan 1 2017');
  minDate: Date = new Date('Oct 12 2016');
  startTime: Date = new Date('Oct 12 2016 3:00 PM');
  onOffSwitch: any = 'Off';

  subscriptioN: Subscription;
  isNewInstructor: boolean;
  pageTitle: string = 'Instructor Edit';
  // instructor: IInstructor = new Instructor();
  instructor$: Observable<IInstructor>;

  hasGearboxError: boolean = false;

  constructor(
    private afDbService: AfDbService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let id: string = this.activatedRoute.snapshot.paramMap.get('id');
    // let id: string = this.activatedRoute.snapshot.params['id'];
    this.pageTitle += `: ${id}`;
    this.isNewInstructor = id === 'new';

    if (!this.isNewInstructor) {
      this.instructor$ = this.getInstructor(id);
    } else {
      this.instructor$ = Observable.of({}) as Observable<IInstructor>;
    }

    // this.subscriptioN = this.instructor$
    //   .subscribe(
    //   i => {
    //     console.log('i-edit - instructor$.subscribe got value: ', i);
    //     // console.log(i.instructorName);
    //     this.instructor = i;
    //   },
    //   error => {
    //     console.log('i-edit - instructor$.subscribe got error: ', error);
    //   },
    //   () => console.log('i-edit - instructor$.subscribe - completed')
    // );

  }

  ngOnDestroy() {
    // this.subscriptioN.unsubscribe();
  }

  getInstructor(key: string): Observable<IInstructor> {
    return this.afDbService.getInstructor(key);
  }

  saveInstructor2in1(instructor: IInstructor) {
    const save = this.isNewInstructor
      ? this.afDbService.createInstructor(instructor)
      : this.afDbService.updateInstructor(instructor);
    save.then(_ => {
      console.log('saveInstructor 2in1 navigate to /instructors');
      this.router.navigate(['/instructors']);
    });
  }

  deleteInstructor(instructor: IInstructor) {
    this.afDbService.deleteInstructor(instructor)
      .then(_ => {
        console.log('deleteInstructor navigate to /instructors');
        this.router.navigate(['/instructors']);
      });
  }

  onBack() {
    this.router.navigate(['/instructors']);
  }

  save(instructorForm: NgForm) {
    console.log(instructorForm.form);
    console.log('Saved: ' + JSON.stringify(instructorForm.value));
  }

  validateGearbox(value) {
    console.log(`gearbox: this.instructor.gearbox , value: ${value}`);
    this.hasGearboxError = !value;
  }
}
