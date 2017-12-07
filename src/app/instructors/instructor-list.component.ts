import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { AfDbService } from "../shared/af-db.service";
import { IInstructor } from "./instructor";

@Component({
  selector: 'ai-instructors',
  templateUrl: './instructor-list.component.html'
})
export class InstructorListComponent implements OnInit {
  pageTitle: string = 'Instructor List';
  showPhoto: boolean = false;
  photoWidth: number = 50;
  photoMargin: number = 2;
  errorMessage: string;

  _carFilter: string;
  get carFilter(): string {
    return this._carFilter;
  }
  set carFilter(value: string) {
    this._carFilter = value;
    this.filteredInstructors = this.carFilter ? this.performFilter(this.carFilter) : this.instructors;
  }

  filteredInstructors: IInstructor[];
  instructors: IInstructor[];

  instructors$: Observable<IInstructor[]>;

  constructor(private afDb: AfDbService) { }

  ngOnInit() {
    this.instructors$ = this.getInstructors();
    this.instructors$.subscribe(
      instructors => {
        this.filteredInstructors = this.instructors = instructors;
        // console.log(this.filteredInstructors);
      },
      error => this.errorMessage = <any>error);
  }

  getInstructors(): Observable<any[]> {
    return this.afDb.getInstructors();
  }

  performFilter(filterBy: string): IInstructor[] {
    filterBy = filterBy.toLowerCase();

    return this.instructors.filter((instructor: IInstructor) => {
      return instructor.car.toLowerCase().indexOf(filterBy) != -1;
    });
  }

}
