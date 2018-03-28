import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { IInstructor } from './instructor';
import { AfDbService } from '../shared/af-db.service';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: './instructor-detail.component.html',
  styles: ['button {cursor: pointer}']
})
export class InstructorDetailComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Instructor Detail';
  instructor$: Observable<IInstructor>;
  instructor: IInstructor;
  // subscriptioN: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private afDb: AfDbService
  ) { }

  ngOnInit() {
    let id: string = this.activatedRoute.snapshot.paramMap.get('id');

    this.instructor$ = this.getInstructor(id);

/*     this.subscriptioN = this.instructor$
      .subscribe(
      i => {
        console.log('i-detail - instructors$.subscribe got value: ', i);
        this.instructor = i;
      },
      error => {
        console.log('i-detail - instructor$.subscribe got error: ', error);
      },
      () => console.log('i-detail - instructor$.subscribe - completed')
    ); */
  }

  ngOnDestroy() {
    // this.subscriptioN.unsubscribe();
  }

  getInstructor(id: string): Observable<IInstructor> {
    return this.afDb.getInstructor(id);
  }

  onInsList() {
    this.router.navigate(['/instructors'], {queryParamsHandling: 'preserve'});
  }
}
