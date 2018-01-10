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
  // startDate: Date;
  // startDate: Date = new Date();
  // startDate: Date = new Date('Jan 1 2017');
  // minDate: Date = new Date('Oct 12 2016');
  // startTime: Date = new Date('Oct 12 2016 3:00 PM');
  // onOffSwitch: any = 'Off';

  subscriptioN: Subscription;
  isNewInstructor: boolean;
  pageTitle: string = '';
  // instructor: IInstructor = new Instructor();
  instructor$: Observable<IInstructor>;

  hasGearboxError: boolean = false;
  defaultPhotoUrl: string = 'https://firebasestorage.googleapis.com/v0/b/instructor-dp-ua.appspot.com/o/instructors%2F8?alt=media&token=4337ceb0-a730-4ddc-8573-b6d06ed67887';
  defaultCarPhotoUrl: string = '';

  constructor(
    private afDbService: AfDbService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // let id: string = this.activatedRoute.snapshot.params['id'];

    // Angular 4 introduced another ActivatedRoute interface called paramMap
    // let id: string = this.activatedRoute.snapshot.paramMap.get('id');

    this.activatedRoute.paramMap.subscribe(paramMap => {
      let id: string = paramMap.get('id');
      console.log(id);
      this.isNewInstructor = id === 'new';
      this.pageTitle = this.isNewInstructor ? 'Add Instructor' : `Edit Instructor: ${id}`;
      if (!this.isNewInstructor) {
        this.instructor$ = this.getInstructor(id);
      } else {
        this.instructor$ = Observable.of({}) as Observable<IInstructor>;
      }
    });

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
    if (!instructor.hasOwnProperty('photoUrl')) instructor.photoUrl = this.defaultPhotoUrl;
    if (!instructor.hasOwnProperty('carPhotoUrl')) instructor.carPhotoUrl = this.defaultCarPhotoUrl;
    const save = this.isNewInstructor
      ? this.afDbService.createInstructor(instructor)
      : this.afDbService.updateInstructor(instructor);
    save.then(_ => {
      alert(`Here will be MODAL. Now ALERT. ${instructor.instructorName} was ${(this.isNewInstructor) ? 'added' : 'updated'} instructor info.`);
      // console.log('saveInstructor 2in1 navigate to /instructors');
      this.router.navigate(['/instructors']);
    });
  }

  deleteInstructor(instructor: IInstructor) {
    if (confirm(`Here will be MODAL. Now CONFIRM. Delete instructor - ${instructor.instructorName}?`)) {
      this.afDbService.deleteInstructor(instructor)
      .then(_ => {
        alert(`Here will be MODAL. Now ALERT.  ${instructor.instructorName} was deleted.`);
        // console.log('deleteInstructor navigate to /instructors');
        this.router.navigate(['/instructors']);
      });
    } else {
      alert('Deleting was canceled!')
    }


  }

  onBack() {
    this.router.navigate(['/instructors']);
  }

/*   save(instructorForm: NgForm) {
    console.log(instructorForm.form);
    console.log('Saved: ' + JSON.stringify(instructorForm.value));
  } */

  validateGearbox(value) {
    console.log(`gearbox: this.instructor.gearbox , value: ${value}`);
    this.hasGearboxError = !value;
  }
}
