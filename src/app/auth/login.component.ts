import { Component } from "@angular/core";
import {NgForm} from "@angular/forms";
import { Employee } from "./employee";
import { AfDbService } from "../shared/af-db.service";

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  languages: string[] = ['English', 'Russian', 'Other'];
  // model = new Employee('John', 'Papa', true, 'w2', 'English');
  model = new Employee('', '', false, '', 'English');

  constructor(private afDbService: AfDbService) {}

  firstNameToUpperCase(value: string) {
    if (value.length > 0) {
      this.model.firstName = value.charAt(0).toUpperCase() + value.slice(1);
    } else {
      this.model.firstName = value;
    }
  }

  submitForm(form: NgForm) {
    // console.log(this.model);
    // console.log(form.value);
    // validate form

    // this.afDbService.createFeedback(this.model);
  }
}
