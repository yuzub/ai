import { Injectable } from "@angular/core";
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from "rxjs/Observable";
import { IInstructor } from "../instructors/instructor";

@Injectable()
export class AfDbService {
  constructor(private afDb: AngularFireDatabase) {}

  // getInstructor(id: string): Observable<any> {
  //   return this.afDb.object('instructors/' + id).valueChanges();
  // }

  getInstructor(id: string): Observable<any>  {
    return this.afDb.object('instructors/' + id).snapshotChanges()
      .map(action => ({ key: action.key, ...action.payload.val() }));

  }

  createInstructor() {}

  updateInstructor() {}

  deleteInstructor() {}

  // getInstructors(listPath: string): Observable<any[]> {
  //   return this.afDb.list(listPath).valueChanges();
  //   // add handle errors?
  // }

  getInstructors(listPath: string): Observable<any[]> {
    return this.afDb.list(listPath).snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });
    // add handle errors?
  }

  getFeedbacks() {}
}
