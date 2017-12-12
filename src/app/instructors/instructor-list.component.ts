import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

import { AfDbService } from "../shared/af-db.service";
import { IInstructor } from "./instructor";

@Component({
  selector: 'ai-instructors',
  templateUrl: './instructor-list.component.html'
})
export class InstructorListComponent implements OnInit, OnDestroy {
  subscriptioN: Subscription;
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

  constructor(private afDbService: AfDbService) { }

  ngOnInit() {
    this.instructors$ = this.getInstructors();
    this.subscriptioN = this.instructors$.subscribe(
      instructors => {
        console.log('instructors$.subscribe got value: ', instructors);
        this.filteredInstructors = this.instructors = instructors;
      },
      error => {
        console.log('instructors$.subsribe got error: ', error);
        this.errorMessage = <any>error;
      },
      () => console.log('instructors$.subscribe - completed')
    )
  }

  ngOnDestroy() {
    console.log('in ngOnDestroy');
    this.subscriptioN.unsubscribe();
  }

  getInstructors(): Observable<any[]> {
    return this.afDbService.getInstructors();
  }

  performFilter(filterBy: string): IInstructor[] {
    filterBy = filterBy.toLowerCase();

    return this.instructors.filter((instructor: IInstructor) => {
      return instructor.car.toLowerCase().indexOf(filterBy) != -1;
    });
  }

}
