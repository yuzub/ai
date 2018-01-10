import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { AfDbService } from "../shared/af-db.service";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user";

import { IInstructor } from "./instructor";

@Component({
  selector: 'ai-instructors',
  templateUrl: './instructor-list.component.html'
})
export class InstructorListComponent implements OnInit, OnDestroy {
  subscriptioN: Subscription; // need subscription for filter on front-end side vs. just async pipe on template
  pageTitle: string = 'Instructor List';
  showPhoto: boolean = false;
  // photoWidth: number = 50;
  // photoMargin: number = 2;
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

  constructor(private afDbService: AfDbService,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.instructors$ = this.getInstructors();
    this.subscriptioN = this.instructors$.subscribe(
      instructors => {
        console.log('instructors$.subscribe got value: ', instructors);
        this.filteredInstructors = this.instructors = instructors;
        this.carFilter = this.activatedRoute.snapshot.queryParamMap.get('filterBy') || '';
        this.showPhoto = this.activatedRoute.snapshot.queryParamMap.get('showPhoto') === 'true';
      },
      error => {
        console.log('instructors$.subsribe got error: ', error);
        this.errorMessage = <any>error;
      },
      () => console.log('instructors$.subscribe - completed')
    );
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
