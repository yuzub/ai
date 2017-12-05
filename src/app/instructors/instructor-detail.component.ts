import { Component } from '@angular/core';
import { IInstructor } from './instructor';

@Component({
  templateUrl: './instructor-detail.component.html'
})
export class InstructorDetailComponent {
  pageTitle: string = 'Instructor Detail';
  instructor: IInstructor;
}
