import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { IInstructor } from './instructor';
import { AfDbService } from '../shared/af-db.service';

@Component({
  templateUrl: './instructor-detail.component.html',
  styles: ['button {cursor: pointer}']
})
export class InstructorDetailComponent implements OnInit {
  pageTitle: string = 'Instructor Detail';
  instructor: IInstructor;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private afDb: AfDbService) {}

  ngOnInit() {
    let id: string = this.activatedRoute.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`;

    this.getInstructor(id)
      .subscribe(i => {
        // console.log(i);
        this.instructor = i;
      });
  }

  getInstructor(id: string) {
    return this.afDb.getInstructor(id);
  }

  onInsList() {
    this.router.navigate(['/instructors']);
  }
}
