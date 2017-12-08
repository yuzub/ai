import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  templateUrl: './instructor-create.component.html'
})
export class InstructorCreateComponent {
  pageTitle: string = 'Add New Instructor';
  instructor: {} = {
    firstName: ''
  }

  save(customerForm: NgForm) {
    console.log(customerForm.form);
    console.log('Saved: ' + JSON.stringify(customerForm.value));
  }
}
