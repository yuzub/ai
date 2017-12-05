import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { IInstructor } from './instructor';

@Component({
  templateUrl: './instructor-detail.component.html',
  styles: ['button {cursor: pointer}']
})
export class InstructorDetailComponent implements OnInit {
  pageTitle: string = 'Instructor Detail';
  instructor: IInstructor;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`;
  }

  onInsList() {
    this.router.navigate(['/instructors']);
  }
}
