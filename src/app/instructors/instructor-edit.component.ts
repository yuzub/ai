import { Component } from "@angular/core";
import { AfDbService } from "../shared/af-db.service";
import { IInstructor } from "./instructor";
import { Router } from "@angular/router";

@Component({
  templateUrl: './instructor-edit.component.html'
})
export class InstructorEditComponent {
  pageTitle: string = 'Instructor Edit';
  instructor: IInstructor;

  constructor(private afDb: AfDbService, private router: Router) {}

  updateInstructor(key: string, instructor: IInstructor) {
    this.afDb.updateInstructor(key, instructor);
  }

  onBack(){
    this.router.navigate(['/instructors']);
  }
}
