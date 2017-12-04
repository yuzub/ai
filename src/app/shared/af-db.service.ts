import { Injectable } from "@angular/core";
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from "rxjs/Observable";

@Injectable()
export class AfDbService {
  constructor(private afDb: AngularFireDatabase) {}

  getInstructor(id: string) {}

  createInstructor() {}

  updateInstructor() {}

  deleteInstructor() {}

  getInstructors(listPath: string): Observable<any[]> {
    return this.afDb.list(listPath).valueChanges();
    // add handle errors?
  }

  getFeedbacks() {}
}
