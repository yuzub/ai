import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";

import { AfDbService } from "../shared/af-db.service";
import { IInstructor } from "./instructor";
import { NgForm } from "@angular/forms";

@Component({
  templateUrl: './instructor-edit.component.html'
})
export class InstructorEditComponent implements OnInit {
  isNewInstructor: boolean;
  pageTitle: string = 'Instructor Edit';
  instructor: IInstructor;
  instructor$: Observable<IInstructor>;

  constructor(
    private afDbService: AfDbService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let id: string = this.activatedRoute.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`;
    this.isNewInstructor = id === 'new';

    if (!this.isNewInstructor) {
      this.instructor$ = this.getInstructor(id);
      this.instructor$
        .subscribe(i => {
          console.log(i);
          this.instructor = i;
        });
    } else {
      this.instructor$ = Observable.of({}) as Observable<IInstructor>;
      this.instructor$
        .subscribe(i => {
          console.log(i);
          this.instructor = i;
        });
    }

  }

  getInstructor(id: string): Observable<IInstructor> {
    return this.afDbService.getInstructor(id);
  }

  save2in1(instructor) {
    this.isNewInstructor
      ? this.afDbService.createInstructor(instructor)
      : this.afDbService.updateInstructor(instructor);
  }

  updateInstructor(instructor: IInstructor) {
    this.afDbService.updateInstructor(instructor);
  }

  onBack() {
    this.router.navigate(['/instructors']);
  }

  save(instructorForm: NgForm) {
    console.log(instructorForm.form);
    console.log('Saved: ' + JSON.stringify(instructorForm.value));
  }
}
